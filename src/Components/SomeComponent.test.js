import {render} from '@testing-library/react'
import SomeComponent from 'Components/SomeComponent'
import React from 'react'

test('SomeComponent SSR', () => {
  const {getByText} = render(<SomeComponent />)
  expect(getByText('I am SomeComponent 35')).toBeInTheDocument()
  expect(false).toBeFalsy() // change actual to false here
})
