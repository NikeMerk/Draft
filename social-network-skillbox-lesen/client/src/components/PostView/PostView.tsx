import './PostView.css';
import {Post} from "../../types/Post.ts";
import {FC} from "react";
import {FetchUserVew} from "../UserView/FetchUserVew.tsx";

function formatDate(timestamp:number) : string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

interface IPostViewProps {
  post : Post;
}

export const PostView:FC<IPostViewProps> = ({ post }) => {
  return (
    <div className="post-view">
      <FetchUserVew userId={post.authorId}/>
      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
    </div>
  );
};
