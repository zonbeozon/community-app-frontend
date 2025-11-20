import { useSetAtom } from "jotai";
import { latestPostByChannelAtom } from "@/atoms/postAtoms";
import { Post } from "@/types/post.type";

export const useUpdateLatestPost = () => {
  const setLatestPostMap = useSetAtom(latestPostByChannelAtom);

  const updateLatestPost = (channelId: number, post: Post | null) => {
    setLatestPostMap((prev) => ({
      ...prev,
      [String(channelId)]: post,
    }));
  };

  return updateLatestPost;
};
