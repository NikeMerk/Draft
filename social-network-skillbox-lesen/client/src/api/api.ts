import {User, UserSchema} from "../types/User.ts";
import {PostList} from "../types/Post.ts";
import {validateResponse} from "./validataResponse.ts";

// const URL = "http://localhost:4000"

export const fetchPostList = async (): Promise<PostList> => {
  return await fetch(`/api/posts`)
    .then(arr => arr.json())
    .then(res => res.list)
}

export const fetchUsers = async (authorId: string): Promise<User> => {
  return await fetch(`/api/users/${authorId}`)
    .then(arr => arr.json())
    .then(data => (UserSchema.parse(data)))
}

export const requestUser = (username: string, password: string): Promise<void> => {
  return fetch(`/api/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username, password
    })
  }).then(() => undefined)
}

export const login = (username: string, password: string): Promise<void> => {
  return fetch(`/api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({username, password})
  }).then(response => validateResponse(response))
    .then(() => undefined)
}

export const fetchMe = (): Promise<User> => {
  return fetch(`/api/users/me`)
    .then(validateResponse)
    .then(res => res.json())
    .then(res => UserSchema.parse(res))
}

export const createPost = (text: string): Promise<void> => {
  return fetch("api/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      text,
    })
  })
    .then(res => res.json())
    .then(res => console.log(res))
}