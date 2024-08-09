export class Criteria {
  constructor(
    readonly nameStartsWith = '',
    readonly page?: number,
    readonly perPage?: number,
  ) {}
}
