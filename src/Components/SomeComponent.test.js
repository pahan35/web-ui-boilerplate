import React from 'react'
import {render} from '@testing-library/react'

import SomeComponent from 'Components/SomeComponent'

test('SomeComponent SSR', () => {
  const {getByText} = render(<SomeComponent />)
  expect(getByText('I am SomeComponent'))
  expect(false).toBeFalsy() // change actual to false here
})
