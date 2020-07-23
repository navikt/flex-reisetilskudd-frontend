import { filstørrelseTilBytes } from '../components/filopplaster/utils';

class Environment {
  /* eslint-disable-next-line */
  private env = (window as any)._env_;

  get reisepengerUrl() {
    return this.env.REISEPENGER_URL;
  }

  get apiUrl() {
    return this.env.API_URL;
  }

  get mockApiUrl() {
    return this.env.MOCK_API_URL;
  }

  get isQ1() {
    return this.env.IS_Q1 === 'TRUE';
  }

  get isProd() {
    return this.env.IS_PROD === 'TRUE';
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
}

const env = new Environment();

export default env;
