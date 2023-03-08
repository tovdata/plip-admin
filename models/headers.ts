// Data type
import { TableHeader } from "@/types";

export const TableHeaderForCompany: TableHeader[] = [
  { dataIndex: "name", key: "name", title: "회사명" },
  { category: "date", dataIndex: "created_at", key: "created_at", title: "생성 일자" },
  { dataIndex: "m_name", key: "m_name", title: "책임자명" },
  { dataIndex: "m_email", key: "m_email", title: "책임자이메일" }
];
export const TableHeaderForConsent: TableHeader[] = [
  { category: "consent-tag", dataIndex: "category", key: "category", title: "구분", width: 90 },
  { category: "link", dataIndex: "title", key: "title", title: "동의서명" },
  { category: "date", dataIndex: "published_at", key: "published_at", title: "생성 일자", width: 116 },
  { dataIndex: "published_by", key: "published_by", title: "작성자", width: 84 },
];
export const TableHeaderForIpp: TableHeader[] = [
  { dataIndex: "category", key: "category", title: "구분" },
  { category: "date", dataIndex: "enforced_at", key: "enforced_at", title: "시행 일자" },
  { dataIndex: "content", key: "content", title: "내용" },
  { category: "date", dataIndex: "created_at", key: "created_at", title: "편집 일시" },
];
export const TableHeaderForPipp: TableHeader[] = [
  { dataIndex: "index", key: "index", title: "버전" },
  { category: "date", dataIndex: "created_at", key: "created_at", title: "생성 일자" },
  { category: "date", dataIndex: "published_at", key: "published_at", title: "게재 일자" },
];