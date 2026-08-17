import { useState } from 'react'
import LettersPlay from './LettersPlay'

export default function LettersSetup({ onBack }) {
  const [greenName, setGreenName] = useState('الفريق الأخضر')
  const [orangeName, setOrangeName] = useState('الفريق البرتقالي')
  const [started, setStarted] = useState(false)

  if (started) {
    return (
      <LettersPlay
        greenName={greenName.trim() || 'الفريق الأخضر'}
        orangeName={orangeName.trim() || 'الفريق البرتقالي'}
        onBack={() => setStarted(false)}
      />
    )
  }

  return (
    <div className="lm-setup">
      <style>{setupStyles}</style>

      <button className="lm-back" onClick={onBack}>
        رجوع
      </button>

      <div className="lm-setup-card">
        <small>MASHHOOR GAMES</small>
        <h1>حروف مع محمد</h1>
        <p>كوّن طريقًا متصلًا بلون فريقك قبل الفريق الثاني</p>

        <label>
          الفريق الأخضر
          <input
            value={greenName}
            onChange={e => setGreenName(e.target.value)}
          />
        </label>

        <label>
          الفريق البرتقالي
          <input
            value={orangeName}
            onChange={e => setOrangeName(e.target.value)}
          />
        </label>

        <button
          className="lm-start"
          onClick={() => setStarted(true)}
        >
          ابدأ اللعبة
        </button>
      </div>
    </div>
  )
}

const setupStyles = `
  .lm-setup{
    min-height:100vh;
    direction:rtl;
    color:#34271e;
    background:#e8ddcc;
    padding:24px;
  }

  .lm-back{
    border:1px solid #baa98f;
    border-radius:10px;
    background:#f6edde;
    padding:10px 16px;
    font-family:inherit;
    cursor:pointer;
  }

  .lm-setup-card{
    width:min(520px,95vw);
    margin:70px auto 0;
    padding:32px;
    border:1px solid #c6b49a;
    border-radius:22px;
    background:#f3e8d8;
  }

  .lm-setup-card small{
    color:#7d684f;
    letter-spacing:3px;
  }

  .lm-setup-card h1{
    margin:8px 0;
    font-size:38px;
  }

  .lm-setup-card p{
    color:#806f5f;
    margin-bottom:25px;
  }

  .lm-setup-card label{
    display:block;
    margin:13px 0;
    font-size:12px;
    font-weight:800;
  }

  .lm-setup-card input{
    width:100%;
    margin-top:6px;
    min-height:45px;
    border:1px solid #c5b197;
    border-radius:10px;
    background:#fff9ef;
    padding:10px;
    font-family:inherit;
  }

  .lm-start{
    width:100%;
    min-height:52px;
    margin-top:18px;
    border:0;
    border-radius:11px;
    background:#5d4a39;
    color:white;
    font-family:inherit;
    font-weight:900;
    cursor:pointer;
  }
`
