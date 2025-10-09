import { useCallback } from "react";
import { uploadImage } from "@/apis/http/image.api";
import { toast } from "sonner";
import { CLIENT_ERROR_MESSAGES } from "@/constants/message";
import { Image } from "@/types/common.type";

const useUploadImage = () => {
  const upload = useCallback(
    async (image: File, path?: string): Promise<Image> => {
      const formData = new FormData();
      formData.append("image", image);
      if (path) {
        formData.append("path", path);
      }

      try {
        const imageResponse = await uploadImage(formData);
        return imageResponse;
      } catch (e: any) {
        toast.error(e?.message || CLIENT_ERROR_MESSAGES.IMAGE_UPLOAD_FAIL);
        throw e;
      }
    },
    []
  );

  return { upload };
};

export default useUploadImage;