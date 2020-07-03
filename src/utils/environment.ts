class Environment {
  /* eslint-disable-next-line */
  private env = (window as any)._env_;

  get reisepengerUrl() {
      return this.env.REISEPENGER_URL
  }
  get apiUrl() {
      return this.env.API_URL
  }

}

const env = new Environment();

export default env;
