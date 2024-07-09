import {useQuery} from "@tanstack/react-query";
import {fetchMe} from "../../api/api.ts";
import {queryCLient} from "../../api/queryCLient.ts";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {PostForm} from "../PostForm";

export const Account = () => {
  const meQuery =  useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
  }, queryCLient)

  switch (meQuery.status) {

    case "pending":

      console.log(meQuery.status)
      return <Loader/>
    case "error":
      console.log(meQuery.status)
      return <AuthForm/>
    case "success":
      console.log(meQuery.status)
      return <PostForm />
  }
}