export type BlogSeoPost = {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  headline: string;
  intro: string;
  sections: { heading: string; text: string }[];
  links: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
};

import postsData from './blogSeoPosts.json';

export const blogSeoPosts = postsData as BlogSeoPost[];
export const blogSeoMap = Object.fromEntries(blogSeoPosts.map((post) => [post.slug, post]));

export function getBlogSeoPost(slug: string) {
  return blogSeoMap[slug];
}
