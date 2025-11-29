import {
  MAX_CHANNEL_DESCRIPTION_LENGTH,
  MAX_CHANNEL_TITLE_LENGTH,
  MIN_CHANNEL_TITLE_LENGTH,
  NOT_ALLOWED_REGEX,
} from '@/constants/constants';
import type { Channel, ChannelRequest } from '@/types/channel.type';
import type { Errors } from '@/types/form.type';

export const validateChannel = (form: Partial<ChannelRequest> | Partial<Channel>): Errors<ChannelRequest> => {
  const errors: Errors<ChannelRequest> = {};

  let title = '';
  let description = '';

  if ('channelInfo' in form && form.channelInfo) {
    title = form.channelInfo.title || '';
    description = form.channelInfo.description || '';
  } else {
    title = (form as ChannelRequest).title || '';
    description = (form as ChannelRequest).description || '';
  }

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    errors.title = '제목을 입력해주세요.';
  } else {
    if (trimmedTitle.length > MAX_CHANNEL_TITLE_LENGTH) {
      errors.title = `제목은 최대 ${MAX_CHANNEL_TITLE_LENGTH}자까지 입력할 수 있습니다.`;
    }
    if (trimmedTitle.length < MIN_CHANNEL_TITLE_LENGTH) {
      errors.title = `제목은 최소 ${MIN_CHANNEL_TITLE_LENGTH}자 이상이어야 합니다.`;
    }
    if (NOT_ALLOWED_REGEX.test(trimmedTitle)) {
      errors.title = '제목에 허용되지 않는 문자가 포함되어 있습니다.';
    }
  }

  if (trimmedDescription.length > MAX_CHANNEL_DESCRIPTION_LENGTH) {
    errors.description = `설명은 최대 ${MAX_CHANNEL_DESCRIPTION_LENGTH}자까지 입력할 수 있습니다.`;
  }

  return errors;
};
