import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChannelActiveMemberList from "@/components/channelMember/ChannelActiveMemberList/ChannelActiveMemberList";
import ChannelPendingMemberList from "@/components/channelMember/ChannelPendingMemberList/ChannelPendingMemberList";
import ChannelBannedMemberList from "@/components/channelMember/ChannelBannedMemberList/ChannelBannedMemberList";
import { ChannelDialogProps } from "@/types/channel.type";
import * as S from "./ChannelManageDialog.styles";

const ChannelManageDialog = ({ open, onOpenChange, channelId }: ChannelDialogProps) => {
  const [activeTab, setActiveTab] = useState("active");

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>채널 멤버 관리</DialogTitle>
          <DialogDescription>
            채널 멤버의 역할을 변경하거나, 참가 요청 및 밴을 관리할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className={S.tabsContainer}>
          <TabsList className={S.tabsList}>
            <TabsTrigger value="active">참가 멤버</TabsTrigger>
            <TabsTrigger value="pending">참가 요청</TabsTrigger>
            <TabsTrigger value="banned">밴 멤버</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeTab === 'active' && <ChannelActiveMemberList channelId={channelId} />}
          </TabsContent>
          <TabsContent value="pending">
            {activeTab === 'pending' && <ChannelPendingMemberList channelId={channelId} />}
          </TabsContent>
          <TabsContent value="banned">
            {activeTab === 'banned' && <ChannelBannedMemberList channelId={channelId} />}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelManageDialog;