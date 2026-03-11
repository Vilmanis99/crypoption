'use client'

import { useEffect, useRef } from 'react'

export default function EconomicCalendar() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const wrapper = document.createElement('div')
    wrapper.className = 'tradingview-widget-container'

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    wrapper.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      isTransparent: false,
      width: '100%',
      height: 600,
      locale: 'en',
      importanceFilter: '-1,0,1',
    })

    wrapper.appendChild(script)
    containerRef.current.innerHTML = ''
    containerRef.current.appendChild(wrapper)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: 600,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
      }}
    />
  )
}
