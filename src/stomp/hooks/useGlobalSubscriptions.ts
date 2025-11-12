import { useEffect, useMemo, useRef } from "react";
import type { IMessage, StompSubscription } from "@stomp/stompjs";
import { useAtomValue } from 'jotai';

import { useStomp } from "../StompProvider";
import { serverMemberAtom } from "@/atoms/authAtoms";
import useGetJoinedChannels from "@/queries/useGetJoinedChannel";
import { selectedChannelIdAtom } from "@/atoms/channelAtoms";
import { STOMP_DESTINATIONS } from "../destinations";
import { handleChannelEvent } from "../handlers/channelEventHandler";
import { handleChannelMemberEvent } from "../handlers/channelMemberEventHandler";
import { handlePostEvent } from "../handlers/postEventHandler";
import { handleNotificationEvent } from "../handlers/notificationEventHandler";
import { handleCommentCountEvent } from '../handlers/commentCountEventHandler';

export const useGlobalSubscriptions = () => {
  const { client, isConnected } = useStomp();
  
  const myInfo = useAtomValue(serverMemberAtom);
  const { data: myChannels } = useGetJoinedChannels();
  const selectedChannelId = useAtomValue(selectedChannelIdAtom);
  
  const memberId = myInfo?.memberId;
  const joinedChannelIds = useMemo(() => {
    if (!myChannels) return [];
    return myChannels.map(channel => channel.channelInfo.channelId);
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
    console.log(subs)

    if (!subs.member) {
      console.log('STOMP: Subscribing to member events...');
      subs.member = client.subscribe(
        STOMP_DESTINATIONS.channelMember(),
        (message: IMessage) => handleChannelMemberEvent(JSON.parse(message.body)) 
      );
    }
    
    if (!subs.notifications) {
      console.log('STOMP: Subscribing to notification events...');
      subs.notifications = client.subscribe(
        STOMP_DESTINATIONS.notifications(),
        (message: IMessage) => handleNotificationEvent(JSON.parse(message.body))
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
        console.log(`STOMP: Subscribing to channel events for channel ${channelId}`);
        const sub = client.subscribe(
          STOMP_DESTINATIONS.channel(channelId),
          (msg: IMessage) => handleChannelEvent(JSON.parse(msg.body))
        );
        subs.channels.set(channelId, sub);
      }
      if (!subs.posts.has(channelId)) {
        console.log(`STOMP: Subscribing to post events for channel ${channelId}`);
        const sub = client.subscribe(
          STOMP_DESTINATIONS.post(channelId),
          (msg: IMessage) => handlePostEvent(channelId, JSON.parse(msg.body))
        );
        subs.posts.set(channelId, sub);
      }
    });

    const currentSubscribedIds = Array.from(subs.channels.keys());
    currentSubscribedIds.forEach((subscribedId) => {
      if (!joinedChannelIds.includes(subscribedId)) {
        console.log(`STOMP: Unsubscribing from all events for channel ${subscribedId}`);
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
      console.log(`STOMP: Subscribing to comment count for channel ${selectedChannelId}`);
      subs.commentCount = client.subscribe(
        STOMP_DESTINATIONS.commentCount(selectedChannelId),
        (message: IMessage) => handleCommentCountEvent(JSON.parse(message.body))
      );
    }
    
  }, [isConnected, client, selectedChannelId]);

  useEffect(() => {
    return () => {
      console.log('STOMP: Unsubscribing from all global subscriptions.');
      const subs = subscriptionsRef.current;
      subs.member?.unsubscribe();
      subs.notifications?.unsubscribe();
      subs.commentCount?.unsubscribe();
      subs.channels.forEach(sub => sub.unsubscribe());
      subs.posts.forEach(sub => sub.unsubscribe());
    };
  }, []);
};