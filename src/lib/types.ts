export interface Post {
  id: string
  slug: string
  link: string
  title: string
  content: string
  excerpt: string
  date: string
  modified: string
  author: string
  language: string
  categories: string[]
  tags: string[]
  featuredImage: string
  seo: {
    title: string
    description: string
    focusKeyword: string
  }
}

export interface Category {
  id: string
  slug: string
  parent: string
  name: string
  description: string
}

export interface Author {
  id: string
  login: string
  email: string
  displayName: string
  firstName: string
  lastName: string
}
