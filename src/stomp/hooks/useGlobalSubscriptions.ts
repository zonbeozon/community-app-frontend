import { useEffect, useMemo, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { serverMemberAtom } from '@/atoms/authAtoms';
import { selectedChannelIdAtom } from '@/atoms/channelAtoms';
import { useGetJoinedChannels } from '@/queries/useGetJoinedChannel';
import { useStomp } from '@/stomp/StompProvider';
import { STOMP_DESTINATIONS } from '@/stomp/destinations';
import { channelEventHandler } from '@/stomp/handlers/channelEventHandler';
import { channelMemberEventHandler } from '@/stomp/handlers/channelMemberEventHandler';
import { handleCommentCountEvent } from '@/stomp/handlers/commentCountEventHandler';
import { handleNotificationEvent } from '@/stomp/handlers/notificationEventHandler';
import { handlePostEvent } from '@/stomp/handlers/postEventHandler';
import type { IMessage, StompSubscription } from '@stomp/stompjs';

export const useGlobalSubscriptions = () => {
  const { client, isConnected } = useStomp();

  const myInfo = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);

  const memberId = myInfo?.memberId;
  const joinedChannelIds = useMemo(() => {
    if (!myChannels) return [];
    return myChannels.map((channel) => channel.channelInfo.channelId);
  }, [myChannels]);

  const subscriptionsRef = useRef<{
    member: StompSubscription | null;
    notifications: StompSubscription | null;
    channels: Map<number, StompSubscription>;
    posts: Map<number, StompSubscription>;
    commentCount: StompSubscription | null;
  }>({
    member: null,
    notifications: null,
    channels: new Map(),
    posts: new Map(),
    commentCount: null,
  });

  useEffect(() => {
    if (!isConnected || !client) {
      return;
    }

    const subs = subscriptionsRef.current;

    if (!subs.member) {
      subs.member = client.subscribe(STOMP_DESTINATIONS.channelMember(), (message: IMessage) =>
        channelMemberEventHandler(JSON.parse(message.body)),
      );
    }

    if (!subs.notifications) {
      subs.notifications = client.subscribe(STOMP_DESTINATIONS.notifications(), (message: IMessage) =>
        handleNotificationEvent(JSON.parse(message.body)),
      );
    }
  }, [isConnected, client, memberId]);

  useEffect(() => {
    if (!isConnected || !client || joinedChannelIds.length === 0) {
      return;
    }

    const subs = subscriptionsRef.current;

    joinedChannelIds.forEach((channelId) => {
      if (!subs.channels.has(channelId)) {
        const sub = client.subscribe(STOMP_DESTINATIONS.channel(channelId), (msg: IMessage) =>
          channelEventHandler(JSON.parse(msg.body)),
        );
        subs.channels.set(channelId, sub);
      }
      if (!subs.posts.has(channelId)) {
        const sub = client.subscribe(STOMP_DESTINATIONS.post(channelId), (msg: IMessage) =>
          handlePostEvent(channelId, JSON.parse(msg.body)),
        );
        subs.posts.set(channelId, sub);
      }
    });

    const currentSubscribedIds = Array.from(subs.channels.keys());
    currentSubscribedIds.forEach((subscribedId) => {
      if (!joinedChannelIds.includes(subscribedId)) {
        subs.channels.get(subscribedId)?.unsubscribe();
        subs.posts.get(subscribedId)?.unsubscribe();
        subs.channels.delete(subscribedId);
        subs.posts.delete(subscribedId);
      }
    });
  }, [isConnected, client, joinedChannelIds]);

  useEffect(() => {
    if (!isConnected || !client) {
      return;
    }

    const subs = subscriptionsRef.current;

    if (subs.commentCount) {
      subs.commentCount.unsubscribe();
      subs.commentCount = null;
    }

    if (selectedChannelId) {
      subs.commentCount = client.subscribe(STOMP_DESTINATIONS.commentCount(selectedChannelId), (message: IMessage) =>
        handleCommentCountEvent(JSON.parse(message.body)),
      );
    }
  }, [isConnected, client, selectedChannelId]);

  useEffect(() => {
    return () => {
      const subs = subscriptionsRef.current;
      subs.member?.unsubscribe();
      subs.notifications?.unsubscribe();
      subs.commentCount?.unsubscribe();
      subs.channels.forEach((sub) => sub.unsubscribe());
      subs.posts.forEach((sub) => sub.unsubscribe());
    };
  }, []);
};
