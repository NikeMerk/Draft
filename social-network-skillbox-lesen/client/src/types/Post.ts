import {z} from "zod";

// --- Create Schema
const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
})
const PostListSchema = z.array(PostSchema);


// --- create Types
export type Post = z.infer<typeof PostSchema>;
export type PostList = z.infer<typeof PostListSchema>;

interface IdleRequestState {
  status: "idle";
}

interface ILoadingRequestState {
  status: "pending";
}

interface ISuccessRequestState {
  status: "success";
  data: PostList;
}

interface IErrorRequestState {
  status: "error";
  error: unknown;
}

export type RequestState = IdleRequestState | ILoadingRequestState | ISuccessRequestState | IErrorRequestState;


