export interface PostViewStore {
  queue: number[];
  logView: (postId: number) => void;
  flush: () => Promise<void>;
}