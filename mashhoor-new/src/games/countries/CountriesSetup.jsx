import { useState } from 'react'
import CountriesPlay from './CountriesPlay'
import useKickChatPlayers from '../../shared/useKickChatPlayers'
import ChatJoinPanel from '../../shared/ChatJoinPanel'
import '../../shared/chat-setup.css'

export default function CountriesSetup({
  onBack
}) {
  const [started, setStarted] = useState(false)

  const chat = useKickChatPlayers({
    max:30,
    locked:started
  })

  const players = chat.players

  if (started) {
    return (
      <CountriesPlay
        players={players}
        onBack={() => setStarted(false)}
      />
    )
  }

  return (
    <div className="game-screen">

      <header className="game-header">
        <button
          className="back-btn"
          onClick={onBack}
        >
          رجوع
        </button>

        <div className="game-title-box">
          <small>MASHHOOR GAMES</small>
          <h2>حرب الدول</h2>
        </div>

        <div />
      </header>

      <main className="setup-layout">

        <aside className="setup-sidebar">
          <ChatJoinPanel chat={chat} />
        </aside>

        <section className="setup-main">

          <div className="setup-kicker">
            إعداد اللعبة
          </div>

          <h1>حرب الدول</h1>

          <p className="setup-description">
            افتح دخول الشات، جهّز اللاعبين،
            وبعدها ابدأ الحرب.
          </p>

          <div className="selected-mode">
            <span>حالة الدخول</span>
            <b>
              {chat.joiningOpen
                ? 'مفتوح للاعبين'
                : 'مغلق'}
            </b>
          </div>

          <button
            className="big-start-btn"
            disabled={players.length < 2}
            onClick={() => setStarted(true)}
          >
            ابدأ اللعبة
            <span>←</span>
          </button>

          {players.length < 2 && (
            <small className="start-note">
              يحتاج لاعبين اثنين على الأقل
            </small>
          )}

        </section>
      </main>
    </div>
  )
}
