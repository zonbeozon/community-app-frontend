import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import useJoinChannel from '@/hooks/channelMember/useJoinChannel';
import { ChannelSearchResultTemp } from '../ChannelSearchbar/ChannelSearchbar'; // 경로는 실제 위치에 맞게 조정해주세요.

// --- 1. Prop 타입 정의 수정 ---
// 'children'을 제거하고, 외부에서 상태를 제어하기 위한 'open'과 'onOpenChange'를 추가합니다.
interface ChannelJoinDialogProps {
  channel: ChannelSearchResultTemp;
  onJoinSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChannelJoinDialog = ({
  channel,
  onJoinSuccess,
  open,
  onOpenChange,
}: ChannelJoinDialogProps) => {
  // 내부 상태 'isOpen'을 제거하고, props로 받은 'open'과 'onOpenChange'를 사용합니다.
  const [isLoading, setIsLoading] = useState(false);
  
  const joinChannelHandler = useJoinChannel();
  const { title, settings: { joinPolicy } } = channel;

  const dialogContent = useMemo(() => {
    // ... (내용은 동일하므로 생략)
    switch (joinPolicy) {
      case 'OPEN':
        return {
          title: '채널 참여',
          description: `'${title}' 채널에 바로 참여하시겠습니까?`,
          buttonText: '참여하기',
        };
      case 'APPROVAL':
        return {
          title: '참여 요청',
          description: `'${title}' 채널은 관리자의 승인이 필요합니다. 참여를 요청하시겠습니까?`,
          buttonText: '요청 보내기',
        };
      case 'DENY':
      default:
        return {
          title: '참여 불가',
          description: `죄송합니다. '${title}' 채널은 현재 새로운 멤버를 받지 않습니다.`,
          buttonText: '확인',
        };
    }
  }, [joinPolicy, title]);

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      await joinChannelHandler(channel.channelId);
      onJoinSuccess?.();
      onOpenChange(false); // 상태를 직접 바꾸는 대신, 부모에게 닫아달라고 요청합니다.
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. DialogTrigger를 제거하고 Dialog 컴포넌트에 직접 props를 전달 ---
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogDescription>{dialogContent.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* DialogClose는 내부적으로 onOpenChange(false)를 호출하므로 그대로 사용 가능합니다. */}
          <DialogClose asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>
          
          {joinPolicy !== 'DENY' ? (
            <Button onClick={handleJoin} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {dialogContent.buttonText}
            </Button>
          ) : (
            // '확인' 버튼 클릭 시에도 부모에게 닫아달라고 요청합니다.
            <Button onClick={() => onOpenChange(false)}>
              {dialogContent.buttonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelJoinDialog;