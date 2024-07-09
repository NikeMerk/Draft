import {FC, FormEventHandler, useState} from 'react';

import {FormField} from '../FormField';
import {Button} from '../Button';
import './RegistrationForm.css';
import {useMutation} from "@tanstack/react-query";
import {requestUser} from "../../api/api.ts";
import {queryCLient} from "../../api/queryCLient.ts";

export const RegistrationForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const requestMutation = useMutation({
    mutationFn: () => requestUser(username, password)
  }, queryCLient);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    requestMutation.mutate()
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {requestMutation.error && <span>{requestMutation.error.message}</span>}

      <Button type="submit" title="Зарегистрироваться" isLoading={requestMutation.isPending}/>
    </form>
  );
};
