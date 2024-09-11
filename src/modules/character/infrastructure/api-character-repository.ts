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
  constructor(
    private readonly apiBaseUrl: string, 
    private readonly publicKey: string, 
    private readonly privateKey: string
  ) {}

  private getAuthenticationQueryParams(): {
    ts: string;
    hash: string;
    apikey: string;
  } {
    const timeStamp = new Date().getTime().toString();

    if (!this.privateKey || !this.publicKey) throw Error(`Api keys not provided`);
    const messageToHash = `${timeStamp}${this.privateKey}${this.publicKey}`;
    const hash = cryptoJs.MD5(messageToHash);
    return {
      ts: timeStamp,
      apikey: this.publicKey,
      hash: hash.toString(),
    };
  }

  async get(id: number): Promise<Character | null> {
    try {
      const endpoint = `${this.apiBaseUrl}/characters/${id}`;
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

  async getByCriteria(criteria: Criteria): Promise<{items: Array<Character>; count: number}> {
    try {
      const page = criteria?.page ?? 1;
      const perPage = criteria?.perPage ?? 10; 
      const nameStartsWith = criteria?.searchTerm ?? '';
      const endpoint = `${this.apiBaseUrl}/characters`;
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
      const items =  characters?.map((character: CharacterDto) => ({
        id: character.id,
        name: character.name,
        description: character.description,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        comics: [],
      }));
      return {
        items,
        count: total,
      }
    } catch (error) {
      console.error(`[[ERROR fetching characters]]: ${error}`);
      return {
        items: [],
        count: 0,
      };
    }
  }

  async getCommics(characterId: number): Promise<Array<Comic>> {
    try {
      
      const endpoint = `${this.apiBaseUrl}/comics`;
      const params = new URLSearchParams({
        ...this.getAuthenticationQueryParams(),
        limit: '20',
        offset: '0',
        characters: String(characterId),
      });
      const url = `${endpoint}?${params.toString()}`;
      const response = await fetch(url).then((response) => response.json());
      const comics: Array<ComicDto> = response?.data?.results;
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
