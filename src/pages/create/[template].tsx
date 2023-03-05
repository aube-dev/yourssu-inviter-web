import Popup from '@/components/Popup';
import { Template } from '@/constants/basic';
import { Invitation } from '@/constants/types/invitation';
import InvitationFormTemplate from '@/templates/InvitationFormTemplate';
import { type GetStaticProps, type GetStaticPaths, type NextPage } from 'next';
import { useState } from 'react';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.keys(Template).map((template) => ({
      params: { template },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { template: keyof typeof Template },
  { template: keyof typeof Template }
> = (context) => {
  return {
    props: {
      template: context.params?.template ?? 'basic',
    },
  };
};

const Page: NextPage<{ template: keyof typeof Template }> = ({ template }) => {
  const [info, setInfo] = useState<Invitation | undefined>(undefined);

  return (
    <>
      <InvitationFormTemplate template={template} onSubmit={setInfo} />
      {info && (
        <Popup
          title={`암호를 설정하면 초대장이 완성되고\n당신은 <초대짱>이 됩니다.`}
          description={`초대장 하단 ‘edit’를 누르고 암호를 입력하면\n수정이 가능해요. 잊지 마세요! 암호를!`}
          inputPlaceholder="****"
          buttonText="초대장 완성하기"
        />
      )}
    </>
  );
};

export default Page;
