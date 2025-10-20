import { useState } from "react";
import { ChannelMember } from "@/types/channelMember.type";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
  
  const { mutate: approveMember, isPending: isApproving } = useApproveChannelMember();
  const { mutate: denyMember, isPending: isDenying } = useDenyChannelMember();
  const { mutate: unbanMember, isPending: isUnbanning } = useUnbanChannelMember();

  const hasImage = member.profile && member.profile.imageUrl;
  const firstLetter = member.username ? member.username[0].toUpperCase() : "?";

  const renderActions = () => {
    switch (type) {
      case 'pending':
        const handleAccept = () => approveMember({ channelId, targetMemberId: member.memberId });
        const handleDecline = () => denyMember({ channelId, targetMemberId: member.memberId });
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAccept} disabled={isApproving || isDenying}>
              {isApproving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              수락
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDecline} disabled={isApproving || isDenying}>
              {isDenying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              거절
            </Button>
          </div>
        );
      
      case 'banned':
        const handleUnban = () => unbanMember({ channelId, targetMemberId: member.memberId });
        return (
          <Button variant="secondary" size="sm" onClick={handleUnban} disabled={isUnbanning}>
            {isUnbanning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            밴 해제
          </Button>
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