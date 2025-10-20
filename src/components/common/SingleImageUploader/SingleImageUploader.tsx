import { useEffect } from 'react';
import { ImageIcon, XIcon } from "lucide-react";
import { useImageHandler } from '@/hooks/common/image/useImageHandler';

interface ImageUploaderInputProps {
  initialImageUrl?: string | null;
  isUploading: boolean;
  error?: string | null;
  onFileSelect: (file: File | null) => void;
}

export const SingleImageUploader = ({
  initialImageUrl,
  isUploading,
  error,
  onFileSelect,
}: ImageUploaderInputProps) => {
  const {
    imageFile,
    previewUrl,
    handleImageChange,
    handleRemoveImage,
  } = useImageHandler({ 
    initialImageUrl, 
  });
  
  useEffect(() => {
    onFileSelect(imageFile);
  }, [imageFile, onFileSelect]);

  return (
    <>
      <div className="flex items-center gap-4 mt-2 relative">
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={isUploading}
        />
        <label
          htmlFor="profileImage"
          className={`px-4 py-2 bg-white border border-gray-300 text-sm rounded-md ${
            isUploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          } hover:bg-gray-50 transition`}
        >
          {isUploading ? "업로드 중..." : "이미지 업로드"}
        </label>

        {previewUrl ? (
          <div className="relative w-14 h-14">
            <div className="w-full h-full rounded-full overflow-hidden border">
              <img
                src={previewUrl}
                alt="이미지 미리보기"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label="이미지 제거"
              className="absolute -right-1 -top-1 rounded-full bg-gray-700 p-0.5 text-white hover:bg-black"
            >
              <XIcon size={12} />
            </button>
          </div>
        ) : (
          <div className="w-14 h-14 flex items-center justify-center border rounded-full bg-muted overflow-hidden">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
      </div>
      {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
    </>
  );
};