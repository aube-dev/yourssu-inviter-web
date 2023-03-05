import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ text, disabled, onClick }: ButtonProps) => {
  return (
    <button
      onClick={() => {
        if (!disabled) {
          onClick?.();
        }
      }}
      className={`${styles.container}${disabled ? ` ${styles.disabled}` : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
