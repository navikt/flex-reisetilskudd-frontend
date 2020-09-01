import { logger } from '../../utils/logger';

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function fetcher<T>(
  request: RequestInfo,
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    response.parsedBody = await response.json();
  } catch (ex) { logger.error(ex); }
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

// eslint-disable-next-line func-names
export const get = async function<T>(
  path: string,
  args: RequestInit = { method: 'get', credentials: 'include' },
): Promise<HttpResponse<T>> {
  return fetcher<T>(new Request(path, args));
};

// eslint-disable-next-line func-names
export const post = async function<T>(
  path: string,
  // eslint-disable-next-line
  body: any,
  args: RequestInit = {
    method: 'post', body: JSON.stringify(body), credentials: 'include', headers: { 'Content-Type': 'application/json' },
  },
): Promise<HttpResponse<T>> {
  return fetcher<T>(new Request(path, args));
};

// eslint-disable-next-line func-names
export const put = async function<T>(
  path: string,
  // eslint-disable-next-line
  body: any,
  args: RequestInit = {
    method: 'put', body: JSON.stringify(body), credentials: 'include', headers: { 'Content-Type': 'application/json' },
  },
): Promise<HttpResponse<T>> {
  return fetcher<T>(new Request(path, args));
};

// eslint-disable-next-line func-names
export const del = async function<T>(
  path: string,
  // eslint-disable-next-line
  args: RequestInit = {
    method: 'delete', credentials: 'include', headers: { 'Content-Type': 'application/json' },
  },
): Promise<HttpResponse<T>> {
  return fetcher<T>(new Request(path, args));
};
