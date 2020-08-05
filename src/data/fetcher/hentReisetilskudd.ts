import { get } from './fetcher';
import { ReisetilskuddInterface } from '../../models/reisetilskudd';
import env from '../../utils/environment';
import { logger } from '../../utils/logger';

const hentReisetilskudd = (callback : (reisetilskudd? : ReisetilskuddInterface[]) => void)
: void => {
  get<ReisetilskuddInterface[]>(`${env.apiUrl}/reisetilskudd`)
    .then((req) => callback(req.parsedBody))
    .catch((err) => logger.error(err));
};

export default hentReisetilskudd;
