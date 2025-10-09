import { Channel } from "@/types/channel.type";

/**
 * [디버깅용] ChannelItem 컴포넌트
 * 모든 내부 로직(훅, 자식 컴포넌트)을 제거하고
 * 오직 props로 받은 channel의 이름만 렌더링하는 최소 단위 테스트 버전입니다.
 */
const ChannelItem = ({ channel }: { channel: Channel }) => {
  // channel 객체와 그 안의 channelInfo가 유효한지 안전하게 확인합니다.
  const title = channel?.channelInfo?.title;

  // 만약 title이 없다면, 렌더링하지 않습니다.
  if (!title) {
    return null;
  }

  return (
    <li
      style={{
        backgroundColor: "rgba(255, 0, 0, 0.7)", // 눈에 확 띄는 빨간색 배경
        color: "white",
        fontWeight: "bold",
        padding: "10px",
        margin: "5px 0",
        border: "1px solid white",
        listStyle: "none",
        borderRadius: "4px",
      }}
    >
      [테스트] {title}
    </li>
  );
};

export default ChannelItem;