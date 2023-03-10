import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import useSWR from 'swr';
import { LoginFormValue } from '../../types/interfaces';
import * as SC from '../signup/FormStyled';
import { emailCheck } from '../../utilities/regex';
import useLogin from '../../hooks/useUserLogin';
// import { fetcher } from '../../utilities/fetcher';
/* eslint-disable react/jsx-props-no-spreading */

function Loginform() {
  const { loginRequest } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>();

  // const { data, error } = useSWR('http://localhost:8000/api/users', fetcher);
  // console.log('data', data, 'error', error);

  const OnSubmit: SubmitHandler<LoginFormValue> = (data) => {
    loginRequest(data);
  };

  return (
    <SC.Container>
      <SC.Form onSubmit={handleSubmit(OnSubmit)}>
        <SC.FormTitle>로그인</SC.FormTitle>
        <SC.FormLabel>이메일</SC.FormLabel>
        <SC.FormInput type="email" {...register('email', { required: true, pattern: emailCheck })} />
        {errors.email && errors.email.type === 'required' && <SC.ErrorMesg>이메일을 입력해주세요.</SC.ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <SC.ErrorMesg>올바른 이메일을 입력해주세요.</SC.ErrorMesg>}
        <SC.FormLabel>비밀번호</SC.FormLabel>
        <SC.FormInput
          autoComplete="new-password"
          {...register('password', { required: true, minLength: 6 })}
          type="password"
        />
        {errors.password && errors.password.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <SC.ErrorMesg>6자 이상으로 입력해주세요.</SC.ErrorMesg>
        )}
        <SC.SubmitButton type="submit">로그인</SC.SubmitButton>
        <SC.SignUpLink>
          <Link to="/signup">Signup</Link>
        </SC.SignUpLink>
      </SC.Form>
    </SC.Container>
  );
}

export default Loginform;
