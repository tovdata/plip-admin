import { decode } from 'jsonwebtoken';
import moment from 'moment';

/**
 * [Function] 액세스 토큰에서 사용자 추출
 * @param token 액세스 토큰
 * @returns 사용자 ID
 */
export const extractUserId = (token: string): string => {
  try {
    // JSON 변환
    const extracted = decode(token);
    // 사용자 ID 추출 및 반환
    return extracted !== null && extracted.sub ? extracted.sub as string : '';
  } catch (err) {
    console.error(`[UTIL ERROR] ${err}`);
    return '';
  }
}
/**
 * [Function] 날짜 변환
 * @param timestamp unix timestamp
 * @returns 변환된 날짜 (YYYY-MM-DD)
 */
export const transformToDate = (timestamp: number): string => {
  if (Math.floor(timestamp / 1000000000000) > 0) {
    return moment.unix(timestamp / 1000).format('YYYY-MM-DD');
  } else {
    return moment.unix(timestamp).format('YYYY-MM-DD');
  }
}
/**
 * [Function] 날짜 변환
 * @param timestamp unix timestamp
 * @returns 변환된 날짜 (YYYY-MM-DD HH:mm)
 */
export const transformToDatetime = (timestamp: number): string => {
  if (Math.floor(timestamp / 1000000000000) > 0) {
    return moment.unix(timestamp / 1000).format('YYYY-MM-DD HH:mm');
  } else {
    return moment.unix(timestamp).format('YYYY-MM-DD HH:mm');
  }
}
/**
 * [Function] 날짜 변환
 * @param timestamp unix timestamp
 * @returns 변환된 날짜 (YYYY-MM-DD)
 */
export const transformToMoment = (timestamp: number): any => {
  if (Math.floor(timestamp / 1000000000000) > 0) {
    return moment.unix(timestamp / 1000);
  } else {
    return moment.unix(timestamp);
  }
}
/**
 * [Function]
 * @param date 날짜 형식 문자열 (YYYY-MM-DD)
 * @returns unix timestamp
 */
export const transformToUnix = (date: string): number => {
  try {
    return moment(date, 'YYYY-MM-DD').unix();
  } catch (err) {
    console.error('[I_FUNC ERROR] 형식 변경 에러 (날짜형식이 맞지 않습니다.)');
    return 0;
  }
}