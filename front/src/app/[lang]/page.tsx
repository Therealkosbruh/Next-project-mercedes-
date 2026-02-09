import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import Intro from '@/components/Intro';
import ModelParentWrapper from '@/components/ModelParentWrapper';
import styles from "@/styles/page.module.scss";
import type { Metadata } from 'next';

interface HomeProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.homePage.metaTitle,
    description: dict.homePage.metaDescription,
  };
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.section}>
        <Intro 
          mainTitle={dict.homePage.introMainTitle}
          shortCast={dict.homePage.introShortCast}
        />
      </div>
      
      <ModelParentWrapper 
        title={dict.g63.title}
        annotations={dict.g63.annotations}
      />
    </div>
  );
}