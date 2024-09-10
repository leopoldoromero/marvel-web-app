import { CharacterFinder } from '@character/application/character-find/character-find';
import { CharactersFinder } from '@character/application/characters-finder/characters-finder';
import { ComicsFinder } from '@character/application/comics-finder/comics-finder';
import { CharacterRepository } from '@character/domain/character-repository';
import { ApiCharacterRepository } from '@character/infrastructure/api-character-repository';

type DependencyKeys = 'characterFinder' | 'charactersFinder' | 'comicsFinder';
type Dependencies = CharactersFinder | CharacterFinder | ComicsFinder;

class DIContainer {
    private dependencies: Map<DependencyKeys, Dependencies> | null = null;
    private static instance: DIContainer;
  
    private constructor() {}
  
    public static getInstance(): DIContainer {
      if (!DIContainer.instance) {
        DIContainer.instance = new DIContainer();
      }
      return DIContainer.instance;
    }
  
    public initialize({ apiBaseUrl, publicKey, privateKey }: { apiBaseUrl: string; publicKey: string; privateKey: string }) {
      console.log('INITIALIZING....', apiBaseUrl)
        if (!this.dependencies) {
        const apiCharacterRepository: CharacterRepository = new ApiCharacterRepository(apiBaseUrl, publicKey, privateKey);
  
        this.dependencies = new Map<DependencyKeys, Dependencies>([
          ['characterFinder', new CharacterFinder(apiCharacterRepository)],
          ['charactersFinder', new CharactersFinder(apiCharacterRepository)],
          ['comicsFinder', new ComicsFinder(apiCharacterRepository)],
        ]);
      } else {
        console.error('DIContainer is already initialized.');
        return null;
      }
    }

    public getDependency<T>(key: DependencyKeys): T {
        if (!this.dependencies) {
          throw new Error('DIContainer has not been initialized.');
        }
        return this.dependencies.get(key) as T;
      }
  
    public getDependencies(): Map<DependencyKeys, Dependencies> {
      if (!this.dependencies) {
        throw new Error('DIContainer has not been initialized.');
      }
      return this.dependencies;
    }
  }
  
  const diContainer = DIContainer.getInstance();
  
  export { diContainer };
  