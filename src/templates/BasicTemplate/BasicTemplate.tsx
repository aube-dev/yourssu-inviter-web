import Button from '@/components/Button';
import FormItem from '@/components/FormItem';
import type { TemplateBaseProps } from '@/constants/types/template';
import { captureAndShare } from '@/utils/capture';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './BasicTemplate.module.css';

interface FormViewItemProps {
  label: string;
  value: string;
}

const FormViewItem = ({ label, value }: FormViewItemProps) => {
  return (
    <div className={styles.formViewItemContainer}>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

const BasicTemplate = ({
  invitation,
  onFormSubmit,
  onEditPress,
}: TemplateBaseProps) => {
  const [formInfo, setFormInfo] = useState<string[]>(
    invitation.forms?.map(() => '') ?? [],
  );
  const [responded, setResponded] = useState(false);

  const buttonDisabled = formInfo.reduce(
    (prev, cur) => (cur.length === 0 ? true : prev),
    false,
  );

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <div ref={printRef} className={styles.captureArea}>
        <header className={styles.header}>
          <Image src="/logo.png" alt="" width={122} height={59} />
          <p className={styles.titleText}>{invitation.title}</p>
        </header>

        <main className={styles.main}>
          {invitation.imageUrl && (
            <div className={styles.imageArea}>
              <Image
                className={styles.image}
                src={invitation.imageUrl}
                alt=""
                fill
              />
            </div>
          )}
          <div className={styles.contentArea}>
            <p className={styles.descriptionText}>{invitation.description}</p>
            <FormViewItem label="일시" value={invitation.date} />
            <FormViewItem label="장소" value={invitation.location} />
            {invitation.extra?.map((item, index) => (
              <FormViewItem key={index} label={item.label} value={item.value} />
            ))}
          </div>
          {!responded && invitation.forms && (
            <div className={styles.formsContainer}>
              {invitation.forms.map((form, index) => (
                <FormItem
                  key={index}
                  variant="small"
                  label={form.label}
                  placeholder={form.placeholder}
                  value={formInfo[index]}
                  onTextChange={(text) => {
                    setFormInfo((prev) =>
                      prev.map((item, itemIndex) =>
                        itemIndex === index ? text : item,
                      ),
                    );
                  }}
                />
              ))}
              <Button
                text="초대 수락하기"
                disabled={buttonDisabled}
                onClick={() => {
                  onFormSubmit?.(formInfo);
                  setResponded(true);
                }}
              />
            </div>
          )}
        </main>
      </div>

      <footer className={styles.footer}>
        <Button
          text="이미지 저장하기"
          onClick={() => {
            if (printRef.current) {
              captureAndShare(printRef.current, 'invitation');
            }
          }}
        />
        <Button
          text="초대장 링크 복사하기"
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            alert('초대장 링크가 복사되었습니다.');
          }}
        />
      </footer>
      <span
        className={styles.editButton}
        onClick={() => {
          onEditPress?.();
        }}
      >
        Edit
      </span>
    </div>
  );
};

export default BasicTemplate;
