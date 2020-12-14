import dev from './dev'
import test from './test'
import prod from './prod'

const ENV:string = '<ENV::env>';

const config = ENV==='dev'? dev:(ENV==='test'?test:prod)

export default config