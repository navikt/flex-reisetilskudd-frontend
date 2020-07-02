class Environment {
    // eslint-disable-next-line no-underscore-dangle
    private env = (window as any)._env_;

    get reisepengerUrl() {
        return this.env.REISEPENGER_URL;
    }
}

const env = new Environment();

export default env
