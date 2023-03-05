import Image from 'next/image';
import { useState } from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  title: string;
  description: string;
  inputPlaceholder?: string;
  buttonText: string;
  onConfirm?: (text: string) => void;
}

const Popup = ({
  title,
  description,
  inputPlaceholder,
  buttonText,
  onConfirm,
}: PopupProps) => {
  const [text, setText] = useState('');

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Image
          className={styles.closeButton}
          alt=""
          src="/ic_x.svg"
          width={24}
          height={24}
        />
        <pre className={styles.titleText}>{title}</pre>
        <pre className={styles.descriptionText}>{description}</pre>
        <input
          className={styles.input}
          placeholder={inputPlaceholder}
          value={text}
          onInput={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <div
          className={styles.button}
          onClick={() => {
            onConfirm?.(text);
          }}
        >
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default Popup;
