export default function ChatJoinPanel({
  chat
}) {
  const {
    players,
    namesText,
    setNamesText,
    joiningOpen,
    setJoiningOpen,
    kickStatus,
    lastJoin,
    removePlayer,
    clearPlayers,
    refreshConnection,
    max
  } = chat

  const statusText = {
    connected:'Kick متصل',
    connecting:'جاري الاتصال...',
    checking:'جاري الفحص...',
    disconnected:'Kick غير متصل',
    error:'تعذر الاتصال بـ Kick'
  }[kickStatus]

  return (
    <div className="chat-entry-panel">

      <div className="chat-entry-head">
        <div>
          <span>دخول اللاعبين</span>
          <h3>قائمة الشات</h3>
        </div>

        <div
          className={`kick-state ${kickStatus}`}
        >
          <i />
          {statusText}
        </div>
      </div>

      <div className="join-command">
        <div>
          <small>أمر الدخول</small>
          <strong>!دخول</strong>
        </div>

        <button
          type="button"
          className={
            joiningOpen
              ? 'join-open'
              : 'join-closed'
          }
          onClick={() =>
            setJoiningOpen(value => !value)
          }
        >
          {joiningOpen
            ? 'الدخول مفتوح'
            : 'الدخول مغلق'}
        </button>
      </div>

      {lastJoin && (
        <div className="last-chat-join">
          <span>آخر لاعب دخل</span>
          <b>{lastJoin}</b>
        </div>
      )}

      <div className="chat-player-count">
        <span>اللاعبون</span>
        <b>
          {players.length}
          <small> / {max}</small>
        </b>
      </div>

      <div className="joined-chat-list">
        {players.length === 0 ? (
          <p>
            بانتظار اللاعبين...
            <br />
            <small>
              يكتب المشاهد !دخول في الشات
            </small>
          </p>
        ) : (
          players.map((player, index) => (
            <div
              className="joined-chat-player"
              key={`${player}-${index}`}
            >
              <span>{index + 1}</span>

              <b>{player}</b>

              <button
                type="button"
                onClick={() =>
                  removePlayer(player)
                }
                title="حذف اللاعب"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <details className="manual-entry">
        <summary>
          إضافة أسماء يدويًا
        </summary>

        <textarea
          value={namesText}
          onChange={event =>
            setNamesText(event.target.value)
          }
          placeholder={
            'محمد\nسعود\nفارس'
          }
        />
      </details>

      <div className="chat-panel-actions">
        <button
          type="button"
          onClick={refreshConnection}
        >
          تحديث Kick
        </button>

        <button
          type="button"
          onClick={clearPlayers}
          disabled={!players.length}
        >
          تفريغ القائمة
        </button>
      </div>

    </div>
  )
}
