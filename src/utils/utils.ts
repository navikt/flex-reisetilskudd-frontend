import env from './environment'
import { logger } from './logger'

export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}

export const redirectTilLoginHvis401 = (res: Response) => {
    if (res.status === 401) {
        logger.warn('Redirecter til login grunnet 401')
        window.location.href = hentLoginUrl()
        return true
    }
    return false
}


export const setBodyClass = (name: string) => {
    if (document.body.className !== '') {
        document.body.classList.remove(document.body.className)
    }
    document.body.classList.add(name)
}

export const formatterTall = (tall?: number, desimaler = 0): string => {
    if (tall) {
        const nf_des = new Intl.NumberFormat('nb-NO', {
            maximumFractionDigits: desimaler,
            minimumFractionDigits: desimaler,
            useGrouping: true
        })
        return nf_des.format(tall)
    } else {
        return ''
    }
}
