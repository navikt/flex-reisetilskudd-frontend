import { filstørrelseTilBytes } from './fil-utils'

class Environment {

    private env = (window as any)._env_;


    get isMockBackend() {
        return this.env.MOCK_BACKEND === 'true'
    }

    get isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    get isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    get isProd() {
        return this.env.ENVIRONMENT === 'prod'
    }

    get loginServiceUrl() {
        return this.env.LOGINSERVICE_URL
    }

    get loginServiceRedirectUrl() {
        return this.env.LOGINSERVICE_REDIRECT_URL
    }

    get maksFilstørrelse() {
        return filstørrelseTilBytes(this.env.MAKS_FILSTORRELSE)
    }

    get tillatteFiltyper() {
        return this.env.TILLATTE_FILTYPER.split(',')
    }

    get formaterteFiltyper() {
        return this.env.FORMATERTE_FILTYPER
    }

    get flexGatewayRoot() {
        return this.env.FLEX_GATEWAY_ROOT
    }

    get baseName() {
        return this.env.BASE_NAME
    }

    get sykmeldingerBackendProxyRoot() {
        return this.env.SYKMELDINGER_BACKEND_PROXY_ROOT
    }

    get sykefravaerUrl() {
        return this.env.SYKEFRAVAER_URL
    }

    get dittNavUrl() {
        return this.env.DITTNAV_URL
    }

    get frontendloggerRoot() {
        return this.env.FRONTENDLOGGER_ROOT
    }
}

const env = new Environment()

export default env
