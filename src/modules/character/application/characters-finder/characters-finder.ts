import { Character } from '@character/domain/character';
import { CharacterRepository } from '@character/domain/character-repository';
import { Criteria } from '@shared/domain/criteria';

export class CharactersFinder {
  constructor(private readonly repository: CharacterRepository) {}

  async execute(nameStartsWith?: string, page = 1, perPage = 50): Promise<{items: Array<Character>; count: number}> {
    return this.repository.getByCriteria(new Criteria(nameStartsWith, page, perPage));
  }
}
