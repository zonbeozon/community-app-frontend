import { atom } from 'jotai';
import type { Chat } from '@/types/chat.type';

export const selectedChattingGroupIdAtom = atom<number | null>(null);

export const latestChatByChattingGroupAtom = atom<Record<string, Chat | null>>({});