export interface SearchModel<T> {
  options: {
    pageSize?: number;
    pageIndex?: number;
  },
  data: T
}
