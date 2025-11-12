import { ReactNode } from 'react';
import { ChannelMember } from "@/types/channelMember.type";
import ChannelMemberProfileImage from '../ChannelMemberProfileImage/ChannelMemberProfileImage';
import * as S from "./ChannelMemberItem.styles";

interface ChannelMemberItemProps {
  member: ChannelMember;
  actions: ReactNode;
}

const ChannelMemberItem = ({ member, actions }: ChannelMemberItemProps) => {

  return (
    <li className={S.wrapper}>
      <div className={S.infoContainer}>
         <ChannelMemberProfileImage 
          profile={member.profile} 
          username={member.username}
        />
        <span className={S.username}>{member.username}</span>
      </div>
      
      <div className={S.actionsContainer}>
        {actions}
      </div>
    </li>
  );
};

export default ChannelMemberItem;