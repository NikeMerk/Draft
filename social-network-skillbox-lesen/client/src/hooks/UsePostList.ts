import {useEffect, useState} from "react";
import {PostList, RequestState} from "../types/Post.ts";
import {fetchPostList} from "../api/api.ts";

export const usePostList = () => {
  const [state, setState] = useState<RequestState>({
    status: "idle"
  });

  useEffect(() => {
    console.log(state);
    if (state.status === "pending") {
      fetchPostList().then((dataArr: PostList) => {
        setState({status: "success", data: dataArr});
      })
    }
  }, [state])

  useEffect(() => {
    setState({status: "pending"});
  }, [])

  const refetch = () => {
    setState({status: "pending"});
  }



  return {state, reload: refetch};
}