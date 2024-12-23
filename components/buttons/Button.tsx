'use client';

import { IconType } from 'react-icons';

interface IProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  light?: boolean;
  iconWhite?: boolean;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  light,
  icon: Icon,
  iconWhite,
}: IProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full rounded-full transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
       ${outline ? 'bg-white' : light ? 'bg-primary' : 'bg-[#034542]'}
        ${
          outline
            ? 'border-black'
            : light
            ? 'border-primary'
            : 'border-[#034542]'
        }
         ${outline ? 'text-black' : 'text-white'}
            ${small ? 'py-1' : 'py-2'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'font-medium' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
         `}
    >
      {Icon && (
        <Icon
          size={small ? 19 : 22}
          className={`absolute left-4 top-1  ${
            iconWhite ? 'text-white' : 'text-[#034542]'
          }`}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
