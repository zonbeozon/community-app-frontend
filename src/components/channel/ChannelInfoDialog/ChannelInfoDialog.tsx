import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Channel } from "@/types/channel.type";
import useDialog from "@/hooks/common/useDialog";
import ChannelMemberList from "@/components/channelMember/ChannelActiveMemberList/ChannelActiveMemberList";
import * as S from "./ChannelInfoDialog.styles";

const ChannelInfoDialog = ({ channel }: { channel: Channel }) => {
  const { props: dialogProps } = useDialog();

  if (!channel) return null;

  const hasImage = channel.channelInfo.profile && channel.channelInfo.profile.imageUrl;
  const firstLetter = channel.channelInfo.title ? channel.channelInfo.title[0].toUpperCase() : "?";

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <div className={S.trigger.wrapper}>
          {hasImage ? (
            <img
              src={channel.channelInfo.profile!.imageUrl}
              alt={`${channel.channelInfo.title} 채널의 프로필`}
              className={S.trigger.image}
            />
          ) : (
            <div className={S.trigger.fallback}>{firstLetter}</div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className={S.dialogContent}>
        <DialogHeader>
          <DialogTitle>{channel.channelInfo.title}</DialogTitle>
          <DialogDescription>
            {channel.channelInfo.description || "설명이 없습니다."}
          </DialogDescription>
        </DialogHeader>

        <div className={S.scrollableArea}>
          <div className={S.profileSection.wrapper}>
            {hasImage ? (
              <img
                src={channel.channelInfo.profile!.imageUrl}
                alt={`${channel.channelInfo.title}의 프로필`}
                className={S.profileSection.image}
              />
            ) : (
              <div className={S.profileSection.fallback}>{firstLetter}</div>
            )}
          </div>
          <div className={S.divider} />
          <div>
            <h4 className={S.memberSection.title}>
              멤버 ({channel.channelInfo.memberCount})
            </h4>
            <ChannelMemberList channelId={channel.channelInfo.channelId} />
          </div>
        </div>

        <DialogFooter className={S.footer}>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className={S.closeButton}>
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelInfoDialog;