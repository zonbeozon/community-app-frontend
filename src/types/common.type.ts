interface Sorted {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sorted;
  unpaged: boolean;
}

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
}

export interface PagePayload {
  page: number;
  size: number;
}

export interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export interface Image {
  imageId: number;
  imageUrl: string;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ActionDropdownProps {
  actions: DropdownAction[];
  triggerClassName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  [key: string]: any;
}

export interface DropdownAction {
  label: string;
  onSelect: () => void;
  isRendered?: boolean;
  isDestructive?: boolean;
}

export interface ItemSkeletonProps {
  count?: number;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ImageUploaderInputProps {
  initialImageUrl?: string | null;
  isUploading?: boolean;
  onUploadSuccess: (imageId: number | null) => void;
}

export interface MultiImageUploaderProps {
  initialImageUrls?: string[];
  initialImageIds?: number[];
  onUploadChange: (imageIds: number[], imageUrls: string[]) => void;
  uploadContext?: { [key: string]: string };
  maxImages?: number;
}
