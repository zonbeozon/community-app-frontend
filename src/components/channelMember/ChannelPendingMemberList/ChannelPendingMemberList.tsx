import { useState } from "react";
import { ChannelMember } from "@/types/channelMember.type";
import useGetPendingChannelMembers from "@/queries/useGetPendingChannelMembers";
import ChannelMemberItem from "../ChannelMemberItem/ChannelMemberItem";
import ItemSkeleton from "@/components/common/ItemSkeleton/ItemSkeleton";
import { DEFAULT_PAGE_REQUEST } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import ChannelMemberApproveDialog from "../ChannelMemberApproveDialog/ChannelMemberApproveDialog";
import ChannelMemberDenyDialog from "../ChannelMemberDenyDialog/ChannelMemberDenyDialog";
import * as S from "./ChannelPendingMemberList.styles";

interface ActiveDialogState {
  type: "approve" | "deny" | null;
  member: ChannelMember | null;
}

const ChannelPendingMemberList = ({ channelId }: { channelId: number }) => {
  const { data, isLoading, isError } = useGetPendingChannelMembers(
    channelId,
    DEFAULT_PAGE_REQUEST
  );

  const [activeDialog, setActiveDialog] = useState<ActiveDialogState>({ type: null, member: null });

  const pendingMembers = data?.members || [];

  const handleCloseDialog = () => {
    setActiveDialog({ type: null, member: null });
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

  if (isError || pendingMembers.length === 0) {
    return <p className={S.emptyMessage}>참가 요청 중인 멤버가 없습니다.</p>;
  }

  return (
    <div className={S.wrapper}>
      <ul className={S.list}>
        {pendingMembers.map((member) => (
          <ChannelMemberItem
            key={member.memberId}
            member={member}
            actions={
              <div className="flex items-center gap-2">
                <Button
                  className=""
                  size="sm"
                  onClick={() => setActiveDialog({ type: "approve", member })}
                >
                  수락
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveDialog({ type: "deny", member })}
                >
                  거절
                </Button>
              </div>
            }
          />
        ))}
      </ul>

      {activeDialog.member && (
        <>
          <ChannelMemberApproveDialog
            open={activeDialog.type === "approve"}
            onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}
            channelId={channelId}
            targetMember={activeDialog.member}
          />
          <ChannelMemberDenyDialog
            open={activeDialog.type === "deny"}
            onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}
            channelId={channelId}
            targetMember={activeDialog.member}
          />
        </>
      )}
    </div>
  );
};

export default ChannelPendingMemberList;