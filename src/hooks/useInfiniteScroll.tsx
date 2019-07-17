import { useEffect } from 'react'

const useInfiniteScroll = (enabled: boolean, handleReachBottom: () => void) => {
  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        handleReachBottom()
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [enabled, handleReachBottom])
}

export default useInfiniteScroll
