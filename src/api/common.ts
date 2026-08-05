export interface PaginationType {
  pageSize?: number;
  pageNo?: number;
}

/** 需强制分页参数的列表查询 */
export type RequiredPagination = Required<PaginationType>;
