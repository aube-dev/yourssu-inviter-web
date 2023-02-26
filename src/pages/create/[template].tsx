import TabBar from '@/components/TabBar';
import { Template } from '@/constants/basic';
import InvitationFormTemplate from '@/templates/InvitationFormTemplate';
import { type GetStaticProps, type GetStaticPaths, type NextPage } from 'next';
import Head from 'next/head';
import styles from './template.module.css';

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
  return (
    <>
      {/* <Head></Head> */}
      <InvitationFormTemplate template={template} />
    </>
  );
};

export default Page;
