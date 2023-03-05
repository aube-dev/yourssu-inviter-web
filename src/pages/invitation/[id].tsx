import type { Invitation } from '@/constants/types/invitation';
import { Template } from '@/constants/basic';
import { NextPage, type GetServerSideProps } from 'next';
import BasicTemplate from '@/templates/BasicTemplate';

interface Props {
  invitation: Invitation;
  template: keyof typeof Template;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const sample: Invitation = {
    title: 'OO파티에 초대합니다.',
    description: `귀하의 무궁한 발전과 번영을 기원합니다.
다름이 아니오라 금번 개강을 기념함에 있어
다음과 같이 행사를 진행하고자 합니다.
귀하께서 변함없이 보내주신 관심과
성원에 깊이 감사드리며
참석하셔서 자리를 빛내주시기 바랍니다.`,
    date: '2023/02/12 15:00 ~ 17:00',
    location: '짚동가리쌩주',
    password: 0,
    forms: [
      { label: '이름', placeholder: '뿌슝이' },
      { label: '연락처', placeholder: '숫자만 입력하세요' },
    ],
    imageUrl:
      'https://pbs.twimg.com/media/Fjm5xtKacAA7CJr?format=jpg&name=large',
  };

  return {
    props: {
      invitation: sample,
      template: 'basic',
    },
  };
};

const Page: NextPage<Props> = ({ invitation, template }) => {
  return <BasicTemplate invitation={invitation} />;
};

export default Page;
