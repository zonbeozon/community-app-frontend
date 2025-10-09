import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useGetJoinedChannels from '@/queries/useGetJoinedChannel';
import useDeleteChannel from '@/hooks/channel/useDeleteChannel';
import { ChannelDialogProps } from "@/types/channel.type";
import * as S from "./ChannelDeleteDialog.styles";

const ChannelDeleteDialog = ({ open, onOpenChange, channelId }: ChannelDialogProps) => {
  // 3. useMutation 훅을 호출하여 mutate 함수와 로딩 상태를 가져옵니다.
  const { mutate: deleteChannel, isPending } = useDeleteChannel();
  
  // 4. Zustand 스토어 대신, TanStack Query 캐시에 있는 채널 목록 데이터를 사용합니다.
  const { data: myChannels } = useGetJoinedChannels();

  // 5. 전체 목록에서 현재 channelId에 해당하는 채널 정보를 효율적으로 찾습니다.
  const channel = useMemo(() => {
    return myChannels?.find(c => c.channelInfo.channelId === channelId);
  }, [myChannels, channelId]);

  // 채널 정보가 아직 로드되지 않았거나, 목록에 없는 경우 아무것도 렌더링하지 않습니다.
  if (!channel) return null;
  
  // 6. handleSubmit은 더 이상 async/await가 필요 없습니다.
  const handleDelete = () => {
    // 7. mutate 함수를 호출하고, 두 번째 인자로 이 컴포넌트만의 성공 콜백을 전달합니다.
    deleteChannel(channelId, {
      onSuccess: () => {
        // 훅에 정의된 onSuccess(쿼리 무효화, 토스트)가 실행된 후,
        // 이어서 모달을 닫는 로직이 실행됩니다.
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={S.content}>
        <DialogHeader>
          <DialogTitle>채널 삭제</DialogTitle>
          <DialogDescription>
            정말 <strong>{channel.channelInfo.title}</strong> 채널을 삭제하시겠습니까? 이 작업은
            되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          {/* 8. isPending 상태를 사용하여 버튼을 비활성화하고 로딩 텍스트를 보여줍니다. */}
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDeleteDialog;