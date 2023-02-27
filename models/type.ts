export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
/** API 응답 상태 */
export const RESPONSE_STATUS_OK = 'OK';
export const RESPONSE_STATUS_ERROR = 'ERROR';
export const RESPONSE_STATUS_NOT_FOUND = 'NOT_FOUND';
export const RESPONSE_STATUS_REQUEST_ERROR = 'REQUEST_ERROR';
export const RESPONSE_STATUS_UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const RESPONSE_STATUS_NOT_AUTHORIZED = 'NOT_AUTHORIZED';
export const RESPONSE_STATUS_TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const RESPONSE_STATUS_INVALID_TOKEN = 'INVALID_TOKEN';

export interface ResponseDF {
  result: boolean;
  data?: any;
}

export const KEY_COMPANY = 'plip-company';
export const KEY_COMPANIES = 'plip-companies';
export const KEY_DOCUMENTS = 'plip-documents';
export const KEY_MANAGER = 'plip-manager';
export const KEY_NEWS = 'plip-news';
export const KEY_SERVICE = 'plip-service';
export const KEY_SERVICES = 'plip-services';
export const KEY_TEMPLATE = 'plip-template';
export const KEY_USERS = 'plip-users';
// KEY
export const KEY_ACTICITIES = 'plip-activities';
export const KEY_PIS = 'plip-pis';
export const KEY_PPIS = 'plip-ppis'
export const KEY_CPIS = 'plip-cpis';
export const KEY_PIITEMS = 'plip-piitems';
export const KEY_CONSENTS = 'plip-consent';
export const KEY_PIPPS = 'plip-pipps'