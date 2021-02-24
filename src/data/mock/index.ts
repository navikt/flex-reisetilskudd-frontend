import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { generateId } from '../../utils/random'
import { sykmeldinger } from './data/sykmeldinger'
import { reisetilskuddene } from './data/reisetilskudd'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

mock.get(`${env.sykmeldingerBackendProxyRoot}/api/v1/sykmeldinger`,
    (req, res, ctx) => res(ctx.json(sykmeldinger)))

mock.get(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd`,
    (req, res, ctx) => res(ctx.json(reisetilskuddene)))

mock.put(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:reisetilskudd/sporsmal/:spm`,
    (req) => Promise.resolve({
        status: 200,
        body: JSON.stringify({ oppdatertSporsmal: req.body })
    })
)

mock.post(`${env.flexGatewayRoot}/flex-bucket-uploader/opplasting`,
    (req, res, ctx) =>
        res(ctx.json({
            id: generateId(),
            melding: 'opprettet'
        })))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/kvittering`, () => Promise.resolve({ status: 200 }))

mock.delete(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/kvittering/:kvitteringId`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/send`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/avbryt`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/gjenapne`, () => Promise.resolve({ status: 200 }))
