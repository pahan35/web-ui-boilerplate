import domMatchers from '@testing-library/jest-dom'

// https://jestjs.io/docs/en/configuration#setupfilesafterenv-array

// default timeout set by jest is 5s which is way too low for puppeteer
jest.setTimeout(60000)

if (typeof global.expect !== 'undefined') {
  global.expect.extend({
    ...domMatchers,
  })
}

// Prevent failures on call to fetch
global.fetch = () => {}
