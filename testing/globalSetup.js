import {setup as setupPuppeteer} from 'jest-environment-puppeteer'
import {sep} from 'path'

export default async function globalSetup(jestConfig) {
  process.env.TZ = 'UTC'
  process.env.JEST_PUPPETEER_CONFIG = `${__dirname}${sep}puppeteerConfig.js`

  if (process.env.INTEGRATION === '1') {
    await setupPuppeteer(jestConfig)
  }
}
