import {useQuery} from "@tanstack/react-query";
import {FC} from "react";

import {Loader} from "../Loader";
import {PostListView} from "./PostListView.tsx";
import {fetchPostList} from "../../api/api.ts";
import {queryCLient} from "../../api/queryCLient.ts";

export const FetchPostListVew: FC = () => {

  const postListQuery =  useQuery({
    queryFn: () => fetchPostList(),
    queryKey: ["posts"]
  }, queryCLient);

  switch (postListQuery.status) {
    case "pending":
      return <Loader/>
    case "success":
      return <PostListView postList={postListQuery.data}/>
    case "error":
      return (
        <div className={"block-error"}>
          <span className="span-error">Error</span>
          <button className="button-error" onClick={() => postListQuery.refetch}>repeat request</button>
        </div>
      )
  }
}