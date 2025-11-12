import { useState } from "react";
import useGetBannedChannelMembers from "@/queries/useGetBannedChannelMembers.ts";
import ChannelMemberItem from "../ChannelMemberItem/ChannelMemberItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import { DEFAULT_PAGE_REQUEST } from "@/constants/constants";
import ChannelMemberUnbanDialog from "../ChannelMemberUnbanDialog/ChannelMemberUnbanDialog";
import { ChannelMember } from "@/types/channelMember.type";
import { Button } from "@/components/ui/button";
import * as S from "./ChannelBannedMemberList.styles";

interface ActiveDialogState {
  member: ChannelMember | null;
}

const ChannelBannedMemberList = ({ channelId }: { channelId: number }) => {
  const { data, isLoading, isError } = useGetBannedChannelMembers(
    channelId,
    DEFAULT_PAGE_REQUEST
  );

  const [activeDialog, setActiveDialog] = useState<ActiveDialogState>({ member: null });

  const bannedMembers = data?.members || [];

  const handleCloseDialog = () => {
    setActiveDialog({ member: null });
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <ItemSkeleton key={i} />
        ))}
      </>
    );
  }

  if (isError || bannedMembers.length === 0) {
    return <p className={S.emptyMessage}>밴 된 멤버가 없습니다.</p>;
  }

  return (
    <div className={S.wrapper}>
      <ul className={S.list}>
        {bannedMembers.map((member) => (
          <ChannelMemberItem
            key={member.memberId}
            member={member}
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveDialog({ member: member })}
              >
                추방 해제
              </Button>
            }
          />
        ))}
      </ul>

      <ChannelMemberUnbanDialog
        open={activeDialog.member !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleCloseDialog();
          }
        }}
        channelId={channelId}
        targetMember={activeDialog.member!}
      />
    </div>
  );
};

export default ChannelBannedMemberList;