import { useCallback } from 'react';
import { SingleImageUploader } from '@/components/common/SingleImageUploader/SingleImageUploader';
import { AutosizeTextarea } from '@/components/ui/AutoSizeTextArea';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MAX_CHANNEL_DESCRIPTION_LENGTH, MAX_CHANNEL_TITLE_LENGTH } from '@/constants/constants';
import type { ChannelRequest, ContentVisibility, JoinPolicy } from '@/types/channel.type';
import type { FormProps } from '@/types/form.type';
import * as S from './ChannelForm.styles';

export const ChannelForm = ({
  content,
  errors,
  handler,
  isEdit,
  isValid,
  onSubmit,
  imagePreview,
  isSubmitting,
}: FormProps<ChannelRequest, string | null>) => {
  const { onChange: formOnChange } = handler;

  const onChange = useCallback(
    (field: keyof ChannelRequest | `settings.${keyof ChannelRequest['settings']}`, value: any) => {
      if (field.startsWith('settings.')) {
        const settingKey = field.split('.')[1] as keyof ChannelRequest['settings'];
        formOnChange('settings', { ...content.settings, [settingKey]: value });
      } else {
        formOnChange(field as keyof ChannelRequest, value);
      }
    },
    [formOnChange, content.settings],
  );

  const handleImageUploadSuccess = useCallback(
    (imageId: number | null) => {
      onChange('imageId', imageId);
    },
    [onChange],
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(content);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={S.section}>
        <h1 className={S.formTitle}>{isEdit ? '채널 수정' : '채널 생성'}</h1>

        <div className={S.inputGroupMargin}>
          <Label htmlFor="channelTitle" className={S.labelMargin}>
            채널 이름
          </Label>
          <Input
            id="channelTitle"
            placeholder="채널 이름을 입력해주세요."
            value={content.title}
            onChange={(e) => onChange('title', e.target.value)}
            required
            autoComplete="off"
            className={S.inputField}
          />
          <p className={S.titleCount(content.title.length)}>
            {content.title.length} / {MAX_CHANNEL_TITLE_LENGTH}자
          </p>
        </div>

        <div className={S.inputGroupMargin}>
          <Label htmlFor="channelDescription" className={S.labelMargin}>
            채널 설명
          </Label>
          <AutosizeTextarea
            id="channelDescription"
            placeholder="채널 설명을 입력해주세요."
            value={content.description}
            onChange={(e) => onChange('description', e.target.value)}
            maxHeight={180}
            className={S.inputField}
          />
          <p className={S.descriptionCount(content.description.length)}>
            {content.description.length} / {MAX_CHANNEL_DESCRIPTION_LENGTH}자
          </p>
        </div>

        <div className={S.inputGroupMargin}>
          <Label>채널 프로필 이미지</Label>
          <SingleImageUploader
            initialImageUrl={imagePreview}
            isUploading={isSubmitting}
            onUploadSuccess={handleImageUploadSuccess}
          />
        </div>
      </div>

      <div className={S.section}>
        <Label className={S.labelMargin}>채널 공개 여부</Label>
        <RadioGroup
          value={content.settings.contentVisibility}
          onValueChange={(value) => onChange('settings.contentVisibility', value as ContentVisibility)}
          className={S.radioGroupClass}
        >
          <Label htmlFor="search-public" className={S.radioLabel}>
            <RadioGroupItem value="PUBLIC" id="search-public" />
            공개
          </Label>
          <Label htmlFor="search-private" className={S.radioLabel}>
            <RadioGroupItem value="PRIVATE" id="search-private" />
            비공개
          </Label>
        </RadioGroup>
      </div>

      <div className={S.section}>
        <Label className={S.labelMargin}>채널 참가 설정</Label>
        <RadioGroup
          value={content.settings.joinPolicy}
          onValueChange={(value) => onChange('settings.joinPolicy', value as JoinPolicy)}
          className={S.radioGroupClass}
        >
          <Label htmlFor="join-open" className={S.radioLabel}>
            <RadioGroupItem value="OPEN" id="join-open" />
            자유 가입
          </Label>
          <Label htmlFor="join-aproval" className={S.radioLabel}>
            <RadioGroupItem value="APPROVAL" id="join-approval" />
            승인
          </Label>
          <Label htmlFor="join-deny" className={S.radioLabel}>
            <RadioGroupItem value="DENY" id="join-deny" />
            가입 불가
          </Label>
        </RadioGroup>
      </div>

      <div className={S.submitButtonContainer}>
        <HoverCard openDelay={50} closeDelay={100}>
          <HoverCardTrigger>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? '처리 중...' : isEdit ? '채널 수정하기' : '채널 생성하기'}
            </Button>
          </HoverCardTrigger>
          {!isValid && Object.values(errors).filter(Boolean).length > 0 && (
            <HoverCardContent>
              <ul className={S.errorList}>
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
    </form>
  );
};
