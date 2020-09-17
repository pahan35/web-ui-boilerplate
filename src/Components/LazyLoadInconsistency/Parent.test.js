import {render} from '@testing-library/react'
import Parent from 'Components/LazyLoadInconsistency/Parent'
import React from 'react'

test('single test 1', async () => {
  const {findByText} = render(<Parent />)
  expect(await findByText(/Count is 2/i)).toBeInTheDocument()
})

test('single test 2', async () => {
  const {findByText} = render(<Parent />)
  expect(await findByText(/Count is 2/i)).toBeInTheDocument()
})
