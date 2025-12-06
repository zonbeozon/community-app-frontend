import { atomWithStorage } from 'jotai/utils';
import type { ServerMember } from '@/types/serverMember.type';

export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);

export const serverMemberAtom = atomWithStorage<ServerMember | null>('serverMember', null);
