export class PaginationResponse<T> {
  constructor(public totalElements: number,
              public size: number,
              public content: T[]) {
  }
}
