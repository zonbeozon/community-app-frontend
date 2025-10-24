import { Errors } from "@/types/form.type";
import { ServerMember } from "@/types/serverMember.type";
import { MAX_USER_NAME_LENGTH, NOT_ALLOWED_REGEX } from "@/constants/constants";

const validateServerMember = (
  form: ServerMember
): Errors<ServerMember> => {
  const errors: Errors<ServerMember> = {};

  const trimmedUsername = form.username.trim();

  if (!trimmedUsername) {
    errors.username = "사용할 닉네임을 입력해주세요.";
  } else {
    if (trimmedUsername.length > MAX_USER_NAME_LENGTH) {
    errors.username = `닉네임은 최대 ${MAX_USER_NAME_LENGTH}자까지 입력할 수 있습니다.`;
    } 
    if (NOT_ALLOWED_REGEX.test(trimmedUsername)) {
      errors.username = "닉네임에 허용되지 않는 문자가 포함되어 있습니다.";
    }
  }
    
  return errors;
};

export default validateServerMember;
