export const PUBLIC_API_PREFIX = process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX || 'http://localhost:8000/skills'

const EDITION = process.env.NEXT_PUBLIC_EDITION || 'SELF_HOSTED'

export const IS_CE_EDITION = EDITION === 'SELF_HOSTED'
export const IS_CLOUD_EDITION = EDITION === 'CLOUD'

export const SUPPORT_MAIL_LOGIN = !!(process.env.NEXT_PUBLIC_SUPPORT_MAIL_LOGIN || globalThis.document?.body?.getAttribute('data-public-support-mail-login'))