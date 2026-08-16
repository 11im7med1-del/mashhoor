const games = [
  { id:'roulette', num:'01', title:'الروليت', desc:'اختيار، حظ، وقرارات مباشرة', icon:'◉' },
  { id:'countries', num:'02', title:'حرب الدول', desc:'أعلام، استراتيجية، وإقصاءات', icon:'⚑' },
  { id:'russian', num:'03', title:'الروليت الروسي', desc:'جولات سريعة وتوتر حتى النهاية', icon:'◎' },
  { id:'codenames', num:'04', title:'كود نيمز', desc:'فرق، تلميحات، وتفكير جماعي', icon:'◆' },
  { id:'letters', num:'05', title:'حروف مع محمد', desc:'حروف، أسئلة، ومسارات تنافسية', icon:'⬡' },
  { id:'fakkerha', num:'06', title:'فكّرها', desc:'فئات متنوعة وتحديات معلومات', icon:'✦' },
]

export default function App() {
  return (
    <div className="site">
      <div className="grid-bg" />
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <header className="header">
        <div className="logo">
          <div className="logo-box">م</div>
          <div>
            <b>مشهور</b>
            <span>MASHHOOR</span>
          </div>
        </div>

        <nav>
          <button>الرئيسية</button>
          <button onClick={() => document.getElementById('games')?.scrollIntoView({behavior:'smooth'})}>
            الألعاب
          </button>
          <button>تواصل</button>
        </nav>

        <button className="room-btn">إنشاء غرفة</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="tag">
              <i />
              منصة ألعاب تفاعلية للبث المباشر
            </div>

            <h1>
              خلي جمهورك
              <span>جزء من اللعبة.</span>
            </h1>

            <p>
              ألعاب جماعية مصممة للبث، غرف خاصة، تحديات مباشرة،
              وتجربة عربية مرتبة من أول دخول حتى إعلان الفائز.
            </p>

            <div className="hero-buttons">
              <button
                className="start-btn"
                onClick={() => document.getElementById('games')?.scrollIntoView({behavior:'smooth'})}
              >
                ابدأ اللعب
                <span>←</span>
              </button>
              <button className="outline-btn">كيف يعمل مشهور؟</button>
            </div>

            <div className="hero-stats">
              <div><b>6</b><span>ألعاب رئيسية</span></div>
              <div><b>15+</b><span>لاعب في الغرفة</span></div>
              <div><b>LIVE</b><span>مصمم للبث</span></div>
            </div>
          </div>

          <div className="hero-art">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />

            <div className="center-logo">
              <small>MASHHOOR</small>
              <strong>مشهور</strong>
              <span>GAMES</span>
            </div>

            <div className="float-card card-a">
              <span className="online-dot" />
              <div>
                <b>الغرفة متصلة</b>
                <small>اللاعبون جاهزون</small>
              </div>
            </div>

            <div className="float-card card-b">
              <span>⚡</span>
              <div>
                <b>جولة مباشرة</b>
                <small>تفاعل لحظي</small>
              </div>
            </div>
          </div>
        </section>

        <section className="games" id="games">
          <div className="section-title">
            <div>
              <span>اختر لعبتك</span>
              <h2>ألعاب مشهور</h2>
            </div>
            <p>
              كل لعبة لها شاشة تجهيز مستقلة قبل بدء الجولة،
              وإعدادات مناسبة لطريقة اللعب.
            </p>
          </div>

          <div className="game-grid">
            {games.map(game => (
              <article className="game-card" key={game.id}>
                <div className="card-top">
                  <span className="number">{game.num}</span>
                  <div className="game-icon">{game.icon}</div>
                </div>

                <div className="card-copy">
                  <h3>{game.title}</h3>
                  <p>{game.desc}</p>
                </div>

                <button>
                  دخول اللعبة
                  <span>←</span>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div>
          <b>مشهور</b>
          <span>ألعاب البث التفاعلية</span>
        </div>

        <div className="discord">
          <small>DISCORD</small>
          <strong>1im7med</strong>
        </div>
      </footer>
    </div>
  )
}
