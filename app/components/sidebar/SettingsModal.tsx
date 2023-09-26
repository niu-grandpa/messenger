'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import Input from '../inputs/Input';
import Modal from '../modals/Modal';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser = {},
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log(currentUser, '&TEST_CURRENT_USER');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('发生了一些错误'))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2
              className='
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              '>
              个人信息
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>编辑信息</p>

            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor='photo'
                  className='
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  '>
                  照片
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width='48'
                    height='48'
                    className='rounded-full'
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt='Avatar'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset='pgc9ehd5'>
                    <Button disabled={isLoading} secondary type='button'>
                      修改
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className='
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          '>
          <Button disabled={isLoading} secondary onClick={onClose}>
            取消
          </Button>
          <Button disabled={isLoading} type='submit'>
            保存
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
