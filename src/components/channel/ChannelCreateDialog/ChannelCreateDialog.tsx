import { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ChannelForm from "@/components/channel/ChannelForm/ChannelForm";
import useCreateChannel from "@/hooks/channel/useCreateChannel";
import useForm from "@/hooks/common/useForm";
import { DialogProps } from "@/types/common.type";
import { ChannelRequest } from "@/types/channel.type";
import { DEFAULT_CHANNEL_VALUES } from "@/constants/config";
import validateChannel from "@/validations/validateChannel";
import * as S from "./ChannelCreateDialog.styles";

const ChannelCreateDialog = ({ open, onOpenChange }: DialogProps) => {
  // 2. 훅을 호출하여 mutate 함수와 로딩 상태(isPending)를 가져옵니다.
  const { mutate: createChannel, isPending } = useCreateChannel();
  
  const { values, errors, handler, isValid, reset } = useForm<ChannelRequest>(
    DEFAULT_CHANNEL_VALUES,
    validateChannel
  );

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  // 3. handleSubmit은 더 이상 async/await가 필요 없습니다.
  const handleSubmit = (data: ChannelRequest) => {
    // 4. mutate 함수를 호출하고, 두 번째 인자로 이 컴포넌트만의 성공 콜백을 전달합니다.
    createChannel(data, {
      onSuccess: () => {
        // 훅에 정의된 onSuccess(쿼리 무효화, 토스트, 리다이렉트)가 실행된 후,
        // 이어서 이 로직(모달 닫기, 폼 리셋)이 실행됩니다.
        onOpenChange(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={S.createButton}>
          <PlusIcon size={16}/>
          새 채널 만들기
        </Button>
      </DialogTrigger>

      <DialogContent className={S.dialog}>
        <DialogTitle className="sr-only">새 채널 만들기</DialogTitle>
        <DialogDescription className="sr-only">
          새로운 채널을 만들기 위한 양식입니다. 채널 이름, 설명, 프로필 이미지를 설정하고 '생성하기' 버튼을 누르세요.
        </DialogDescription>

        <ChannelForm
          content={values}
          errors={errors}
          handler={handler}
          imagePreview={null}
          isEdit={false}
          isValid={isValid}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChannelCreateDialog;