import { ChannelMemberProfileImage } from '@/components/channelMember/ChannelMemberProfileImage/ChannelMemberProfileImage';
import type { ChannelMemberItemProps } from '@/types/channelMember.type';
import * as S from './ChannelMemberItem.styles';

export const ChannelMemberItem = ({ member, actions }: ChannelMemberItemProps) => {
  return (
    <li className={S.wrapper}>
      <div className={S.infoContainer}>
        <ChannelMemberProfileImage profile={member.profile} username={member.username} className={S.profileImage} />
        <span className={S.username}>{member.username}</span>
      </div>

      <div className={S.actionsContainer}>{actions}</div>
    </li>
  );
};
