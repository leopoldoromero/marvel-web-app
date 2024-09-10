export class Criteria {
  constructor(
    readonly searchTerm = '',
    readonly page?: number,
    readonly perPage?: number,
  ) {}
}
