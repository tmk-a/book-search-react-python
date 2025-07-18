import "./Button.scss";

type Props = {
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onclick?: () => void;
  disabled?: boolean;
};

const BASE_CLASS = "button";

export const Button = ({ name, type, className, onclick, disabled }: Props) => {
  return (
    <button
      type={type}
      className={`${BASE_CLASS} ${className}`}
      onClick={onclick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};
