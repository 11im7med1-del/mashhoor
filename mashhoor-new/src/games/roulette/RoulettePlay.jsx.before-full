import { useMemo, useState } from 'react'

const COLORS = [
  '#9eff28',
  '#24d1ff',
  '#ffb020',
  '#ff5f75',
  '#a978ff',
  '#35e0a1',
  '#ff7a2f',
  '#4d8dff',
  '#e8ff52',
  '#ff5cc8',
  '#72e6ff',
  '#b6ff66',
  '#ffcc4d',
  '#9b7cff',
  '#45d6b5',
]

export default function RoulettePlay({ players, mode, onBack }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState('')

  const part = 360 / players.length

  const wheelBackground = useMemo(() => {
    return `conic-gradient(${players.map((_, i) => {
      const start = i * part
      const end = (i + 1) * part
      return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`
    }).join(',')})`
  }, [players, part])

  function spin() {
    if (spinning || players.length < 2) return

    setSpinning(true)
    setWinner('')

    const selected = Math.floor(Math.random() * players.length)

    const selectedCenter = selected * part + part / 2

    const currentAngle = ((rotation % 360) + 360) % 360
    const targetAngle = (360 - selectedCenter) % 360

    const extraTurns = 360 * (7 + Math.floor(Math.random() * 2))

    const correction =
      (targetAngle - currentAngle + 360) % 360

    const nextRotation =
      rotation + extraTurns + correction

    setRotation(nextRotation)

    window.setTimeout(() => {
      setWinner(players[selected])
      setSpinning(false)
    }, 4200)
  }

  return (
    <div style={{
      minHeight:'100vh',
      background:
        'radial-gradient(circle at 70% 0, rgba(158,255,40,.07), transparent 28%), #050705',
      color:'#fff',
      padding:'24px',
      direction:'rtl'
    }}>

      <header style={{
        maxWidth:'1200px',
        margin:'0 auto 28px',
        minHeight:'64px',
        display:'grid',
        gridTemplateColumns:'1fr auto 1fr',
        alignItems:'center',
        borderBottom:'1px solid #1c241c',
        paddingBottom:'15px'
      }}>

        <button
          onClick={onBack}
          style={{
            justifySelf:'start',
            border:'1px solid #293129',
            borderRadius:'10px',
            padding:'10px 15px',
            background:'#0a0e0a',
            color:'#fff',
            cursor:'pointer'
          }}
        >
          رجوع للتجهيز
        </button>

        <div style={{textAlign:'center'}}>
          <small style={{
            display:'block',
            color:'#657066',
            fontSize:'8px',
            letterSpacing:'2px'
          }}>
            MASHHOOR GAMES
          </small>

          <h2 style={{margin:'4px 0'}}>
            الروليت
          </h2>
        </div>

        <b style={{
          justifySelf:'end',
          color:'#9eff28'
        }}>
          {mode === 'teams' ? 'فرق' : 'عادي'}
        </b>
      </header>

      <main style={{
        maxWidth:'1150px',
        margin:'auto',
        display:'grid',
        gridTemplateColumns:'290px minmax(0,1fr)',
        gap:'55px',
        alignItems:'center'
      }}>

        <aside style={{
          border:'1px solid #202820',
          borderRadius:'17px',
          padding:'18px',
          background:'#090d09'
        }}>

          <small style={{
            color:'#9eff28',
            fontWeight:'900'
          }}>
            اللاعبون
          </small>

          <h3 style={{
            margin:'6px 0 17px'
          }}>
            {players.length} لاعب
          </h3>

          <div style={{
            display:'grid',
            gap:'7px',
            maxHeight:'500px',
            overflow:'auto'
          }}>
            {players.map((player, i) => (
              <div
                key={`${player}-${i}`}
                style={{
                  minHeight:'40px',
                  display:'flex',
                  alignItems:'center',
                  gap:'10px',
                  border:'1px solid #202720',
                  borderRadius:'10px',
                  padding:'7px 9px',
                  background:'#070a07'
                }}
              >
                <span style={{
                  width:'25px',
                  height:'25px',
                  flex:'0 0 25px',
                  display:'grid',
                  placeItems:'center',
                  borderRadius:'7px',
                  background:COLORS[i % COLORS.length],
                  color:'#050705',
                  fontSize:'10px',
                  fontWeight:'1000'
                }}>
                  {i + 1}
                </span>

                <b style={{
                  fontSize:'12px',
                  overflow:'hidden',
                  textOverflow:'ellipsis'
                }}>
                  {player}
                </b>
              </div>
            ))}
          </div>
        </aside>

        <section style={{
          textAlign:'center'
        }}>

          <div style={{
            width:'470px',
            height:'500px',
            maxWidth:'100%',
            position:'relative',
            margin:'auto'
          }}>

            <div style={{
              position:'absolute',
              top:'0',
              left:'50%',
              transform:'translateX(-50%)',
              zIndex:20,
              fontSize:'43px',
              color:'#fff',
              filter:'drop-shadow(0 3px 5px #000)'
            }}>
              ▼
            </div>

            <div
              style={{
                position:'absolute',
                width:'440px',
                height:'440px',
                maxWidth:'94vw',
                maxHeight:'94vw',
                top:'38px',
                left:'50%',
                borderRadius:'50%',
                background:wheelBackground,
                border:'8px solid #111811',
                boxShadow:
                  '0 0 0 3px #222b22, 0 0 70px rgba(158,255,40,.13)',
                transition:'transform 4.2s cubic-bezier(.12,.72,.10,1)',
                transform:`translateX(-50%) rotate(${rotation}deg)`,
                overflow:'hidden'
              }}
            >

              {players.map((player, i) => {
                const angle = i * part + part / 2

                return (
                  <div
                    key={`${player}-wheel-${i}`}
                    style={{
                      position:'absolute',
                      left:'50%',
                      top:'50%',
                      width:'150px',
                      height:'30px',
                      marginLeft:'-75px',
                      marginTop:'-15px',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      transform:
                        `rotate(${angle}deg) translateY(-160px) rotate(${-angle}deg)`,
                      transformOrigin:'center',
                      pointerEvents:'none'
                    }}
                  >
                    <b style={{
                      maxWidth:'135px',
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:'nowrap',
                      color:'#081008',
                      fontSize:
                        players.length > 10 ? '10px' : '12px',
                      fontWeight:'1000',
                      textShadow:'0 1px 1px rgba(255,255,255,.18)'
                    }}>
                      {player}
                    </b>
                  </div>
                )
              })}

              <div style={{
                position:'absolute',
                width:'112px',
                height:'112px',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                display:'grid',
                placeContent:'center',
                borderRadius:'50%',
                border:'6px solid #182018',
                background:'#080d08',
                boxShadow:'0 0 25px rgba(0,0,0,.5)',
                zIndex:10
              }}>
                <b style={{
                  fontSize:'22px'
                }}>
                  مشهور
                </b>

                <small style={{
                  marginTop:'2px',
                  color:'#718071',
                  fontSize:'7px',
                  letterSpacing:'2px'
                }}>
                  ROULETTE
                </small>
              </div>
            </div>
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            style={{
              width:'250px',
              minHeight:'51px',
              border:'1px solid #9eff28',
              borderRadius:'12px',
              background:'#9eff28',
              color:'#071004',
              fontWeight:'1000',
              cursor:spinning ? 'not-allowed' : 'pointer',
              opacity:spinning ? .55 : 1
            }}
          >
            {spinning ? 'العجلة تدور...' : 'لف العجلة'}
          </button>

          <div style={{
            minHeight:'85px',
            marginTop:'18px'
          }}>
            <small style={{
              color:'#657066'
            }}>
              اختيار العجلة
            </small>

            <h2 style={{
              minHeight:'40px',
              margin:'5px 0',
              fontSize:'34px',
              color:winner ? '#9eff28' : '#fff'
            }}>
              {winner || '—'}
            </h2>
          </div>

        </section>
      </main>
    </div>
  )
}
