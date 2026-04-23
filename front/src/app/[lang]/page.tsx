import { preload } from "react-dom";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import PageContent from "@/components/PageContent";
import type { Metadata } from "next";

const GLB_PATH = "/models/g63/source/g-wagon.glb";
const LOGO_PATH = "/images/icons/mercedes-benz-logo.svg";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.homePage.metaTitle,
    description: dict.homePage.metaDescription,
  };
}

export default async function Home({ params }: HomeProps) {
  preload(GLB_PATH, { as: "fetch", crossOrigin: "anonymous" });
  preload(LOGO_PATH, { as: "image" });

  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <PageContent
      introMainTitle={dict.homePage.introMainTitle}
      introShortCast={dict.homePage.introShortCast}
      modelTitle={dict.g63.title}
      modelHeroTitle={dict.g63.heroTitle}
      modelDescription={dict.g63.description}
      moreModels={dict.g63.moreModels}
      annotations={dict.g63.annotations}
      advantages={dict.advantages.items}
      advantagesLearnMore={dict.advantages.learnMore}
      faqTitle={dict.faq.title}
      faqItems={dict.faq.items}
    />
  );
}
