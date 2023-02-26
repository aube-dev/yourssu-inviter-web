import { useState } from 'react';
import styles from './TabBar.module.css';

interface TabBarProps {
  labels: readonly string[];
  onTabChange?: (index: number, label: string) => void;
}

const TabBar = ({ labels, onTabChange }: TabBarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.container}>
      {labels.map((label, index) => (
        <div
          key={label}
          className={styles.itemContainer}
          onClick={() => {
            setSelectedIndex(index);
            onTabChange?.(index, label);
          }}
        >
          <div
            className={`${styles.itemTextWrap}${
              selectedIndex === index ? ` ${styles.selectedItemTextWrap}` : ''
            }`}
          >
            {label}
          </div>
          <div
            className={`${styles.itemBorder}${
              selectedIndex === index ? ` ${styles.selectedItemBorder}` : ''
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default TabBar;
