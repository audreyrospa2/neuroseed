import type { Lang } from './utils';

export const locales = ['zh', 'en'] as const;
export const languageTag = { zh: 'zh-Hant', en: 'en' } as const;
export const sections = ['', 'about', 'service', 'impact', 'news', 'book-a-training'] as const;
export type Section = typeof sections[number];

export function sectionPath(lang: Lang, section: Section) {
  return section ? `/${lang}/${section}/` : `/${lang}/`;
}

const descriptions = {
  zh: {
    '': ['腦細話事｜香港校本教師培訓', 'NeuroSeed 腦力試推行「腦細話事」，透過香港校本教師培訓、互動桌遊與創傷知情照顧，支援教育工作者掌握日常教學策略。'],
    about: ['關於我們｜NeuroSeed 腦力試', '了解 NeuroSeed 腦力試與「腦細話事」的故事、團隊及合作伙伴，以及我們如何在香港推動校本教師培訓。'],
    service: ['服務｜教師培訓、互動桌遊及創傷知情照顧', '了解「腦細話事」校本教師培訓的互動桌遊、創傷知情照顧、安全圓圈框架及引導師培訓。'],
    impact: ['成效｜校本教師培訓的參與與回饋', '瀏覽「腦細話事」教師培訓的參與情況、實務回饋及成效資料。'],
    news: ['最新消息｜培訓、活動與媒體報道', '瀏覽 NeuroSeed 腦力試及「腦細話事」的最新活動、教師培訓消息及媒體報道。'],
    'book-a-training': ['預約培訓｜學校及教育機構', '聯絡 NeuroSeed 查詢香港校本教師培訓與「腦細話事」工作坊，了解預約方式及後續安排。'],
  },
  en: {
    '': ['Brainy In-Charge | Teacher Training in Hong Kong', 'NeuroSeed’s Brainy In-Charge programme supports Hong Kong educators through school-based training, interactive board games and trauma-informed care.'],
    about: ['About NeuroSeed and Brainy In-Charge', 'Meet the people and partners behind NeuroSeed and read the story of Brainy In-Charge, a school-based teacher training programme in Hong Kong.'],
    service: ['Services | Teacher Training and Trauma-Informed Care', 'Explore Brainy In-Charge workshops, interactive board games, the Circle of Security framework and facilitator training.'],
    impact: ['Impact | Teacher Training Participation and Feedback', 'Read about Brainy In-Charge training participation, practical feedback from educators and programme outcomes.'],
    news: ['News | Training, Events and Media Coverage', 'Find the latest NeuroSeed and Brainy In-Charge news, training events and media coverage.'],
    'book-a-training': ['Book Teacher Training for Your School', 'Contact NeuroSeed about school-based teacher training and Brainy In-Charge workshops for schools and education organisations in Hong Kong.'],
  },
} satisfies Record<Lang, Record<Section, [string, string]>>;

export function searchMetadata(lang: Lang, path: string) {
  const slug = path.split('/').filter(Boolean)[1] || '';
  if (!sections.includes(slug as Section)) return;
  const section = slug as Section;
  const [title, description] = descriptions[lang][section];
  return { section, title: `${title} | NeuroSeed`, description };
}
