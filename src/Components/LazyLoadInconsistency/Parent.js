import React, {Suspense, useEffect, useRef, useState} from 'react'

const LazyChild = React.lazy(() =>
  import('Components/LazyLoadInconsistency/LazyChild'),
)

class Api {
  constructor(onSearch) {
    this.onSearch = onSearch
  }

  onReady() {
    this.ready = true
    this.search()
  }

  search() {
    if (!this.ready) {
      return
    }
    this.onSearch()
  }
}

export default function Parent() {
  const [count, setCount] = useState(0)
  const apiRef = useRef(new Api(() => setCount(prevCount => prevCount + 1)))

  useEffect(() => {
    apiRef.current.onReady()
  }, [])

  return (
    <Suspense fallback={null}>
      <LazyChild apiRef={apiRef} />
      <span>Count is {count}</span>
    </Suspense>
  )
}
