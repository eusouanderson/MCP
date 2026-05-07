type DsComponentCategory = 'form' | 'navigation' | 'layout' | 'feedback' | 'data' | 'icon';

type DsComponentRef = {
  componentName: string;
  tagName: string;
  description: string;
  props: string;
  category: DsComponentCategory;
  endpoint: string;
};

export type { DsComponentCategory, DsComponentRef };
