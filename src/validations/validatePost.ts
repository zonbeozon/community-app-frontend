import { Errors } from "@/types/form.type";
import { PostRequest } from "@/types/post.type";
import { MAX_POST_CONTENT_LENGTH, NOT_ALLOWED_REGEX } from "@/constants/constants";

const validatePost = (
  form: PostRequest
): Errors<PostRequest> => {
  const errors: Errors<PostRequest> = {};

  const trimmedContent = form.content.trim();

  if (!trimmedContent) {
    errors.content = "포스팅 할 내용을 입력해주세요.";
  } else {
    if (trimmedContent.length > MAX_POST_CONTENT_LENGTH) {
      errors.content = `포스트는 최대 ${MAX_POST_CONTENT_LENGTH}자까지 입력할 수 있습니다.`;
    }
    if (NOT_ALLOWED_REGEX.test(trimmedContent)) {
      errors.content = "포스트에 허용되지 않는 문자가 포함되어 있습니다.";
    }
  }

  return errors;
};

export default validatePost;
