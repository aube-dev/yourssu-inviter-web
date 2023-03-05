import { type ReactNode } from 'react';
import styles from './FormItem.module.css';

interface FormItemProps {
  variant: 'large' | 'small' | 'textarea';
  label?: string | ReactNode;
  placeholder?: string;
  middleElement?: ReactNode;
  value: string;
  onTextChange?: (text: string) => void;
}

const FormItem = ({
  variant,
  label,
  placeholder,
  middleElement,
  value,
  onTextChange,
}: FormItemProps) => {
  return (
    <div
      className={
        variant === 'small' ? styles.smallContainer : styles.largeContainer
      }
    >
      {typeof label === 'string' ? (
        <p className={styles.label}>{label}</p>
      ) : (
        label
      )}
      {middleElement}
      {variant === 'textarea' ? (
        <textarea
          value={value}
          onInput={(e) => {
            onTextChange?.(e.currentTarget.value);
          }}
          placeholder={placeholder}
          className={styles.textArea}
        />
      ) : (
        <div>
          <input
            value={value}
            onInput={(e) => {
              onTextChange?.(e.currentTarget.value);
            }}
            placeholder={placeholder}
            className={styles.input}
          />
        </div>
      )}
    </div>
  );
};

export default FormItem;
