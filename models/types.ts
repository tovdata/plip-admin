export type PIM_TYPE = "cfni" | "cpi" | "dpi" | "fni" | "pfni" | "pi" | "ppi";
// 데이터 유형
export const PIM_CFNI: PIM_TYPE = "cfni";
export const PIM_CPI: PIM_TYPE = "cpi";
export const PIM_DPI: PIM_TYPE = "dpi";
export const PIM_FNI: PIM_TYPE = "fni";
export const PIM_PFNI: PIM_TYPE = "pfni";
export const PIM_PI: PIM_TYPE = "pi";
export const PIM_PPI: PIM_TYPE = "ppi";
// 테이블 헤더
export interface TableHeader {
  category?: string
  className?: string
  dataIndex: string
  key: string
  title: React.ReactNode
  width?: string | number
}