import { atom } from "jotai";
import { Post } from "@/types/post.type";

export const selectedPostIdAtom = atom<number | null>(null);

export const latestPostByChannelAtom = atom<{ [key: number]: Post | null }>({});