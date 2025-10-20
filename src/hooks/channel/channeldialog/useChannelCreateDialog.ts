import { useEffect } from 'react';
import useForm from '@/hooks/common/useForm';
import useCreateChannel from '@/hooks/channel/useChannelCreate';
import useUploadImage from '@/hooks/common/image/useUploadImage';
import { ChannelRequest } from '@/types/channel.type';
import { DEFAULT_CHANNEL_VALUES } from '@/constants/config';
import validateChannel from '@/validations/validateChannel';

interface UseChannelCreateDialogProps {
  open: boolean;
  onSuccess: () => void;
}

export const useChannelCreateDialog = ({ open, onSuccess }: UseChannelCreateDialogProps) => {
  // 1. 각 API 요청에 대한 훅을 준비합니다.
  const { mutate: createChannel, isPending: isCreatingChannel } = useCreateChannel();
  const { upload: uploadImage, isUploading } = useUploadImage();

  const {
    values,
    errors,
    handler,
    isValid,
    reset,
  } = useForm<ChannelRequest>(DEFAULT_CHANNEL_VALUES, validateChannel);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  // 2. ChannelForm이 원하는 (data, imageFile) 형태의 함수를 만듭니다.
  const handleSubmit = async (data: ChannelRequest, imageFile: File | null) => {
    let finalImageId: number | null = null;

    // 3. 이미지 파일이 있으면, 먼저 업로드하여 imageId를 받아옵니다.
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('type', 'channel-profile'); // API에서 요구하는 타입
        
        // uploadImage 훅은 { imageId: number, imageUrl: string } 형태의 객체를 반환해야 합니다.
        const uploadResult = await uploadImage(formData);
        finalImageId = uploadResult.imageId;
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        // 사용자에게 토스트 메시지 등으로 실패를 알리는 로직을 추가할 수 있습니다.
        return; // 이미지 업로드 실패 시 중단
      }
    }

    // 4. 최종적으로 서버에 보낼 데이터를 조합합니다.
    const finalPayload = {
      ...data,
      imageId: finalImageId, // 받아온 imageId로 교체
    };

    // 5. 조합된 데이터로 채널 생성 API를 호출합니다.
    createChannel(finalPayload, {
      onSuccess: () => {
        onSuccess();
        reset();
      },
    });
  };

  return {
    formValues: values,
    formErrors: errors,
    formHandler: handler,
    isFormValid: isValid,
    // 6. 두 비동기 작업(이미지 업로드, 채널 생성) 중 하나라도 진행 중이면 로딩 상태로 처리합니다.
    isSubmitting: isUploading || isCreatingChannel,
    // 7. 새로 만든 핸들러를 반환합니다.
    handleSubmit,
  };
};