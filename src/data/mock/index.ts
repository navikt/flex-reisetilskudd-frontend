import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { generateId } from '../../utils/random'
import reisetilskudd from './data/reisetilskudd'
import { sykmeldinger } from './data/sykmeldinger'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

mock.get(`${env.sykmeldingerBackendProxyRoot}/api/v1/syforest/sykmeldinger`,
    (req, res, ctx) => res(ctx.json(sykmeldinger)))

mock.get(`${env.backendUrl}/api/v1/reisetilskudd`,
    (req, res, ctx) => res(ctx.json(reisetilskudd)))

mock.put(`${env.backendUrl}/api/v1/reisetilskudd/:id`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.mockBucketUrl}/kvittering`,
    (req, res, ctx) =>
        res(ctx.json({
            id: generateId(),
            melding: 'opprettet'
        })))

mock.post(`${env.backendUrl}/api/v1/reisetilskudd/:id/kvittering`, () => Promise.resolve({ status: 200 }))

mock.delete(`${env.backendUrl}/api/v1/reisetilskudd/:id/kvittering/:kvitteringId`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.backendUrl}/api/v1/reisetilskudd/:id/send`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.backendUrl}/api/v1/reisetilskudd/:id/avbryt`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.backendUrl}/api/v1/reisetilskudd/:id/gjenapne`, () => Promise.resolve({ status: 200 }))
