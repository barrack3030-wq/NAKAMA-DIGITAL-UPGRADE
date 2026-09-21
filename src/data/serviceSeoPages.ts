import serviceConfig from './serviceSeoPages.json';

export type ServiceSeoPage = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  seoCoverage: string;
  audience: string[];
  benefits: string[];
  sections: { heading: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const serviceSeoPages = serviceConfig as ServiceSeoPage[];

export const serviceSeoMap: Record<string, ServiceSeoPage> = Object.fromEntries(
  serviceSeoPages.map((service) => [service.slug, service]),
);

export const getServiceSeoPage = (slug: string) =>
  serviceSeoMap[slug.toLowerCase()];
