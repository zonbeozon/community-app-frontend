export const SERVER_ERROR_MESSAGES = {
  //Auth
  AUTH_EXPIRED: "인증이 만료되었습니다. 다시 로그인해 주세요.",
  AUTHENTICATION_FAILED: "인증에 실패했습니다. 아이디나 비밀번호를 확인해 주세요.",
  INSUFFICIENT_PERMISSION: "이 작업을 수행할 권한이 없습니다.",

  //Channel
  CHANNEL_GET_FAILED: "채널 조회에 실패했습니다. 다시 시도해 주세요.",
  CHANNEL_CREATE_FAILED: "채널 생성에 실패했습니다. 다시 시도해 주세요.",
  CHANNEL_UPDATE_FAILED: "채널 정보 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  CHANNEL_DELETE_FAILED: "채널 삭제에 실패했습니다. 다시 시도해 주세요.",
  JOINED_CHANNELS_NOT_FOUND: "참가한 채널을 불러올 수 없습니다. 다시 시도해 주세요.",

  //Post
  POST_GET_FAILED: "글 불러오기에 실패했습니다. 다시 시도해 주세요.",
  POST_CREATE_FAILED: "글 작성에 실패했습니다. 다시 시도해 주세요.",
  POST_UPDATE_FAILED: "글 수정에 실패했습니다. 다시 시도해 주세요.",
  POST_DELETE_FAILED: "글 삭제에 실패했습니다. 다시 시도해 주세요.",

  //Comment
  COMMENT_GET_FAILED: "댓글 불러오기에 실패했습니다. 다시 시도해 주세요.",
  COMMENT_CREATE_FAILED: "댓글 작성에 실패했습니다. 다시 시도해 주세요.",
  COMMENT_DELETE_FAILED: "댓글 삭제에 실패했습니다. 다시 시도해 주세요.",

  //ChannelMember
  CHANNELMEMBER_GET_FAILED: "채널 멤버 조회에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_BANNED_GET_FAIL: "강제 퇴장된 채널 멤버 조회에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_JOIN_FAILED: "채널 참가에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_LEAVE_FAILED: "채널 퇴장에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_ROLE_UPDATE_FAILED: "유저 권한 변경에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_BAN_FAILED: "유저 강제 퇴장에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_UNBAN_FAILED: "멤버 퇴장 해제에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_APPROVE_FAILED: "멤버 참가 요청 수락에 실패했습니다. 다시 시도해 주세요.",
  CHANNELMEMBER_DENY_FAILED: "유저 채널 참가 거부에 실패했습니다. 다시 시도해 주세요.",
  OWNER_CANNOT_LEAVE: "채널 소유자는 채널을 떠날 수 없습니다.",

  //ServerMember
  SERVERMEMBER_GET_FAILED: "유저 정보 조회에 실패했습니다. 다시 시도해 주세요.",
  SERVERMEMBER_UPDATE_FAILED: "유저 정보 수정에 실패했습니다. 다시 시도해 주세요.",
  SERVERMEMBER_DELETE_FAILED: "회원탈퇴에 실패했습니다. 다시 시도해 주세요.",
  
  //Reaction
  REACTION_CREATE_FAILED: "반응 남기기에 실패했습니다. 다시 시도해 주세요.",
  REACTION_DELETE_FAILED: "반응 삭제에 실패했습니다. 다시 시도해 주세요.",

  //Common
  INVALID_INPUT_VALUE: "입력값이 올바르지 않습니다.",
  INTERNAL_SERVER_ERROR: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  DEFAULT_API_ERROR: "요청을 처리하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",

  //Image
  IMAGE_UPLOAD_FAIL: "이미지 업로드에 실패했습니다. 다시 시도해 주세요.",
};

export const CLIENT_ERROR_MESSAGES = {
  //Auth
  SIGNIN_FAIL: "로그인에 실패했습니다. 다시 시도해 주세요.",
  SIGNOUT_FAIL: "로그아웃에 실패했습니다. 다시 시도해 주세요.",

  //Common
  EMPTY_CONTENT: "내용을 입력해 주세요.",
  NETWORK_ERROR: "네트워크 연결을 확인해주세요.",
};

export const SUCCESS_MESSAGES = {
  //Auth
  SIGNIN_SUCCESS: "로그인 되었습니다.",
  SIGNOUT_SUCCESS: "로그아웃 되었습니다.",
  
  //Channel
  CHANNEL_CREATE_SUCCESS: "채널이 성공적으로 생성되었습니다.",
  CHANNEL_UPDATE_SUCCESS: "채널 수정이 완료되었습니다.",
  CHANNEL_DELETE_SUCCESS: "채널이 삭제되었습니다.",

  //Post
  POST_CREATE_SUCCESS: "포스트가 작성되었습니다",
  POST_UPDATE_SUCCESS: "포스트가 수정되었습니다.",
  POST_DELETE_SUCCESS: "포스트가 삭제되었습니다.",

  //Comment
  COMMENT_CREATE_SUCCESS: "댓글이 작성되었습니다.",
  COMMENT_DELETE_SUCCESS: "댓글이 삭제되었습니다.",

  //ChannelMember
  CHANNELMEMBER_JOIN_SUCCESS: "채널에 참가했습니다.",
  CHANNEL_LEAVE_SUCCESS: "채널을 떠나는데 성공했습니다.",
  CHANNELMEMBER_UPDATE_ROLE_SUCCESS: "해당 멤버의 권한을 수정했습니다.",
  CHANNELMEMBER_BAN_SUCCESS: "멤버를 퇴장시켰습니다.",
  CHANNELMEMBER_UNBAN_SUCCESS: "멤버 퇴장 해제가 완료되었습니다.",
  CHANNELMEMBER_APPROVE_SUCCESS: "멤버 참가 요청을 수락했습니다.",
  CHANNELMEMBER_DENY_SUCCESS: "멤버 참가 요청을 거절했습니다.",

  //ServerMember
  SERVERMEMBER_UPDATE_SUCCESS: "회원 정보가 수정되었습니다.",
  SERVERMEMBER_DELETE_SUCCESS: "회원 탈퇴가 완료되었습니다.",
};

export const MESSAGES = {
  EMPTY_CHANNEL_GROUP: "추가한 채널이 없습니다.",
  NO_JOINED_CHANNELS: "👋 가입한 채널이 없습니다. 채널에 참여해 보세요!",
  NO_SELECTED_CHANNEL: "👈 채널을 선택하여 대화를 시작해보세요.",
  NO_POSTS_WRITTEN: "🌱 아직 조용해요. 첫 포스트를 작성해 대화를 시작해볼까요?",
  NO_COMMENTS_WRITTEN: "💬 아직 댓글이 없습니다. 첫 댓글을 남겨보세요!",
};