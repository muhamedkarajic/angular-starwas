export interface Search<SearchType> {
  count: number;
  next?: string;
  previous?: string;
  results: SearchType[];
}
