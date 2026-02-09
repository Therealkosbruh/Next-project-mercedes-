import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import PageContent from '@/components/PageContent';
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
    <PageContent 
      introMainTitle={dict.homePage.introMainTitle}
      introShortCast={dict.homePage.introShortCast}
      modelTitle={dict.g63.title}
      annotations={dict.g63.annotations}
    />
  );
}