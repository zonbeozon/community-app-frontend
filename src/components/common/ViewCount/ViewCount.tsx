import { Post } from "@/types/post.type";
import { Eye } from "lucide-react";
import * as S from "./ViewCount.styles";

interface ViewCountProps {
  post: Post;
}

const ViewCount = ({ post }: ViewCountProps) => {
  return (
    <div className={S.wrapper}>
      <Eye size={S.iconSize} className={S.icon}/>
      <span className={S.text}>{post.metric.viewCount}</span>
    </div>
  );
};

export default ViewCount;