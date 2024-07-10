import {FC} from 'react';

import {Button} from '../Button';
import {FormField} from '../FormField';
import './PostForm.css';
import {useMutation} from "@tanstack/react-query";
import {createPost} from "../../api/api.ts";
import {queryCLient} from "../../api/queryCLient.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const CreatePostSchema = z.object({
  text: z.string().min(10, "Длина строки не менее 10 символов")
})

export interface IPostFormProps {}
type CreatePostForm = z.infer<typeof CreatePostSchema>

export const PostForm: FC<IPostFormProps> = () => {

  const {
    register,
    handleSubmit,
    formState:{errors}
  } =  useForm<CreatePostForm>({
    resolver: zodResolver(CreatePostSchema)
  })

  const createPostMutation =  useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryCLient.invalidateQueries({queryKey: ["posts"]});
    }
  }, queryCLient)



  return (
    <form onSubmit={handleSubmit(({text}) => {
      createPostMutation.mutate(text)
    })} className="post-form">
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea className="post-form__input"
                  {...register("text")}
        />
      </FormField>

      <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending}/>
    </form>
  );
};
