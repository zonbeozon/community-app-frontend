import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { latestChatByChattingGroupAtom } from '@/atoms/chatAtoms';

export const useLatestChat = (chattingGroupId: number) => {
  const latestChatAtom = useMemo(
    () =>
      selectAtom(
        latestChatByChattingGroupAtom, 
        (chatsMap) => chatsMap[String(chattingGroupId)] || null
      ),
    [chattingGroupId] 
  );

  return useAtomValue(latestChatAtom);
};