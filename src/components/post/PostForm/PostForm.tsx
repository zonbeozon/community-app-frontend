import { MultiImageUploader } from '@/components/common/MultipleImageUploader/MultipleImgaeUploader';
import { AutosizeTextarea } from '@/components/ui/AutoSizeTextArea';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MAX_POST_CONTENT_LENGTH } from '@/constants/constants';
import type { FormProps } from '@/types/form.type';
import type { PostPayload } from '@/types/post.type';
import * as S from './PostForm.styles'

export const PostForm = ({
  content,
  errors,
  handler,
  isEdit,
  isValid,
  onSubmit,
  imagePreview,
}: FormProps<PostPayload, string[]>) => {
  const { onChange } = handler;

  const handleUploadChange = (ids: number[]) => {
    onChange('imageIds', ids);
  };

  return (
    <div className={S.wrapper}>
      <h1 className={S.title}>{isEdit ? '포스트 수정' : '포스트 생성'}</h1>

      <div className={S.imageContainer}>
        <MultiImageUploader
          initialImageUrls={imagePreview}
          initialImageIds={content.imageIds}
          onUploadChange={(ids) => handleUploadChange(ids)}
          uploadContext={{ folder: 'post-image' }}
          maxImages={5}
        />
      </div>

      <div className={S.contentContainer}>
        <AutosizeTextarea
          value={content.content}
          onChange={(e) => onChange('content', e.target.value)}
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
          <Button onClick={() => onSubmit(content)} disabled={!isValid}>
            {isEdit ? '포스트 수정하기' : '포스트 생성하기'}
          </Button>
        </HoverCardTrigger>
        {!isValid && typeof errors === 'object' && errors !== null && Object.keys(errors).length > 0 && (
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
