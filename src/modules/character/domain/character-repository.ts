import { Criteria } from 'modules/shared/domain/criteria';
import { Character } from './character';
import { Comic } from './comic';

export interface CharacterRepository {
  get(id: number): Promise<Character | null>;
  getAll(criteria: Criteria): Promise<Array<Character>>;
  getCommics(characterId: number): Promise<Array<Comic>>;
}
