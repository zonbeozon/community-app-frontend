import { atom } from 'jotai';

export const selectedChannelIdAtom = atom<number | null>(null);

export const channelActivityMapAtom = atom<Record<number, string | number>>({});