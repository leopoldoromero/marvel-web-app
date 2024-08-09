import { Character } from '@character/domain/character';
import { CharacterRepository } from '@character/domain/character-repository';

export class CharacterFinder {
  constructor(private readonly repository: CharacterRepository) {}

  async execute(id: number): Promise<Character | null> {
    return this.repository.get(id);
  }
}
