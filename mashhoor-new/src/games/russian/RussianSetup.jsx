import { useState } from 'react'
import RussianPlay from './RussianPlay'
import useKickChatPlayers from '../../shared/useKickChatPlayers'
import ChatJoinPanel from '../../shared/ChatJoinPanel'
import '../../shared/chat-setup.css'

export default function RussianSetup({
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
      <RussianPlay
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
          <h2>الروليت الروسي</h2>
        </div>

        <div />
      </header>

      <main className="setup-layout">

        <aside className="setup-sidebar">
          <ChatJoinPanel chat={chat} />
        </aside>

        <section className="setup-main">

          <div className="setup-kicker">
            إعداد الجولة
          </div>

          <h1>الروليت الروسي</h1>

          <p className="setup-description">
            اللاعب يكتب !دخول في الشات،
            وبعد تجهيز القائمة تبدأ الجولة.
          </p>

          <div className="selected-mode">
            <span>المسجلون</span>
            <b>{players.length} لاعب</b>
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
