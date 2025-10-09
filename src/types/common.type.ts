export interface Image {
  imageId: number;
  imageUrl: string;
};

export interface JwtCode {
  sub: number;
  exp: number;
  iat: number;
};

interface Sorted {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
};

interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sorted;
  unpaged: boolean;
};

export interface Page<T> {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  size: number;
  content: T[];
  number: number;
  sort: Sorted;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export interface PageRequest {
  page: number;
  size: number;
};

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};