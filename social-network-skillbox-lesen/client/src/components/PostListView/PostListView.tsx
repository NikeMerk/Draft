import { FC } from 'react';

import { PostView } from '../PostView';
import './PostListView.css';
import {PostList} from "../../types/Post.ts";

interface IPostListViewProps {
  postList: PostList
}

export const PostListView:FC<IPostListViewProps> = ({ postList }) => {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id} className="post-list__item">
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
