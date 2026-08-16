import { useMemo, useState } from 'react'

const COLORS = [
  '#9eff28','#24d1ff','#ffb020','#ff5f75',
  '#a978ff','#35e0a1','#ff7a2f','#4d8dff'
]

export default function RoulettePlay({ players, mode, onBack }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState('')

  const wheel = useMemo(() => {
    const part = 360 / players.length

    return `conic-gradient(${players.map((_, i) =>
      `${COLORS[i % COLORS.length]} ${i * part}deg ${(i + 1) * part}deg`
    ).join(',')})`
  }, [players])

  function spin() {
    if (spinning) return

    setSpinning(true)
    setWinner('')

    const selected = Math.floor(Math.random() * players.length)
    const part = 360 / players.length
    const center = selected * part + part / 2
    const extra = 360 * 7
    const next = rotation + extra + (360 - center)

    setRotation(next)

    setTimeout(() => {
      setWinner(players[selected])
      setSpinning(false)
    }, 4000)
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'#050705',
      color:'#fff',
      padding:'25px',
      direction:'rtl'
    }}>

      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        maxWidth:'1200px',
        margin:'0 auto 30px'
      }}>

        <button onClick={onBack}>
          رجوع للتجهيز
        </button>

        <h2>الروليت</h2>

        <b>{mode === 'teams' ? 'فرق' : 'عادي'}</b>
      </div>

      <div style={{
        maxWidth:'1100px',
        margin:'auto',
        display:'grid',
        gridTemplateColumns:'280px 1fr',
        gap:'50px',
        alignItems:'center'
      }}>

        <aside>
          <h3>اللاعبون</h3>

          {players.map((player, i) => (
            <div
              key={i}
              style={{
                display:'flex',
                gap:'10px',
                alignItems:'center',
                marginBottom:'8px',
                padding:'10px',
                border:'1px solid #263026',
                borderRadius:'10px'
              }}
            >
              <span style={{
                width:'24px',
                height:'24px',
                borderRadius:'7px',
                background:COLORS[i % COLORS.length],
                color:'#050705',
                display:'grid',
                placeItems:'center',
                fontWeight:'bold'
              }}>
                {i + 1}
              </span>

              <b>{player}</b>
            </div>
          ))}
        </aside>

        <main style={{textAlign:'center'}}>

          <div style={{
            position:'relative',
            width:'420px',
            height:'450px',
            margin:'auto'
          }}>

            <div style={{
              position:'absolute',
              top:'0',
              left:'50%',
              transform:'translateX(-50%)',
              fontSize:'35px',
              color:'#fff',
              zIndex:5
            }}>
              ▼
            </div>

            <div style={{
              position:'absolute',
              top:'30px',
              left:'0',
              width:'420px',
              height:'420px',
              borderRadius:'50%',
              background:wheel,
              border:'8px solid #111811',
              boxShadow:'0 0 60px rgba(158,255,40,.12)',
              transition:'transform 4s cubic-bezier(.12,.65,.12,1)',
              transform:`rotate(${rotation}deg)`
            }}>

              <div style={{
                position:'absolute',
                width:'105px',
                height:'105px',
                borderRadius:'50%',
                background:'#080d08',
                border:'5px solid #161f16',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                display:'grid',
                placeItems:'center',
                fontWeight:'900',
                fontSize:'20px'
              }}>
                مشهور
              </div>

            </div>
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            style={{
              marginTop:'20px',
              width:'240px',
              padding:'15px',
              border:0,
              borderRadius:'12px',
              background:'#9eff28',
              color:'#071004',
              fontWeight:'900',
              cursor:'pointer'
            }}
          >
            {spinning ? 'العجلة تدور...' : 'لف العجلة'}
          </button>

          <div style={{marginTop:'20px', minHeight:'70px'}}>
            <small style={{color:'#748075'}}>
              اختيار العجلة
            </small>

            <h2 style={{fontSize:'32px', margin:'5px'}}>
              {winner || '—'}
            </h2>
          </div>

        </main>

      </div>
    </div>
  )
}
