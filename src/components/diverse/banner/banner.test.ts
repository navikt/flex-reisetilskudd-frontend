import 'dayjs/locale/nb'

import { tekst } from '../../../utils/tekster'

it('Returns text from bundle', () => {
    const text = tekst('banner.sidetittel')
    expect(text).toEqual('Søknad om reisetilskudd')
})
