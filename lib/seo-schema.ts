export type FAQItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type ItemListEntry = {
  name: string;
  url: string;
  description?: string;
};

export function createFaqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function createWebPageSchema({
  name,
  description,
  url,
  inLanguage,
  dateModified,
  datePublished,
}: {
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  dateModified?: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage,
    ...(dateModified ? { dateModified } : {}),
    ...(datePublished ? { datePublished } : {}),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createItemListSchema({
  name,
  url,
  inLanguage,
  items,
}: {
  name: string;
  url: string;
  inLanguage: string;
  items: ItemListEntry[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url,
    inLanguage,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
