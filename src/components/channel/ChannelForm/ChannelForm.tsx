import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AutosizeTextarea } from "@/components/ui/AutoSizeTextArea";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { MAX_CHANNEL_TITLE_LENGTH, MAX_CHANNEL_DESCRIPTION_LENGTH } from "@/constants/config";
import * as S from "./ChannelForm.styles";
import type { ChannelRequest, ChannelType, ContentVisibility, JoinPolicy } from "@/types/channel.type";
import type { FormProps } from "@/types/form.type";
import { SingleImageUploader } from "@/components/common/SingleImageUploader/SingleImageUploader";

const ChannelForm = ({
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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onChange = useCallback(
    (
      field: keyof ChannelRequest | `settings.${keyof ChannelRequest["settings"]}`,
      value: any
    ) => {
      if (field.startsWith("settings.")) {
        const settingKey = field.split(".")[1] as keyof ChannelRequest["settings"];
        formOnChange("settings", { ...content.settings, [settingKey]: value });
      } else {
        formOnChange(field as keyof ChannelRequest, value);
      }
    },
    [formOnChange, content.settings]
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(content, imageFile);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={S.section}>
        <h1 className="text-2xl font-bold mb-4">{isEdit ? "채널 수정" : "채널 생성"}</h1>

        {!isEdit && (
          <div className={S.inputGroupMargin}>
            <Label className={S.labelMargin}>채널 유형</Label>
            <RadioGroup
              value={content.channelType}
              onValueChange={(value) => onChange("channelType", value as ChannelType)}
              className={S.radioGroupClass}
            >
              <Label htmlFor="type-blog" className="flex items-center gap-2 cursor-pointer font-normal">
                <RadioGroupItem value="BLOG" id="type-blog" />
                블로그
              </Label>
              <Label htmlFor="type-groupchat" className="flex items-center gap-2 cursor-pointer font-normal">
                <RadioGroupItem value="CHAT" id="type-groupchat" />
                그룹 채팅
              </Label>
            </RadioGroup>
          </div>
        )}

        <div className={S.inputGroupMargin}>
          <Label htmlFor="channelTitle" className={S.moreLabelMargin}>채널 이름</Label>
          <Input
            id="channelTitle"
            placeholder="채널 이름을 입력해주세요."
            value={content.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
            autoComplete="off"
            className="resize-none mt-3"
          />
          <p className={S.titleCount(content.title.length)}>
            {content.title.length} / {MAX_CHANNEL_TITLE_LENGTH}자
          </p>
        </div>

        <div className={S.inputGroupMargin}>
          <Label htmlFor="channelDescription" className={S.moreLabelMargin}>채널 설명</Label>
          <AutosizeTextarea
            id="channelDescription"
            placeholder="채널 설명을 입력해주세요."
            value={content.description}
            onChange={(e) => onChange("description", e.target.value)}
            required
            maxHeight={180}
            className="resize-none mt-3"
          />
          <p className={S.descriptionCount(content.description.length)}>
            {content.description.length} / {MAX_CHANNEL_DESCRIPTION_LENGTH}자
          </p>
        </div>

        <div className={S.inputGroupMargin}>
          <Label htmlFor="profileImage" className={S.labelMargin}>채널 프로필 이미지</Label>
          <SingleImageUploader
            initialImageUrl={imagePreview}
            isUploading={isSubmitting}
            onFileSelect={setImageFile}
          />
        </div>
      </div>

      <div className={S.section}>
        <Label className={S.labelMargin}>채널 공개 여부</Label>
        <RadioGroup
          value={content.settings.contentVisibility}
          onValueChange={(value) => onChange("settings.contentVisibility", value as ContentVisibility)}
          className={S.radioGroupClass}
        >
          <Label htmlFor="search-public" className="flex items-center gap-2 cursor-pointer font-normal">
            <RadioGroupItem value="PUBLIC" id="search-public" />
            공개
          </Label>
          <Label htmlFor="search-private" className="flex items-center gap-2 cursor-pointer font-normal">
            <RadioGroupItem value="PRIVATE" id="search-private" />
            비공개
          </Label>
        </RadioGroup>
      </div>

        <div className={S.section}>
          <Label className={S.labelMargin}>채널 참가 설정</Label>
          <RadioGroup
            value={content.settings.joinPolicy}
            onValueChange={(value) => onChange("settings.joinPolicy", value as JoinPolicy)}
            className={S.radioGroupClass}
          >
            <Label htmlFor="join-open" className="flex items-center gap-2 cursor-pointer font-normal">
              <RadioGroupItem value="OPEN" id="join-open" />
              자유 가입
            </Label>
            <Label htmlFor="join-aproval" className="flex items-center gap-2 cursor-pointer font-normal">
              <RadioGroupItem value="APPROVAL" id="join-approval" />
              승인
            </Label>
            <Label htmlFor="join-deny" className="flex items-center gap-2 cursor-pointer font-normal">
              <RadioGroupItem value="DENY" id="join-deny" />
              가입 불가
            </Label>
          </RadioGroup>
        </div>

      <div className="flex justify-end mt-6">
        <HoverCard openDelay={50} closeDelay={100}>
          <HoverCardTrigger asChild>
             <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "처리 중..." : (isEdit ? "채널 수정하기" : "채널 생성하기")}
            </Button>
          </HoverCardTrigger>
          {!isValid && Object.values(errors).filter(Boolean).length > 0 && (
            <HoverCardContent>
              <ul className="list-disc pl-4 text-destructive text-sm">
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

export default ChannelForm;