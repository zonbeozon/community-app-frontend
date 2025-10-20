import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { XIcon, ImageIcon } from "lucide-react";
import { AutosizeTextarea } from "@/components/ui/AutoSizeTextArea";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MAX_POST_CONTENT_LENGTH } from "@/constants/config";
import type { FormProps } from "@/types/form.type";
import { PostRequest } from "@/types/post.type";
import * as S from "../PostForm/PostForm.styles";

const PostForm = ({
    content,
    errors,
    handler,
    isEdit,
    isValid,
    onSubmit,
    imagePreview,
}: FormProps<PostRequest, string[] | null>) => {
    const { onChange } = handler;

    const [imageUrls, setImageUrls] = useState<string[] | null>(imagePreview ?? null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setImageUrls(imagePreview ?? []);
    }, [imagePreview]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (e.target) {
            e.target.value = "";
        }
        if (!image) return;

        if ((content.imageIds?.length || 0) >= 5) {
            alert("이미지는 최대 5장까지 업로드할 수 있습니다.");
            return;
        }
        if (!image.type.startsWith("image/")) {
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }

        setUploading(true);
        setError(null);
        try {
            const result = await upload(image, "post-image");
            
            if (!result) {
              throw new Error("이미지 업로드 결과가 없습니다.");
            }

            const { imageId, imageUrl } = result;
            const newImageIds = [...(content.imageIds || []), imageId];
            const newImageUrls = [...(imageUrls || []), imageUrl];

            onChange("imageIds", newImageIds);
            setImageUrls(newImageUrls);
        } catch (e: any) {
            setError(e.message || "이미지 업로드 실패");
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        if (!content.imageIds || !imageUrls) return;
        onChange("imageIds", content.imageIds.filter((_, i) => i !== index));
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const isMaxReached = (content.imageIds?.length || 0) >= 5;

    return (
        <div className={S.wrapper}>
            <h1 className={S.title}>{isEdit ? "포스트 수정" : "포스트 생성"}</h1>

            <div className={S.imageContainer}>
                <div className={S.previewWrapper}>
                    {(!imageUrls || imageUrls.length === 0) && (
                        <div className={S.previewPlaceholder}>
                            <ImageIcon className={S.previewPlaceholderIcon} />
                        </div>
                    )}
                    {imageUrls?.map((url, index) => (
                        <div key={index} className={S.previewItem}>
                            <img src={url} alt={`preview-${index}`} className={S.previewImage} />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className={S.removeButton}
                                aria-label="이미지 삭제"
                            >
                                <XIcon size={S.removeIconSize} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={S.uploadControlsContainer}>
                    <input id="postImages" type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isMaxReached || uploading} />
                    <HoverCard openDelay={50} closeDelay={100}>
                        <HoverCardTrigger>
                            <label htmlFor="postImages" className={S.uploadLabel(isMaxReached, uploading)}>
                                {uploading ? "업로드 중..." : isMaxReached ? "최대 5장" : "파일 선택"}
                            </label>
                        </HoverCardTrigger>
                        {isMaxReached && (
                            <HoverCardContent>
                                <p className={S.uploadLimitError}>이미지는 최대 5장까지 업로드할 수 있습니다.</p>
                            </HoverCardContent>
                        )}
                    </HoverCard>
                    <p className={S.uploadCountText}>{(content.imageIds?.length || 0)} / 5장</p>
                    {error && <p className={S.uploadErrorText}>{error}</p>}
                </div>
            </div>

            <div className={S.contentContainer}>
                <AutosizeTextarea
                    value={content.content}
                    onChange={(e) => onChange("content", e.target.value)}
                    placeholder="무슨 생각을 하고 계신가요?"
                    rows={1}
                    className={S.textarea}
                    maxHeight={600}
                />
                <p className={S.contentCount(content.content.length)}>
                    {content.content.length} / {MAX_POST_CONTENT_LENGTH}자
                </p>
            </div>

            <HoverCard openDelay={50} closeDelay={100}>
                <HoverCardTrigger>
                    <Button 
                        onClick={() => onSubmit(content, imageUrls)} 
                        disabled={!isValid}
                    >
                        {isEdit ? "포스트 수정하기" : "포스트 생성하기"}
                    </Button>
                </HoverCardTrigger>
                {(!isValid && typeof errors === 'object' && errors !== null && Object.keys(errors).length > 0) && (
                    <HoverCardContent>
                        <ul className={S.submitErrorList}>
                            {Object.values(errors)
                                .filter(Boolean)
                                .map((error, index) => (
                                    <li key={index}>{error as string}</li>
                            ))}
                        </ul>
                    </HoverCardContent>
                )}
            </HoverCard>
        </div>
    );
};

export default PostForm;