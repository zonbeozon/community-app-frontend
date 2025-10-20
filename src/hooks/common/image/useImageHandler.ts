import { useState, useEffect, useCallback } from 'react';

interface UseImageFileHandlerProps {
  initialImageUrl?: string | null;
}

export const useImageHandler = ({ initialImageUrl = null }: UseImageFileHandlerProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    setPreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = '';
    if (!file) return;

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, [previewUrl]);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
  }, [previewUrl]);

  const resetImage = useCallback(() => {
    handleRemoveImage();
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [handleRemoveImage, initialImageUrl]);

  return {
    imageFile,
    previewUrl,
    handleImageChange,
    handleRemoveImage,
    resetImage,
  };
};