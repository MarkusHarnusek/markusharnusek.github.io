export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
};

export const posts: Post[] = [];
