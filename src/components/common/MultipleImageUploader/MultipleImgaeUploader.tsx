import { useState } from 'react';
import { ImageIcon, XIcon } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useUploadImage } from '@/hooks/common/image/useUploadImage';
import type { MultiImageUploaderProps } from '@/types/common.type';
import * as S from './MultipleImageUploader.styles';

export const MultiImageUploader = ({
  initialImageUrls = [],
  initialImageIds = [],
  onUploadChange,
  uploadContext,
  maxImages = 5,
}: MultiImageUploaderProps) => {
  const { upload } = useUploadImage();

  const [isProcessing, setIsProcessing] = useState(false);

  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls ?? []);
  const [imageIds, setImageIds] = useState<number[]>(initialImageIds ?? []);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return;

    const image = e.target.files?.[0];
    if (e.target) {
      e.target.value = '';
    }
    if (!image) return;

    if (imageIds.length >= maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드할 수 있습니다.`);
      return;
    }
    if (!image.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);

      if (uploadContext) {
        Object.entries(uploadContext).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      const result = await upload(formData);

      if (!result) {
        throw new Error('이미지 업로드 결과가 없습니다.');
      }

      const { imageId, imageUrl } = result;
      const newImageIds = [...imageIds, imageId];
      const newImageUrls = [...imageUrls, imageUrl];

      setImageIds(newImageIds);
      setImageUrls(newImageUrls);
      onUploadChange(newImageIds, newImageUrls);
    } catch (e: any) {
      setError(e.message || '이미지 업로드에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImageIds = imageIds.filter((_, i) => i !== indexToRemove);
    const newImageUrls = imageUrls.filter((_, i) => i !== indexToRemove);

    setImageIds(newImageIds);
    setImageUrls(newImageUrls);
    onUploadChange(newImageIds, newImageUrls);
  };

  const isMaxReached = imageUrls.length >= maxImages;
  const isDisabled = isMaxReached || isProcessing;

  return (
    <div className={S.wrapper}>
      <div className={S.previewWrapper}>
        {imageUrls.length === 0 && (
          <div className={S.previewPlaceholder}>
            <ImageIcon className={S.previewPlaceholderIcon} />
          </div>
        )}
        {imageUrls.map((url, index) => (
          <div key={index} className={S.previewItem}>
            <img src={url} alt={`preview-${index}`} className={S.previewImage} />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className={S.removeButton}
              aria-label="이미지 삭제"
              disabled={isProcessing}
            >
              <XIcon size={S.removeIconSize} />
            </button>
          </div>
        ))}
      </div>

      <div className={S.uploadControlsContainer}>
        <input
          id="postImages"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={isDisabled}
        />
        <HoverCard openDelay={50} closeDelay={100}>
          <HoverCardTrigger>
            <label htmlFor="postImages" className={S.uploadLabel(isDisabled)}>
              {isProcessing ? '업로드 중...' : isMaxReached ? `최대 ${maxImages}장` : '파일 선택'}
            </label>
          </HoverCardTrigger>
          {isMaxReached && !isProcessing && (
            <HoverCardContent>
              <p className={S.uploadLimitError}>이미지는 최대 {maxImages}장까지 업로드할 수 있습니다.</p>
            </HoverCardContent>
          )}
        </HoverCard>
        <p className={S.uploadCountText}>
          {imageUrls.length} / {maxImages}장
        </p>
        {error && <p className={S.uploadErrorText}>{error}</p>}
      </div>
    </div>
  );
};
