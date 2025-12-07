import { useState } from 'react';
import { ChannelActiveMemberList } from '@/components/channelMember/ChannelActiveMemberList/ChannelActiveMemberList';
import { ChannelBannedMemberList } from '@/components/channelMember/ChannelBannedMemberList/ChannelBannedMemberList';
import { ChannelPendingMemberList } from '@/components/channelMember/ChannelPendingMemberList/ChannelPendingMemberList';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChannelDialogProps } from '@/types/channel.type';
import * as S from './ChannelManageDialog.styles';

export const ChannelManageDialog = ({ channel, open, onOpenChange }: ChannelDialogProps) => {
  const [activeTab, setActiveTab] = useState('active');

  if (!open || !channel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>채널 멤버 관리</DialogTitle>
          <DialogDescription>채널 멤버의 역할을 변경하거나, 참가 요청 및 밴을 관리할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className={S.tabsContainer}>
          <TabsList className={S.tabsList}>
            <TabsTrigger value="active">참가 멤버</TabsTrigger>
            <TabsTrigger value="pending">참가 요청</TabsTrigger>
            <TabsTrigger value="banned">밴 멤버</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeTab === 'active' && <ChannelActiveMemberList channelId={channel.channelInfo.channelId} />}
          </TabsContent>
          <TabsContent value="pending">
            {activeTab === 'pending' && <ChannelPendingMemberList channelId={channel.channelInfo.channelId} />}
          </TabsContent>
          <TabsContent value="banned">
            {activeTab === 'banned' && <ChannelBannedMemberList channelId={channel.channelInfo.channelId} />}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
