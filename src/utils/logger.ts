import safeStringify from 'fast-safe-stringify'
import env from './environment'

const frontendlogger = (env.isProd || env.isQ1)
    ? (window as any).frontendlogger
    : console

// Grafana - Metrikk
export const event = (arg: Record<string, unknown>): void => {
    frontendlogger.event(arg)
}

const msgToString = (msg: string, arg?: any): string => {
    if (arg) {
        if (arg.stack) {
            return `${msg} - ${safeStringify(arg.stack)}`
        }
        return `${msg} - ${safeStringify(arg)}`
    }
    return msg
}

// Kibana - Warning
export const warn = (msg: string, arg?: any): void => {
    frontendlogger.warn(msgToString(msg, arg))
}

// Kibana - Info
export const info = (msg: string, arg?: any): void => {
    frontendlogger.info(msgToString(msg, arg))
}

// Kibana - Error
export const error = (msg: string, arg?: any): void => {
    frontendlogger.error(msgToString(msg, arg))
}

export const logger = { event, error, warn, info }
