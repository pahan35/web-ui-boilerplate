import React, {useEffect} from 'react'

export default function LazyChild({apiRef}) {
  useEffect(() => {
    apiRef.current.search()
  }, [apiRef])
  return <div>I&apos;m lazy</div>
}
