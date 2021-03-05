import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { generateId } from '../../utils/random'
import { sykmeldinger } from './data/sykmeldinger'
import { reisetilskuddene } from './data/reisetilskudd'
import { RSSvar } from '../../types/rs-types/rs-svar'
import { kvitteringTaxi } from './data/kvitteringer'

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

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/sporsmal/:spmid/svar`,
    (req, res , ctx) => {
        const r = reisetilskuddene.find((r) => r.id === req.pathParams.id)
        const spm = r!.sporsmal.find((spm) => spm.id === req.pathParams.spmid)
        spm!.svar = [ {
            kvittering: kvitteringTaxi
        } as RSSvar ]
        return res(ctx.json(spm))
    }
)

mock.delete(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/sporsmal/:spmid/svar/:svarid`, () => Promise.resolve({ status: 204 }))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/send`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/avbryt`, () => Promise.resolve({ status: 200 }))

mock.post(`${env.flexGatewayRoot}/flex-reisetilskudd-backend/api/v1/reisetilskudd/:id/gjenapne`, () => Promise.resolve({ status: 200 }))

mock.get(`${env.flexGatewayRoot}/flex-bucket-uploader/kvittering/:blob`, () => Promise.resolve({ status: 200 }))
