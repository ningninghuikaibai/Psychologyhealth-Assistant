import request from "./request";

/** 文章状态：1 发布 2 下线 */
export type ArticleStatus = 1 | 2;

export interface Article {
  id: string;
  title: string;
  categoryId: number;
  categoryName: string;
  authorName: string;
  readCount: number;
  publishedAt: string;
  status: ArticleStatus;
  statusText?: string;
  summary?: string;
  content?: string;
  coverImage?: string;
  tags?: string;
}

export interface ArticlePageParams {
  title?: string;
  categoryId?: string;
  status?: string;
  authorName?: string;
  currentPage: number;
  size: number;
}

export interface PageResult<T> {
  list?: T[];
  records?: T[];
  total: number;
  current?: number;
  pages?: number;
  size?: number;
}

/** 分页查询知识文章列表 */
export function getArticlePage(params: ArticlePageParams) {
  return request.get<never, PageResult<Article>>("/knowledge/article/page", { params });
}

/** 更新文章状态（1 发布 2 下线） */
export function updateArticleStatus(id: string, status: ArticleStatus) {
  return request.put(`/knowledge/article/${id}/status`, { status });
}

/** 获取知识文章详情 */
export function getArticleDetail(id: string) {
  return request.get<never, Article>(`/knowledge/article/${id}`);
}

/** 更新知识文章 */
export function updateArticle(id: string, data: Partial<Article>) {
  return request.put(`/knowledge/article/${id}`, { ...data, id });
}

/** 删除知识文章 */
export function deleteArticle(id: string) {
  return request.delete(`/knowledge/article/${id}`);
}
