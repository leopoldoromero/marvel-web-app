import { Comic } from '@character/domain/comic';
import { CharacterRepository } from '@character/domain/character-repository';

export class ComicsFinder {
  constructor(private readonly repository: CharacterRepository) {}

  async execute(characterId: number): Promise<Array<Comic>> {
    return this.repository.getCommics(characterId);
  }
}
