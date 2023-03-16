// 그룹 아이템
export interface GroupItem {
  label: React.ReactNode;
  value: any
}
// 데이터 유형
export type PIM_TYPE = "cfni" | "cpi" | "dpi" | "fni" | "pfni" | "pi" | "ppi";
// 데이터 유형 (값)
export const PIM_CFNI: PIM_TYPE = "cfni";
export const PIM_CPI: PIM_TYPE = "cpi";
export const PIM_DPI: PIM_TYPE = "dpi";
export const PIM_FNI: PIM_TYPE = "fni";
export const PIM_PFNI: PIM_TYPE = "pfni";
export const PIM_PI: PIM_TYPE = "pi";
export const PIM_PPI: PIM_TYPE = "ppi";
// 검색 유형
export type SEARCH_TYPE = "company" | "service" | "user";
// 검색 옵션
export interface SearchOption {
  keyword?: string;
  period?: {
    from?: number;
    to?: number;
  };
  size?: {
    offset?: number;
    limit?: number;
  }
}
// 검색 옵션 속성
export type SearchOptionProps = "keyword" | "period" | "size";
// 테이블 헤더
export interface TableHeader {
  category?: string
  className?: string
  dataIndex: string
  key: string
  sort?: boolean,
  sortDirections?: string[],
  title?: React.ReactNode
  width?: string | number
}