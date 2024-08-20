import cryptoJs from 'crypto-js';
import { CharacterRepository } from '../domain/character-repository';
import { Character } from '../domain/character';
import { Comic } from '../domain/comic';
import { Criteria } from '@shared/domain/criteria';

type CharacterDto = {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
};

type ComicDto = {
  id: number;
  title: string;
  dates: Array<{date: string}>;
  thumbnail: { path: string; extension: string };
}

export class ApiCharacterRepository implements CharacterRepository {
  private MARVEL_API_URL: string = process.env.MARVEL_API_URL as string;

  private getAuthenticationQueryParams(): {
    ts: string;
    hash: string;
    apikey: string;
  } {
    const timeStamp = new Date().getTime().toString();
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    console.log('ENVIRONMENT', publicKey, privateKey, process.env.NEXT_PUBLIC_MARVEL_API_URL);
    if (!privateKey || !publicKey) throw Error(`Api keys not provided`);
    const messageToHash = `${timeStamp}${privateKey}${publicKey}`;
    const hash = cryptoJs.MD5(messageToHash);
    return {
      ts: timeStamp,
      apikey: publicKey,
      hash: hash.toString(),
    };
  }

  async get(id: number): Promise<Character | null> {
    try {
      const endpoint = `${this.MARVEL_API_URL}/characters/${id}`;
      const params = new URLSearchParams({
        ...this.getAuthenticationQueryParams(),
        limit: '50',
        offset: '0',
      });
      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url).then((response) => response.json());
      const character: CharacterDto = response?.data?.results?.[0];
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        comics: [],
    }
    } catch (error) {
      console.error(`[[ERROR fetching character details for id: ${id}]]: ${error}`);
      return null;
    }
  }

  async getAll(criteria: Criteria): Promise<Array<Character>> {
    try {
      const page = criteria?.page ?? 1;
      const perPage = criteria?.perPage ?? 10; // TODO: This was changed for testing purpouses
      const nameStartsWith = criteria?.nameStartsWith ?? '';
      const endpoint = `${this.MARVEL_API_URL}/characters`;
      const offset = (page - 1) * perPage;

      const params = new URLSearchParams({
        ...this.getAuthenticationQueryParams(),
        limit: String(perPage),
        offset: String(offset),
      });

      if (nameStartsWith) {
        params.set('nameStartsWith', nameStartsWith);
      }
      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url).then((response) => response.json());
      const total = response?.data?.total;
      const characters: Array<CharacterDto> = response?.data?.results;
      return characters?.map((character: CharacterDto) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        comics: [],
      }));
    } catch (error) {
      console.error(`[[ERROR fetching characters]]: ${error}`);
      return [];
    }
  }

  async getCommics(characterId: number): Promise<Array<Comic>> {
    try {
      
      const endpoint = `${this.MARVEL_API_URL}/comics`;
      const params = new URLSearchParams({
        ...this.getAuthenticationQueryParams(),
        limit: '20',
        offset: '0',
        characters: String(characterId),
      });
      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url).then((response) => response.json());
      const comics: Array<ComicDto> = response?.data?.results;
      console.log('COMICS', comics)
      return comics?.map((comic: ComicDto) => ({
        id: comic?.id,
        title: comic?.title,
        image: `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`,
        year: new Date(comic?.dates[0]?.date).getFullYear(),
      }));
    } catch (error) {
      console.error(`[[ERROR fetching commics for character: ${characterId}]]: ${error}`);
      return [];
    }
  }
}
