export class PaginationRequest {
  constructor(public page: number,
              public size: number,
              public criteria: string) {
  }
}
