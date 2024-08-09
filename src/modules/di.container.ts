import { CharacterFinder } from '@character/application/character-find/character-find';
import { CharactersFinder } from '@character/application/characters-finder/characters-finder';
import { ComicsFinder } from '@character/application/comics-finder/comics-finder';
import { CharacterRepository } from '@character/domain/character-repository';
import { ApiCharacterRepository } from '@character/infrastructure/api-character-repository';

const apiCharacterRepository: CharacterRepository = new ApiCharacterRepository();
const charactersFinder = new CharactersFinder(apiCharacterRepository);
const characterFinder = new CharacterFinder(apiCharacterRepository);
const comicsFinder = new ComicsFinder(apiCharacterRepository);

export { characterFinder, charactersFinder, comicsFinder };
