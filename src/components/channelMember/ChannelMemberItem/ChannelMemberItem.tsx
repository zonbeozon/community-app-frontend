import { useState } from "react";
import { ChannelMember } from "@/types/channelMember.type";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ChannelMemberDropdown from "../ChannelMemberDropdown/ChannelMemberDropdown";
import useApproveChannelMember from "@/hooks/channelMember/useApproveChannelMember";
import useDenyChannelMember from "@/hooks/channelMember/useDenyChannelMember";
import useUnbanChannelMember from "@/hooks/channelMember/useUnbanChannelMember";
import * as S from "./ChannelMemberItem.styles"; 

interface ChannelMemberItemProps {
  channelId: number;
  member: ChannelMember;
  type: 'active' | 'pending' | 'banned';
}

const ChannelMemberItem = ({ channelId, member, type }: ChannelMemberItemProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  
  const acceptMember = useApproveChannelMember();
  const declineMember = useDenyChannelMember();
  const unbanMember = useUnbanChannelMember();

  const hasImage = member.profile && member.profile.imageUrl;
  const firstLetter = member.username ? member.username[0].toUpperCase() : "?";

  const renderActions = () => {
    switch (type) {
      case 'pending':
        const handleAccept = () => acceptMember(channelId, member.memberId);
        const handleDecline = () => declineMember(channelId, member.memberId);
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAccept}>수락</Button>
            <Button variant="destructive" size="sm" onClick={handleDecline}>거절</Button>
          </div>
        );
      
      case 'banned':
        const handleUnban = () => unbanMember(channelId, member.memberId);
        return (
          <Button variant="secondary" size="sm" onClick={handleUnban}>밴 해제</Button>
        );

      case 'active':
      default: 
        const details = S.roleDetails[member.channelRole] || S.roleDetails['CHANNEL_MEMBER'];
        return (
          <>
            <TooltipProvider>
              <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                <TooltipTrigger asChild>
                  <div><details.Icon size={S.roleIconSize} className={details.className} /></div>
                </TooltipTrigger>
                <TooltipContent side="right"><p>{details.label}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className={S.dropdownContainer}>
              <ChannelMemberDropdown targetMember={member} channelId={channelId} />
            </div>
          </>
        );
    }
  };

  return (
    <li className={S.wrapper}>
      <div className={S.infoContainer}>
        {hasImage ? (
          <img src={member.profile?.imageUrl!} alt={member.username} className={S.profileImage} />
        ) : (
          <div className={S.profileFallback}>{firstLetter}</div>
        )}
        <span className={S.username}>{member.username}</span>
      </div>
      
      <div className={S.actionsContainer}>
        {renderActions()}
      </div>
    </li>
  );
};

export default ChannelMemberItem;