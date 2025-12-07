import { queryClient } from '@/lib/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { ChannelEvent } from '@/types/stompEvent.type';

export const channelEventHandler = (event: ChannelEvent) => {
  const { type } = event;

  switch (type) {
    case 'DELETED': {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.channels.all });
      break;
    }

    default:
      break;
  }
};
