import { filstørrelseTilBytes } from '../components/filopplaster/utils';

class Environment {
  /* eslint-disable-next-line */
  private env = (window as any)._env_;

  get apiUrl() {
    return this.env.FLEX_REISETILSKUDD_BACKEND_PROXY_ROOT;
  }

  get mockApiUrl() {
    return this.env.MOCK_API_URL;
  }

  get isQ1() {
    return this.env.ENVIRONMENT === 'q1';
  }

  get isProd() {
    return this.env.ENVIRONMENT === 'prod';
  }

  get loginServiceUrl() {
    return this.env.LOGIN_SERVICE_URL;
  }

  get maksFilstørrelse() {
    return filstørrelseTilBytes(this.env.MAKS_FILSTORRELSE);
  }

  get tillatteFiltyper() {
    return this.env.TILLATTE_FILTYPER.split(',');
  }

  get bucketUrl() {
    return this.env.BUCKET_URL;
  }

  get mockBucketUrl() {
    return this.env.MOCK_BUCKET_URL;
  }

  get syfoRestSykmeldingerApiUrl() {
    return this.env.SYFOREST_SYKMELDINGER_API;
  }
}

const env = new Environment();

export default env;
