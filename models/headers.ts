// Data type
import { TableHeader } from "@/types";

// 회사 목록 테이블 헤더
export const TableHeaderForCompany: TableHeader[] = [
  { dataIndex: "name", key: "name", title: "회사명", width: "40%" },
  // { dataIndex: "N_of_services", key: "N_of_services", sort: true,  title: "서비스 수", width: "10%" },
  // { dataIndex: "N_of_users", key: "N_of_users", sort: true, title: "사용자 수", width: "10%" },
  { category: "date", dataIndex: "created_at", key: "created_at", sortDirections: ["ascend"], title: "생성 일자", width: "15%" },
  { dataIndex: "m_name", key: "m_name", title: "책임자명", width: "15%" },
  { dataIndex: "m_email", key: "m_email", title: "책임자이메일", width: "30%" }
];
// 동의서 문서 목록 테이블 헤더
export const TableHeaderForConsent: TableHeader[] = [
  { category: "consent-tag", dataIndex: "category", key: "category", title: "구분", width: 90 },
  { category: "link", dataIndex: "title", key: "title", title: "동의서명" },
  { category: "date", dataIndex: "published_at", key: "published_at", title: "생성 일자", width: 116 },
  { dataIndex: "published_by", key: "published_by", title: "작성자", width: 84 },
];
// 위탁 테이블 헤더
export const TableHeaderForCpi: TableHeader[] = [
  { dataIndex: "company", key: "company", title: "위탁받는 자(수탁자)" },
  { dataIndex: "task", key: "task", title: "위탁업무" },
];
// 국외 위탁 테이블 헤더
export const TableHeaderForCpiForeign: TableHeader[] = [
  { dataIndex: "company", key: "company", title: "업체명" },
  { dataIndex: "country", key: "country", title: "국가" },
  { dataIndex: "location", key: "location", title: "위치(주소)" },
  { dataIndex: "method", key: "method", title: "일시 및 방법" },
  { category: "item-split", dataIndex: "items", key: "items", title: "항목" },
  { dataIndex: "period", key: "period", title: "보유 및 이용기간" },
  { dataIndex: "charger", key: "charger", title: "관리책임자의 연락처" }
];
// 내부 관리계획 문서 목록 테이블 헤더
export const TableHeaderForIpp: TableHeader[] = [
  { dataIndex: "category", key: "category", title: "구분" },
  { category: "date", dataIndex: "enforced_at", key: "enforced_at", title: "시행 일자" },
  { dataIndex: "content", key: "content", title: "내용" },
  { category: "date", dataIndex: "created_at", key: "created_at", title: "편집 일시" },
];
// 링크 테이블 헤더
export const TableHeaderForLink: TableHeader[] = [
  { dataIndex: "description", key: "description", title: "설명" },
  { dataIndex: "url", key: "url", title: "URL" },
];
// 개인정보 처리방침 문서 목록 테이블 헤더
export const TableHeaderForPipp: TableHeader[] = [
  { dataIndex: "index", key: "index", title: "버전" },
  { category: "date", dataIndex: "created_at", key: "created_at", title: "생성 일자" },
  { category: "date", dataIndex: "published_at", key: "published_at", title: "게재 일자" },
];
// 수집 및 이용 테이블 헤더
export const TableHeaderForPi: TableHeader[] = [
  { dataIndex: "subject", key: "subject", title: "구분(업무명)" },
  { category: "list", dataIndex: "purpose", key: "purpose", title: "처리 목적" },
  { category: "item-split", dataIndex: "essentialItems", key: "essentialItems", title: "필수 항목" },
  { category: "item-split", dataIndex: "selectionItems", key: "selectionItems", title: "선택 항목" },
  { dataIndex: "period", key: "period", title: "보유 및 이용기간" }
];
// 제공 테이블 헤더
export const TableHeaderForPpi: TableHeader[] = [
  { dataIndex: "subject", key: "subject", title: "제공받는 자" },
  { dataIndex: "purpose", key: "purpose", title: "제공 목적" },
  { category: "item-split", dataIndex: "items", key: "items", title: "제공 항목" },
  { dataIndex: "period", key: "period", title: "보유 및 이용기간" }
];
// 국외 제공 테이블 헤더
export const TableHeaderForPpiForeign: TableHeader[] = [
  { dataIndex: "company", key: "company", title: "업체명" },
  { dataIndex: "country", key: "country", title: "국가" },
  { dataIndex: "location", key: "location", title: "위치(주소)" },
  { dataIndex: "method", key: "method", title: "일시 및 방법" },
  { category: "item-split", dataIndex: "items", key: "items", title: "항목" },
  { dataIndex: "period", key: "period", title: "보유 및 이용기간" },
  { dataIndex: "charger", key: "charger", title: "관리책임자의 연락처" }
];
// 서비스 목록 테이블 헤더
export const TableHeaderForService: TableHeader[] = [
  { dataIndex: "name", key: "name", title: "이름", width: "30%" },
  { dataIndex: "company_name", key: "company_name", title: "회사명", width: "30%" },
  { category: "date", dataIndex: "create_at", key: "create_at", sortDirections: ["ascend"], title: "생성 일자", width: "15%" },
  { dataIndex: "url", key: "url", title: "URL", width: "25%" }
];
// 사용자 목록 테이블 헤더
export const TableHeaderForUser: TableHeader[] = [
  { dataIndex: "name", key: "name", title: "이름", width: "12%" },
  { dataIndex: "email", key: "email", title: "이메일", width: "18%" },
  { dataIndex: "company_name", key: "company_name", title: "회사명", width: "14%" },
  { category: "date", dataIndex: "created_at", key: "created_at", sortDirections: ["ascend"], title: "가입 일자", width: "10%" },
  { category: "phone", dataIndex: "contact", key: "contact", title: "연락처", width: "12%" },
  { category: "check", dataIndex: "ssa1", key: "ssa1", title: "동의 여부", width: "8%" },
  { category: "datetime", dataIndex: "last_signin", key: "last_signin", sort: true, title: "최근 로그인 일시", width: "12%" },
  { dataIndex: "login_count", key: "login_count", sort: true, title: "로그인 횟수", width: "10%" }
];