class Environment {
  /* eslint-disable-next-line */
  private env = (window as any)._env_;

  get reisepengerUrl() {
    return this.env.REISEPENGER_URL;
  }

  get apiUrl() {
    return this.env.API_URL;
  }

  get isQ1() {
    return this.env.IS_Q1 === 'TRUE';
  }

  get isProd() {
    return this.env.IS_PROD === 'TRUE';
  }
}

const env = new Environment();

export default env;
