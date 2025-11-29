import { Eye } from 'lucide-react';
import { Post } from '@/types/post.type';
import * as S from './ViewCount.styles';

export const ViewCount = ({ post }: { post: Post }) => {
  return (
    <div className={S.wrapper}>
      <Eye size={S.iconSize} className={S.icon} />
      <span className={S.text}>{post.metric.viewCount}</span>
    </div>
  );
};
