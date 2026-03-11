'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LangSetter() {
  const pathname = usePathname()
  useEffect(() => {
    document.documentElement.lang = pathname.startsWith('/ru') ? 'ru' : 'en'
  }, [pathname])
  return null
}
