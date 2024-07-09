import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchUsers} from "../../api/api.ts";
import {queryCLient} from "../../api/queryCLient.ts";
import {Loader} from "../Loader";
import {UserView} from "./UserView.tsx";

interface FetchUserVewProps {
  userId: string;
}

export const FetchUserVew: FC<FetchUserVewProps> = ({userId}) => {
  const userQuery = useQuery({
    queryFn: () => fetchUsers(userId),
    queryKey: ["users", userId]
  }, queryCLient);

  switch (userQuery.status) {
    case "pending":
      return <Loader/>
    case "success":
      return <UserView user={userQuery.data}/>
    case "error":
      return <div className={"block-avatar-error"}>
        <span className={"span-avatar-error"}>Error</span>
        <button className="button-avatar-error" onClick={() => userQuery.refetch}>Repeat request</button>
      </div>
  }
}