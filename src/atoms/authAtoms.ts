import { atom } from 'jotai';
import { ServerMember } from '@/types/serverMember.type';

export const accessTokenAtom = atom<string | null>(null);

export const serverMemberAtom = atom<ServerMember | null>(null);