'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub } from 'react-icons/bs';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import LoadingModal from '@/app/components/modals/LoadingModal';
import { toast } from 'react-hot-toast';
import AuthSocialButton from './AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then(callback => {
          if (callback?.error) {
            toast.error('注册失败');
          }

          if (callback?.ok) {
            toast.error('注册成功!');
            router.push('/conversations');
          }
        })
        .catch(() => toast.error('发生了一些错误'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then(callback => {
          if (callback?.error) {
            toast.error('身份验证失败');
          }

          if (callback?.ok) {
            toast.success('欢迎回来!');
            router.push('/conversations');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error('身份验证失败');
        }

        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div
          className='
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        '>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            {variant === 'REGISTER' && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id='name'
                label='用户名'
              />
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='email'
              label='邮箱'
              type='email'
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='password'
              label='密码'
              type='password'
            />
            <div>
              <Button disabled={isLoading} fullWidth type='submit'>
                {variant === 'LOGIN' ? '登录' : '注册'}
              </Button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative mb-2'>
              <div
                className='
                absolute 
                inset-0 
                flex 
                items-center
              '>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-gray-500'>
                  其他方式登录
                </span>
              </div>
            </div>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
          </div>
          <div
            className='
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          '>
            <div>{variant === 'LOGIN' ? '没有帐号?' : '已有帐号?'}</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              {variant === 'LOGIN' ? '立即注册' : '登录'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
