import { uploadImage } from '@/apis/http/image.api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { Image } from '@/types/common.type';

export const useUploadImage = () => {
  const { mutateAsync: upload, isPending: isUploading } = useMutation<Image, Error, FormData>({
    mutationFn: (imageFile: FormData) => uploadImage(imageFile),
    onError: () => {
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    },
  });

  return { upload, isUploading };
};
