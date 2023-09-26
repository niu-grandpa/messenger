import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type='button'
      className='w-full flex justify-center items-center text-[26px]'
      onClick={onClick}>
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
