import { useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";
import { latestPostByChannelAtom } from "@/atoms/postAtoms";

export const useLatestPost = (channelId: number) => {
  const latestPost = useAtomValue(
    useMemo(
      () =>
        selectAtom(
          latestPostByChannelAtom,
          (postsMap) => postsMap[String(channelId)] || null
        ),
      [channelId]
    )
  );
  return latestPost;
};
