import './App.css';
import {FC} from "react";
import {FetchPostListVew} from "./components/PostListView/FetchPostListVew.tsx";
import {Account} from "./components/Account/Account.tsx";


export const App:FC = () => {


  return <div className="app">
    <Account/>
    <FetchPostListVew />
  </div>;
}


