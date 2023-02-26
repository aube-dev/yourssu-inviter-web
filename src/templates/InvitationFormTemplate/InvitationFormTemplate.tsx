import FormItem from '@/components/FormItem';
import TabBar from '@/components/TabBar';
import { Template } from '@/constants/basic';
import type { Invitation } from '@/constants/types/invitation';
import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './InvitationFormTemplate.module.css';

interface InvitationFormTemplateProps {
  template: keyof typeof Template;
  initialInfo?: Invitation;
  onSubmit?: (invitation: Invitation) => void;
}

const BASIC_TABS = ['초대장'] as const;
const TABS = [...BASIC_TABS, '참석자'] as const;

const SAMPLE_TEXTS = [
  {
    label: '생일',
    value: '생일 텍스트',
  },
  {
    label: '병맛',
    value: '병맛 텍스트',
  },
  {
    label: '집들이',
    value: '집들이 텍스트',
  },
] as const;

const FORM_SAMPLES = [
  {
    label: '복장',
    placeholder: 'ex. 드레스코드는 Yellow!',
  },
  {
    label: '준비물',
    placeholder: 'ex. 신나는 마음',
  },
  {
    label: '참가비',
    placeholder: 'ex. 무료 / 30,000원',
  },
  {
    label: '계좌번호',
    placeholder: '은행 / 계좌번호를 입력하세요.',
  },
  {
    label: 'P.S.',
    placeholder: 'ex. 야호! 뒤집어지게 놀자!',
  },
] as const;

const InvitationFormTemplate = ({
  template,
  initialInfo,
  onSubmit,
}: InvitationFormTemplateProps) => {
  const [invitation, setInvitation] = useState<Invitation>(
    initialInfo ?? {
      title: '',
      description: '',
      date: '',
      location: '',
      password: 0,
    },
  );

  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topArea}></div>
        <TabBar labels={initialInfo ? TABS : BASIC_TABS} />
      </header>
      <section className={styles.main}>
        <p className={styles.titleText}>{Template[template]}</p>
        <FormItem
          variant="large"
          label="초대장 제목"
          placeholder="OO 파티에 초대합니다"
          value={invitation.title}
          onTextChange={(text) => {
            setInvitation((prev) => ({
              ...prev,
              title: text,
            }));
          }}
        />
        <div
          className={styles.image}
          onClick={() => {
            imageInputRef.current?.click();
          }}
          style={{
            backgroundImage: `url("${invitation.imageUrl}")`,
            backgroundSize: 'cover',
          }}
        >
          <Image alt="" src="/ic_camera_filled.svg" width={24} height={24} />
          <input
            ref={imageInputRef}
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              console.log(e.target.files);
              if (file !== undefined) {
                setInvitation((prev) => ({
                  ...prev,
                  imageUrl: URL.createObjectURL(file),
                }));
              }
            }}
          />
        </div>
        <FormItem
          variant="textarea"
          label="초대장 내용"
          placeholder="직접 입력"
          value={invitation.description}
          onTextChange={(text) => {
            setInvitation((prev) => ({
              ...prev,
              description: text,
            }));
          }}
          middleElement={
            <div className={styles.chipsWrap}>
              {SAMPLE_TEXTS.map((sample) => (
                <div
                  key={sample.label}
                  className={styles.chip}
                  onClick={() => {
                    setInvitation((prev) => ({
                      ...prev,
                      description: sample.value,
                    }));
                  }}
                >
                  <p className={styles.chipText}>{sample.label}</p>
                </div>
              ))}
            </div>
          }
        />
        <FormItem
          variant="small"
          value={invitation.date}
          label="일시"
          onTextChange={(text) => {
            setInvitation((prev) => ({
              ...prev,
              date: text,
            }));
          }}
          placeholder="2023/02/12 15:00 ~ 17:00"
        />
        <FormItem
          variant="small"
          value={invitation.location}
          label="장소"
          onTextChange={(text) => {
            setInvitation((prev) => ({
              ...prev,
              location: text,
            }));
          }}
          placeholder="장소 링크를 붙여넣어 주세요!"
        />
        {invitation.extra?.map((info, index) => (
          <div key={index} className={styles.customInputWrap}>
            <FormItem
              variant="small"
              value={info.value}
              label={
                <input
                  value={info.label}
                  onInput={(e) => {
                    const newText = e.currentTarget.value;
                    setInvitation((prev) => ({
                      ...prev,
                      extra: prev.extra?.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, label: newText }
                          : item,
                      ),
                    }));
                  }}
                  className={styles.labelInput}
                  placeholder="항목"
                />
              }
              placeholder={info.placeholder}
              onTextChange={(text) => {
                setInvitation((prev) => ({
                  ...prev,
                  extra: prev.extra?.map((item, itemIndex) =>
                    itemIndex === index
                      ? {
                          ...item,
                          value: text,
                        }
                      : item,
                  ),
                }));
              }}
            />
            <Image
              className={styles.customInputDeleteIcon}
              alt=""
              src="/ic_x_circle.svg"
              width={18}
              height={18}
              onClick={() => {
                setInvitation((prev) => ({
                  ...prev,
                  extra: prev.extra?.filter(
                    (item, itemIndex) => itemIndex !== index,
                  ),
                }));
              }}
            />
          </div>
        ))}
        <div
          className={styles.plusButtonWrap}
          onClick={() => {
            setInvitation((prev) => ({
              ...prev,
              extra: [
                ...(prev.extra ?? []),
                {
                  label: '',
                  value: '',
                },
              ],
            }));
          }}
        >
          <Image alt="" src="/ic_x.svg" width={32} height={32} />
        </div>
      </section>
      <div className={styles.divider} />
      <section className={styles.main}>
        <p className={styles.titleText}>참가자 입력 폼</p>
        <div className={styles.chipsWrap}>
          {FORM_SAMPLES.map((sample) => (
            <div
              key={sample.label}
              className={styles.chip}
              onClick={() => {
                setInvitation((prev) => {
                  if (prev.forms) {
                    return {
                      ...prev,
                      forms: [...prev.forms, sample],
                    };
                  }
                  return {
                    ...prev,
                    forms: [
                      { label: '이름', placeholder: '김숭실' },
                      { label: '연락처', placeholder: '010-8282-2626' },
                      sample,
                    ],
                  };
                });
              }}
            >
              <p className={styles.chipText}>{sample.label}</p>
            </div>
          ))}
        </div>
        {invitation.forms?.map((form, index) => (
          <div key={index} className={styles.customInputWrap}>
            <FormItem
              variant="small"
              value={form.placeholder ?? ''}
              placeholder="참가자에게 알릴 내용을 입력해 주세요!"
              onTextChange={(text) => {
                setInvitation((prev) => {
                  if (prev.forms) {
                    return {
                      ...prev,
                      forms: prev.forms.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, placeholder: text }
                          : item,
                      ),
                    };
                  }
                  return prev;
                });
              }}
              label={
                index === 0 || index === 1 ? (
                  form.label
                ) : (
                  <input
                    value={form.label}
                    onInput={(e) => {
                      const newText = e.currentTarget.value;
                      setInvitation((prev) => {
                        if (prev.forms) {
                          return {
                            ...prev,
                            forms: prev.forms.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, label: newText }
                                : item,
                            ),
                          };
                        }
                        return prev;
                      });
                    }}
                    className={styles.labelInput}
                    placeholder="항목"
                  />
                )
              }
            />
            <Image
              className={styles.customInputDeleteIcon}
              alt=""
              src="/ic_x_circle.svg"
              width={18}
              height={18}
              onClick={() => {
                setInvitation((prev) => {
                  if (index === 0 || index === 1) {
                    return {
                      ...prev,
                      forms: undefined,
                    };
                  }
                  if (prev.forms) {
                    return {
                      ...prev,
                      forms: prev.forms.filter(
                        (item, itemIndex) => itemIndex !== index,
                      ),
                    };
                  }
                  return prev;
                });
              }}
            />
          </div>
        ))}
        <div
          className={styles.plusButtonWrap}
          onClick={() => {
            setInvitation((prev) => {
              if (prev.forms !== undefined) {
                return {
                  ...prev,
                  forms: [...prev.forms, { label: '' }],
                };
              }
              return {
                ...prev,
                forms: [
                  { label: '이름', placeholder: '김숭실' },
                  { label: '연락처', placeholder: '010-8282-2626' },
                ],
              };
            });
          }}
        >
          <Image alt="" src="/ic_x.svg" width={32} height={32} />
        </div>
      </section>
      <div className={styles.buttonArea}>
        <div
          className={styles.button}
          onClick={() => {
            onSubmit?.(invitation);
          }}
        >
          <p className={styles.buttonText}>초대장 생성하기</p>
        </div>
      </div>
    </main>
  );
};

export default InvitationFormTemplate;
