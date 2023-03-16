// Data type
import { SearchOption } from "@/types";
// Utilities
import { isEmptyString } from "@/utilities/common";
import dayjs from "dayjs";

/**
 * [Function] 데이터 검색 API 호출을 위한 쿼리 파라미터가 추가된 URL 생성
 * @param baseUrl 기본 URL
 * @param option 검색 옵션
 * @returns 생성된 API URL
 */
export function findApiUrl(baseUrl: string, option: SearchOption): string {
  try {
    // 검색 옵션 내 속성의 우선 순위 (keyword > period > size)
    // 키워드가 있을 경우
    if (!isEmptyString(option.keyword)) return `${baseUrl}?keyword=${encodeURIComponent(option.keyword as string)}`;
    // 기간이 설정된 경우
    else if (option.period) {
      // from과 to 모두 있는 경우
      if (option.period.from && option.period.to) return `${baseUrl}?from=${option.period.from}&to=${option.period.to}`;
      // to만 있는 경우
      else if (option.period.to) return `${baseUrl}?to=${option.period.to}`;
      // from만 있는 경우
      else if (option.period.from) return `${baseUrl}?from=${option.period.from}`;
      // 기간 속성 내 from, to가 모두 없을 경우, from은 현재 시간을 기준으로 한 달 이전 값
      else return `${baseUrl}?from=${dayjs(dayjs().subtract(1, "month").format("YYYY-MM-DD")).unix()}`;
    }
    // 사이즈가 설정된 경우
    else if (option.size) {
      // offset과 limit 모두 있는 경우
      if (option.size.offset && option.size.limit) return `${baseUrl}?offset=${option.size.offset}&limit=${option.size.limit}`;
      // offset만 있는 경우
      if (option.size.offset) return `${baseUrl}?offset=${option.size.offset}&limit=100`;
      // limit만 있는 겨우
      if (option.size) return `${baseUrl}?offset=0&limit=${option.size.limit}`;
      // 사이즈 속성 내 offset, limit이 모두 없을 경우, 100개만
      else return `${baseUrl}?offset=0&limit=100`;
    }
    // 옵션이 없는 경우 (예외)
    return `${baseUrl}?offset=0&limit=100`;
  } catch (err: any) {
    return `${baseUrl}?offset=0&limit=100`;
  }
}