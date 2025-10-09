type LoadingStatus = 'idle' | 'pending' | 'success' | 'failed';

export interface LoadingStore {
  statuses: Record<string, LoadingStatus>;
  getStatus: (key: string) => LoadingStatus;
  isLoading: (key: string) => boolean;
  setStatus: (key: string, status: LoadingStatus) => void;
}