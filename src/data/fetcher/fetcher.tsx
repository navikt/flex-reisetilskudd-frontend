import { logger } from '../../utils/logger'
import { redirectTilLoginHvis401 } from '../../utils/utils'
import safeStringify from 'fast-safe-stringify'

interface HttpResponse<T>
    extends Response {
    parsedBody?: T;
}

export class FetchError extends Error {
    status: number
    url: string
    json: any

    constructor(status: number, url: string, json: any, message?: string) {
        super(message)
        this.name = 'FetchError'
        this.status = status
        this.url = url
        this.json = json
    }

    toString(): string {
        return `{ status: ${this.status}, json: ${safeStringify(this.json)}, url: ${this.url} }`
    }
}

async function fetcher<T>(
    request: any,
): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request)
    try {
        response.parsedBody = await response.json()
    } catch (ex) {
        logger.error(ex)
    }
    if (!response.ok) {
        if (redirectTilLoginHvis401(response)) {
            return Promise.reject()
        } else {
            const ex = new FetchError(response.status, response.url, response.parsedBody)
            logger.warn('Backend svarte med noe annet enn 2xx:', ex.toString())
            throw ex
        }
    }
    return response
}

// eslint-disable-next-line func-names
export const get = async function <T>(
    path: string,
    args: any = { method: 'get', credentials: 'include' },
): Promise<HttpResponse<T>> {
    return fetcher<T>(new Request(path, args))
}

// eslint-disable-next-line func-names
export const post = async function <T>(
    path: string,
    // eslint-disable-next-line
    body?: any,
    args: any = {
        method: 'post', body: JSON.stringify(body), credentials: 'include', headers: { 'Content-Type': 'application/json' },
    },
): Promise<HttpResponse<T>> {
    return fetcher<T>(new Request(path, args))
}

// eslint-disable-next-line func-names
export const put = async function <T>(
    path: string,
    // eslint-disable-next-line
    body: any,
    args: any = {
        method: 'put', body: JSON.stringify(body), credentials: 'include', headers: { 'Content-Type': 'application/json' },
    },
): Promise<HttpResponse<T>> {
    return fetcher<T>(new Request(path, args))
}

// eslint-disable-next-line func-names
export const del = async function(
    path: string,
    // eslint-disable-next-line
    args: RequestInit = {
        method: 'delete', credentials: 'include', headers: { 'Content-Type': 'application/json' },
    },
): Promise<HttpResponse<string>> {
    return fetcher<string>(new Request(path, args))
}
