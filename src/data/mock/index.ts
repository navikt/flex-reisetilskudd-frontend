import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import mockKvitteringer from './data/kvitteringer'
import reisetilskudd from './data/reisetilskudd'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

mock.get(`${env.apiUrl}/api/v1/kvitteringer`,
    (req, res, ctx) => res(ctx.json(mockKvitteringer)))

mock.get(`${env.apiUrl}/api/v1/reisetilskudd`,
    (req, res, ctx) => res(ctx.json(reisetilskudd)))
