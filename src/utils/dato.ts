import moment from 'moment';
import 'moment/locale/nb';

moment.locale('nb');

export enum DatoFormat {
  TALL= 'DD.MM.YYYY',
  NATURLIG_KORT = 'Do MMMM',
  NATURLIG_LANG = 'Do MMMM YYYY',
  NATURLIG_FULL = 'dddd Do MMMM YYYY',
}

export enum TidsFormat {
  VANLIG = 'HH:mm',
  TIMER = 'HH',
  MINUTTER = 'mm'
}

export const getIDag = (format?: string) : string => moment().format(format || DatoFormat.TALL);

export const getNåTid = (format?: string) : string => moment().format(format || TidsFormat.VANLIG);
