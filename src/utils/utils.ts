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

export const nf_des = new Intl.NumberFormat('nb-NO', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    useGrouping: true
})
