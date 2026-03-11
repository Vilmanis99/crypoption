'use client'

import { useState } from 'react'

/* ─── shared input style ─── */
const inputStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '12px 16px',
  width: '100%',
  fontSize: 15,
  color: '#0f172a',
  outline: 'none',
  background: '#fff',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 6,
  fontSize: 13,
  fontWeight: 700,
  color: '#64748b',
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: 20,
  background: '#fff',
  padding: 0,
  overflow: 'hidden',
}

const cardHeaderStyle: React.CSSProperties = {
  padding: '24px 28px 20px',
  borderBottom: '1px solid #f1f5f9',
}

const cardBodyStyle: React.CSSProperties = {
  padding: '24px 28px 28px',
}

const btnStyle: React.CSSProperties = {
  background: '#1b59ff',
  color: '#fff',
  fontWeight: 700,
  borderRadius: 12,
  padding: '12px 24px',
  fontSize: 15,
  border: 'none',
  cursor: 'pointer',
  width: '100%',
}

const resultBoxStyle = (positive: boolean): React.CSSProperties => ({
  background: positive ? '#f0fdf4' : '#fef2f2',
  border: `1px solid ${positive ? '#bbf7d0' : '#fecaca'}`,
  borderRadius: 12,
  padding: '16px 20px',
})

/* ─── Stat row helper ─── */
function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ color: '#64748b', fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 15, color: color || '#0f172a' }}>{value}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   1. Binary Options Profit Calculator
   ══════════════════════════════════════════════════════════════════ */
export function ProfitCalculator() {
  const [investment, setInvestment] = useState('')
  const [payout, setPayout] = useState('')
  const [wins, setWins] = useState('')
  const [losses, setLosses] = useState('')
  const [result, setResult] = useState<{
    netProfit: number
    winRate: number
    totalInvested: number
    totalReturned: number
  } | null>(null)

  function calculate() {
    const inv = parseFloat(investment) || 0
    const pay = parseFloat(payout) || 0
    const w = parseInt(wins) || 0
    const l = parseInt(losses) || 0

    const totalTrades = w + l
    const totalInvested = inv * totalTrades
    const totalReturned = w * (inv + inv * (pay / 100))
    const netProfit = totalReturned - totalInvested
    const winRate = totalTrades > 0 ? (w / totalTrades) * 100 : 0

    setResult({ netProfit, winRate, totalInvested, totalReturned })
  }

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: '#eef4fe', color: '#1d4ed8' }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black" style={{ fontSize: 18, color: '#0f172a' }}>
              Binary Options Profit Calculator
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
              Calculate your net profit or loss across multiple trades
            </p>
          </div>
        </div>
      </div>

      <div style={cardBodyStyle}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label style={labelStyle}>Investment Amount ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 100"
              value={investment}
              onChange={e => setInvestment(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Payout Percentage (%)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 85"
              value={payout}
              onChange={e => setPayout(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Number of Winning Trades</label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 7"
              value={wins}
              onChange={e => setWins(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Number of Losing Trades</label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 3"
              value={losses}
              onChange={e => setLosses(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <button onClick={calculate} style={{ ...btnStyle, marginTop: 20 }}>
          Calculate Profit
        </button>

        {result && (
          <div className="mt-5 space-y-3">
            <div style={resultBoxStyle(result.netProfit >= 0)}>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Net Profit / Loss</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: result.netProfit >= 0 ? '#16a34a' : '#dc2626' }}>
                {result.netProfit >= 0 ? '+' : ''}${result.netProfit.toFixed(2)}
              </p>
            </div>
            <StatRow label="Win Rate" value={`${result.winRate.toFixed(1)}%`} color={result.winRate >= 50 ? '#16a34a' : '#dc2626'} />
            <StatRow label="Total Invested" value={`$${result.totalInvested.toFixed(2)}`} />
            <StatRow label="Total Returned" value={`$${result.totalReturned.toFixed(2)}`} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   2. Position Size / Risk Calculator
   ══════════════════════════════════════════════════════════════════ */
export function RiskCalculator() {
  const [balance, setBalance] = useState('')
  const [riskPct, setRiskPct] = useState('')
  const [tradePayout, setTradePayout] = useState('')
  const [result, setResult] = useState<{
    tradeAmount: number
    maxLoss: number
    potentialProfit: number
    breakEvenWinRate: number
  } | null>(null)

  function calculate() {
    const bal = parseFloat(balance) || 0
    const risk = parseFloat(riskPct) || 0
    const pay = parseFloat(tradePayout) || 0

    const tradeAmount = bal * (risk / 100)
    const maxLoss = tradeAmount
    const potentialProfit = tradeAmount * (pay / 100)
    // Break-even: wins * profit = losses * loss  =>  W/(W+L) = 1 / (1 + payout/100)
    const breakEvenWinRate = pay > 0 ? (1 / (1 + pay / 100)) * 100 : 0

    setResult({ tradeAmount, maxLoss, potentialProfit, breakEvenWinRate })
  }

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: '#f0fdf4', color: '#16a34a' }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black" style={{ fontSize: 18, color: '#0f172a' }}>
              Position Size / Risk Calculator
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
              Find the optimal trade size based on your risk tolerance
            </p>
          </div>
        </div>
      </div>

      <div style={cardBodyStyle}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label style={labelStyle}>Account Balance ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 1000"
              value={balance}
              onChange={e => setBalance(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Risk per Trade (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="any"
              placeholder="e.g. 2"
              value={riskPct}
              onChange={e => setRiskPct(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Trade Payout (%)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 85"
              value={tradePayout}
              onChange={e => setTradePayout(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <button onClick={calculate} style={{ ...btnStyle, marginTop: 20 }}>
          Calculate Risk
        </button>

        {result && (
          <div className="mt-5 space-y-3">
            <div style={{ ...resultBoxStyle(true), background: '#eef4fe', borderColor: '#bfdbfe' }}>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Recommended Trade Amount</p>
              <p style={{ fontSize: 28, fontWeight: 900, color: '#1b59ff' }}>
                ${result.tradeAmount.toFixed(2)}
              </p>
            </div>
            <StatRow label="Maximum Loss" value={`$${result.maxLoss.toFixed(2)}`} color="#dc2626" />
            <StatRow label="Potential Profit" value={`$${result.potentialProfit.toFixed(2)}`} color="#16a34a" />
            <StatRow label="Break-even Win Rate" value={`${result.breakEvenWinRate.toFixed(1)}%`} color="#0f172a" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   3. Martingale Calculator
   ══════════════════════════════════════════════════════════════════ */
export function MartingaleCalculator() {
  const [initialAmount, setInitialAmount] = useState('')
  const [payout, setPayout] = useState('')
  const [steps, setSteps] = useState('')
  const [result, setResult] = useState<
    { step: number; tradeAmount: number; cumulativeLoss: number; profitIfWin: number }[]
  >([])

  function calculate() {
    const init = parseFloat(initialAmount) || 0
    const pay = parseFloat(payout) || 0
    const n = Math.min(parseInt(steps) || 0, 20) // cap at 20

    if (init <= 0 || pay <= 0 || n <= 0) return

    const rows: typeof result = []
    let cumulativeLoss = 0

    for (let i = 1; i <= n; i++) {
      // Each step: need to recover cumulative loss + make initial profit
      // tradeAmount * (payout/100) >= cumulativeLoss + init * (payout/100)
      // For classic martingale: next trade = (cumulativeLoss + desired_profit) / (payout/100)
      const desiredProfit = init * (pay / 100)
      const tradeAmount = i === 1 ? init : (cumulativeLoss + desiredProfit) / (pay / 100)
      const profitIfWin = tradeAmount * (pay / 100) - cumulativeLoss

      rows.push({
        step: i,
        tradeAmount: Math.round(tradeAmount * 100) / 100,
        cumulativeLoss: Math.round(cumulativeLoss * 100) / 100,
        profitIfWin: Math.round(profitIfWin * 100) / 100,
      })

      cumulativeLoss += tradeAmount
    }

    setResult(rows)
  }

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: '#fef3c7', color: '#b45309' }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black" style={{ fontSize: 18, color: '#0f172a' }}>
              Martingale Calculator
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
              Simulate consecutive losses and see the required trade sizes
            </p>
          </div>
        </div>
      </div>

      <div style={cardBodyStyle}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label style={labelStyle}>Initial Trade Amount ($)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 10"
              value={initialAmount}
              onChange={e => setInitialAmount(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Payout Percentage (%)</label>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="e.g. 85"
              value={payout}
              onChange={e => setPayout(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Consecutive Losses</label>
            <input
              type="number"
              min="1"
              max="20"
              step="1"
              placeholder="e.g. 5"
              value={steps}
              onChange={e => setSteps(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <button onClick={calculate} style={{ ...btnStyle, marginTop: 20 }}>
          Simulate Martingale
        </button>

        {result.length > 0 && (
          <div className="mt-5 overflow-x-auto" style={{ borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <table className="w-full text-sm" style={{ minWidth: 480 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th className="px-4 py-3 text-left font-bold" style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trade #</th>
                  <th className="px-4 py-3 text-right font-bold" style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trade Amount</th>
                  <th className="px-4 py-3 text-right font-bold" style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cumulative Loss</th>
                  <th className="px-4 py-3 text-right font-bold" style={{ color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profit if Win</th>
                </tr>
              </thead>
              <tbody>
                {result.map((row, i) => (
                  <tr
                    key={row.step}
                    style={{
                      borderTop: '1px solid #f1f5f9',
                      background: i % 2 === 0 ? '#fff' : '#fafbfc',
                    }}
                  >
                    <td className="px-4 py-3 font-bold" style={{ color: '#0f172a' }}>#{row.step}</td>
                    <td className="px-4 py-3 text-right font-bold" style={{ color: row.tradeAmount > 1000 ? '#dc2626' : '#0f172a' }}>
                      ${row.tradeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right" style={{ color: '#dc2626', fontWeight: 600 }}>
                      ${row.cumulativeLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3 text-right" style={{ color: '#16a34a', fontWeight: 700 }}>
                      +${row.profitIfWin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.length > 0 && (
              <div className="px-4 py-3" style={{ background: '#fef2f2', borderTop: '1px solid #fecaca' }}>
                <p className="text-xs font-semibold" style={{ color: '#dc2626' }}>
                  Total capital required after {result.length} losses: $
                  {(result[result.length - 1].cumulativeLoss + result[result.length - 1].tradeAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
