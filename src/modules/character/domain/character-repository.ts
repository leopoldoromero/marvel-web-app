import { Criteria } from 'modules/shared/domain/criteria';
import { Character } from './character';
import { Comic } from './comic';

export interface CharacterRepository {
  get(id: number): Promise<Character | null>;
  getByCriteria(criteria: Criteria): Promise<{items: Array<Character>; count: number}>;
  getCommics(characterId: number): Promise<Array<Comic>>;
}
