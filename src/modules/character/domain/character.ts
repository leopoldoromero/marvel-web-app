import { Comic } from './comic';

export interface Character {
  id: number;
  name: string;
  description: string;
  image: string;
  comics: Array<Comic>;
}
