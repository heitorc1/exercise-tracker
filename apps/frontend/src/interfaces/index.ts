export interface Response<T> {
  data: T;
}

export type IPaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
  };
};
