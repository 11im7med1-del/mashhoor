import { useState } from 'react'
import CountriesPlay from './CountriesPlay'

export default function CountriesSetup({ onBack }) {
  const [names, setNames] = useState('')
  const [started, setStarted] = useState(false)

  const players = names
    .split('\n')
    .map(name => name.trim())
    .filter(Boolean)
    .slice(0, 30)

  if (started) {
    return (
      <CountriesPlay
        players={players}
        onBack={() => setStarted(false)}
      />
    )
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:'#050705',
      color:'#fff',
      direction:'rtl',
      padding:'24px'
    }}>
      <div style={{
        maxWidth:'1200px',
        margin:'auto',
        display:'grid',
        gridTemplateColumns:'330px 1fr',
        gap:'35px'
      }}>

        <aside style={{
          border:'1px solid #202820',
          borderRadius:'18px',
          padding:'18px',
          background:'#090d09'
        }}>
          <button onClick={onBack}>
            رجوع
          </button>

          <h3>اللاعبون</h3>

          <textarea
            value={names}
            onChange={e => setNames(e.target.value)}
            placeholder={'محمد\nأحمد\nخالد'}
            style={{
              width:'100%',
              minHeight:'280px',
              resize:'vertical',
              border:'1px solid #293229',
              borderRadius:'12px',
              background:'#070a07',
              color:'#fff',
              padding:'12px',
              fontFamily:'inherit'
            }}
          />

          <div style={{
            marginTop:'10px',
            color:'#829083'
          }}>
            {players.length} / 30 لاعب
          </div>
        </aside>

        <main style={{
          minHeight:'70vh',
          display:'grid',
          placeItems:'center'
        }}>
          <div style={{
            width:'min(620px,100%)',
            textAlign:'center',
            padding:'35px',
            border:'1px solid #202820',
            borderRadius:'22px',
            background:'#080c08'
          }}>
            <small style={{
              color:'#9eff28',
              letterSpacing:'3px'
            }}>
              MASHHOOR GAMES
            </small>

            <h1 style={{
              fontSize:'44px',
              margin:'12px 0'
            }}>
              حرب الدول
            </h1>

            <p style={{
              color:'#7d897d'
            }}>
              أضف اللاعبين ثم ابدأ الحرب
            </p>

            <button
              onClick={() => setStarted(true)}
              disabled={players.length < 2}
              style={{
                marginTop:'25px',
                width:'250px',
                minHeight:'52px',
                borderRadius:'12px',
                border:'1px solid #9eff28',
                background:'#9eff28',
                color:'#071007',
                fontWeight:'900',
                opacity:players.length < 2 ? .4 : 1
              }}
            >
              ابدأ اللعبة
            </button>
          </div>
        </main>

      </div>
    </div>
  )
}
