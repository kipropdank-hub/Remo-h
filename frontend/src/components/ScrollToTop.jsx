import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp, PhoneCall } from 'lucide-react'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const [showTopBtn, setShowTopBtn] = useState(false)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  // Track scroll position for floating action buttons
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Mobile Emergency Quick Call Floating Button */}
      <a
        href="tel:+15551234567"
        className="md:hidden flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-full shadow-lg transition-all duration-200 active:scale-95"
        aria-label="Call emergency hotline"
      >
        <PhoneCall className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wider">Emergency</span>
      </a>

      {/* Back to top button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          aria-label="Scroll to top of page"
          title="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default ScrollToTop
