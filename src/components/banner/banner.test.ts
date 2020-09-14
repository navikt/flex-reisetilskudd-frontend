import 'dayjs/locale/nb'

import { tekst } from '../../utils/tekster'

it('Returns text from bundle', () => {
    const text = tekst('spvedtak.sidetittel')
    expect(text).toEqual('Behandlede søknader')
})
