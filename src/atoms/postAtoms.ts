import { atom } from 'jotai';
import type { Post } from '@/types/post.type';

export const selectedPostIdAtom = atom<number | null>(null);

export const latestPostByChannelAtom = atom<Record<string, Post | null>>({});
