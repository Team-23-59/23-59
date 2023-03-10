import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { emailCheck } from '../../utilities/regex';
import useRegister from '../../hooks/useUserRegister';
import * as SC from './FormStyled';
import { RegisterFormValue } from '../../types/interfaces';

/* eslint-disable react/jsx-props-no-spreading */

function Userform() {
  const { registerRequest } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValue>();

  // data를 보낸다.
  const OnSubmit: SubmitHandler<RegisterFormValue> = (data) => {
    registerRequest(data);
  };

  return (
    <SC.Container>
      <SC.Form onSubmit={handleSubmit(OnSubmit)}>
        <SC.FormTitle>회원가입</SC.FormTitle>
        <SC.FormLabel>이메일</SC.FormLabel>
        <SC.FormInput
          {...register('email', {
            required: '필수 응답 항목입니다.',
            pattern: { value: emailCheck, message: '이메일 형식이 아닙니다.' },
          })}
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        {errors.email && errors.email.type === 'required' && <SC.ErrorMesg>이메일을 입력해주세요.</SC.ErrorMesg>}
        {errors.email && errors.email.type === 'pattern' && <SC.ErrorMesg>올바른 이메일을 입력해주세요.</SC.ErrorMesg>}
        <SC.FormLabel>닉네임</SC.FormLabel>
        <SC.FormInput
          {...register('nickname', { required: true, maxLength: 10 })}
          type="text"
          placeholder="닉네임을 입력해주세요"
        />
        {errors.nickname && errors.nickname.type === 'required' && <SC.ErrorMesg>닉네임을 입력해주세요.</SC.ErrorMesg>}
        {errors.nickname && errors.nickname.type === 'pattern' && (
          <SC.ErrorMesg>올바른 닉네임을 입력해주세요.</SC.ErrorMesg>
        )}
        {errors.nickname && errors.nickname.type === 'maxLength' && (
          <SC.ErrorMesg>10자 이하로 설정해주세요.</SC.ErrorMesg>
        )}
        <SC.FormLabel>비밀번호</SC.FormLabel>
        <SC.FormInput
          autoComplete="new-password"
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.password && errors.password.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <SC.ErrorMesg>6자 이상으로 설정해주세요.</SC.ErrorMesg>
        )}
        <SC.FormLabel>비밀번호 확인</SC.FormLabel>
        <SC.FormInput
          autoComplete="new-password"
          {...register('passwordConfirm', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {errors.passwordConfirm && errors.passwordConfirm.type === 'validate' && (
          <SC.ErrorMesg>비밀번호가 일치하지 않습니다.</SC.ErrorMesg>
        )}
        {errors.passwordConfirm && errors.passwordConfirm.type === 'required' && (
          <SC.ErrorMesg>비밀번호를 입력해주세요.</SC.ErrorMesg>
        )}
        <SC.SubmitButton type="submit">회원가입</SC.SubmitButton>
      </SC.Form>
    </SC.Container>
  );
}

export default Userform;
