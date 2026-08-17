import { useMemo, useState } from 'react'
import DATA from './fakkerhaData'
import fakkerhaCategoriesImage from '../../assets/fakkerha-categories-correct.png'

const POINTS = [100, 200, 300, 400, 500]

export default function FakkerhaSetup({ onBack }) {
  const [selected, setSelected] = useState([])
  const [started, setStarted] = useState(false)

  const [teamA, setTeamA] = useState('الفريق الأول')
  const [teamB, setTeamB] = useState('الفريق الثاني')

  const [currentTeam, setCurrentTeam] = useState('a')

  const [scores, setScores] = useState({
    a:0,
    b:0
  })

  const [used, setUsed] = useState({})
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [stealMode, setStealMode] = useState(false)

  const categories = DATA.categories || []

  const selectedCategories = useMemo(
    () => categories.filter(cat => selected.includes(cat.id)),
    [categories, selected]
  )

  function toggleCategory(id) {
    if (started) return

    setSelected(current => {
      if (current.includes(id)) {
        return current.filter(item => item !== id)
      }

      if (current.length >= 5) {
        return current
      }

      return [...current, id]
    })
  }

  function getQuestion(categoryId, points) {
    const list = DATA.questions?.[categoryId] || []

    return (
      list.find(question => Number(question.points) === Number(points)) ||
      list[POINTS.indexOf(points)] ||
      null
    )
  }

  function openQuestion(categoryId, points) {
    const key = `${categoryId}-${points}`

    if (used[key]) return

    const category = categories.find(cat => cat.id === categoryId)
    const question = getQuestion(categoryId, points)

    if (!question) return

    setUsed(current => ({
      ...current,
      [key]:true
    }))

    setActiveQuestion({
      category,
      question,
      points,
      originalTeam:currentTeam
    })

    setShowAnswer(false)
    setStealMode(false)
  }

  function otherTeam(team) {
    return team === 'a' ? 'b' : 'a'
  }

  function closeQuestion(nextTeam) {
    setActiveQuestion(null)
    setShowAnswer(false)
    setStealMode(false)

    if (nextTeam) {
      setCurrentTeam(nextTeam)
    }
  }

  function correctAnswer() {
    if (!activeQuestion) return

    setScores(current => ({
      ...current,
      [currentTeam]:
        current[currentTeam] + activeQuestion.points
    }))

    closeQuestion(otherTeam(activeQuestion.originalTeam))
  }

  function wrongAnswer() {
    if (!activeQuestion) return

    if (!stealMode) {
      setStealMode(true)
      setCurrentTeam(
        otherTeam(activeQuestion.originalTeam)
      )
      return
    }

    closeQuestion(
      otherTeam(activeQuestion.originalTeam)
    )
  }

  if (!started) {
    return (
      <div className="fk-root">
        <style>{styles}</style>

        <header className="fk-header">
          <button className="fk-back" onClick={onBack}>
            رجوع
          </button>

          <div>
            <small>MASHHOOR GAMES</small>
            <h2>فكّرها</h2>
          </div>

          <b>{selected.length} / 5</b>
        </header>

        <main className="fk-setup">

          <aside className="fk-side">

            <span className="fk-label">
              الفرق
            </span>

            <h3>
              جهّز أسماء الفرق
            </h3>

            <label>
              الفريق الأول
              <input
                value={teamA}
                onChange={e => setTeamA(e.target.value)}
              />
            </label>

            <label>
              الفريق الثاني
              <input
                value={teamB}
                onChange={e => setTeamB(e.target.value)}
              />
            </label>

            <div className="fk-selected-box">
              <span>
                الفئات المختارة
              </span>

              <b>
                {selected.length} من 5
              </b>
            </div>

            <button
              className="fk-start"
              disabled={selected.length !== 5}
              onClick={() => setStarted(true)}
            >
              ابدأ اللعبة
            </button>

          </aside>

          <section className="fk-category-section">

            <div className="fk-section-head">
              <small>
                اختر خمس فئات
              </small>

              <h1>
                وش بتفكّر فيها؟
              </h1>

              <p>
                اختر 5 فئات لتكوين لوحة الجولة
              </p>
            </div>

            <div className="fk-category-grid">

              {categories.map((category, index) => {
                const active =
                  selected.includes(category.id)

                return (
                  <button
                    key={category.id}
                    className={
                      `fk-category ${
                        active ? 'active' : ''
                      }`
                    }
                    onClick={() =>
                      toggleCategory(category.id)
                    }
                  >
                    <div
                      className="fk-category-image"
                      style={{
                        backgroundImage: `url(${fakkerhaCategoriesImage})`,
                        backgroundPosition: `${(index % 4) * 100 / 3}% ${Math.floor(index / 4) * 100 / 3}%`
                      }}
                    />

                    <b>
                      {category.name}
                    </b>

                    {active && (
                      <small>
                        تم الاختيار
                      </small>
                    )}
                  </button>
                )
              })}

            </div>

          </section>

        </main>
      </div>
    )
  }

  return (
    <div className="fk-root">
      <style>{styles}</style>

      <header className="fk-game-header">

        <button
          className="fk-back"
          onClick={() => setStarted(false)}
        >
          رجوع للتجهيز
        </button>

        <div className="fk-score fk-team-a">
          <small>{teamA}</small>
          <b>{scores.a}</b>
        </div>

        <div className="fk-turn">
          <small>
            الدور على
          </small>

          <b>
            {currentTeam === 'a'
              ? teamA
              : teamB}
          </b>
        </div>

        <div className="fk-score fk-team-b">
          <small>{teamB}</small>
          <b>{scores.b}</b>
        </div>

      </header>

      <main className="fk-board">

        {selectedCategories.map(category => (
          <div
            className="fk-column"
            key={category.id}
          >

            <div className="fk-column-head">
              <div
                className="fk-board-category-image"
                style={{
                  backgroundImage: `url(${fakkerhaCategoriesImage})`,
                  backgroundPosition: `${(categories.findIndex(c => c.id === category.id) % 4) * 100 / 3}% ${Math.floor(categories.findIndex(c => c.id === category.id) / 4) * 100 / 3}%`
                }}
              />

              <b>
                {category.name}
              </b>
            </div>

            {POINTS.map(points => {
              const key =
                `${category.id}-${points}`

              return (
                <button
                  key={points}
                  className={
                    `fk-point ${
                      used[key] ? 'used' : ''
                    }`
                  }
                  disabled={used[key]}
                  onClick={() =>
                    openQuestion(
                      category.id,
                      points
                    )
                  }
                >
                  {points}
                </button>
              )
            })}

          </div>
        ))}

      </main>

      {activeQuestion && (
        <div className="fk-question-overlay">

          <div className="fk-question-card">

            <div className="fk-question-top">

              <span className="fk-question-category">
                <span
                  className="fk-question-category-image"
                  style={{
                    backgroundImage: `url(${fakkerhaCategoriesImage})`,
                    backgroundPosition: `${(categories.findIndex(c => c.id === activeQuestion.category.id) % 4) * 100 / 3}% ${Math.floor(categories.findIndex(c => c.id === activeQuestion.category.id) / 4) * 100 / 3}%`
                  }}
                />
                {activeQuestion.category.name}
              </span>

              <b>
                {activeQuestion.points} نقطة
              </b>

            </div>

            {stealMode && (
              <div className="fk-steal">
                فرصة سرقة — الدور الآن على
                {' '}
                <b>
                  {currentTeam === 'a'
                    ? teamA
                    : teamB}
                </b>
              </div>
            )}

            <div className="fk-question-text">
              {activeQuestion.question.q}
            </div>

            {!showAnswer ? (
              <button
                className="fk-show-answer"
                onClick={() => setShowAnswer(true)}
              >
                إظهار الإجابة
              </button>
            ) : (
              <>
                <div className="fk-answer">
                  <small>
                    الإجابة
                  </small>

                  <b>
                    {activeQuestion.question.a}
                  </b>
                </div>

                <div className="fk-answer-actions">

                  <button
                    className="fk-wrong"
                    onClick={wrongAnswer}
                  >
                    خطأ
                  </button>

                  <button
                    className="fk-correct"
                    onClick={correctAnswer}
                  >
                    إجابة صحيحة
                  </button>

                </div>
              </>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

const styles = `
  .fk-root{
    min-height:100vh;
    box-sizing:border-box;
    direction:rtl;
    color:#33281f;
    padding:20px;
    background:
      radial-gradient(
        circle at 70% 0%,
        rgba(120,84,53,.12),
        transparent 30%
      ),
      #e7dbc9;
  }

  .fk-root *{
    box-sizing:border-box;
  }

  .fk-header,
  .fk-game-header{
    max-width:1250px;
    min-height:65px;
    margin:0 auto 22px;
    display:grid;
    grid-template-columns:1fr auto 1fr;
    align-items:center;
    padding-bottom:14px;
    border-bottom:1px solid #c8b49c;
  }

  .fk-header > div{
    text-align:center;
  }

  .fk-header small{
    display:block;
    color:#846b55;
    font-size:8px;
    letter-spacing:3px;
  }

  .fk-header h2{
    margin:3px 0 0;
  }

  .fk-header > b{
    justify-self:end;
    color:#6d4a2f;
  }

  .fk-back{
    justify-self:start;
    border:1px solid #bda78d;
    border-radius:10px;
    padding:10px 15px;
    background:#f3eadc;
    color:#493728;
    font-family:inherit;
    cursor:pointer;
  }

  .fk-setup{
    max-width:1250px;
    margin:auto;
    display:grid;
    grid-template-columns:310px 1fr;
    gap:30px;
    align-items:start;
  }

  .fk-side{
    padding:20px;
    border:1px solid #c9b59b;
    border-radius:18px;
    background:#f1e6d5;
  }

  .fk-label{
    color:#815c3c;
    font-size:11px;
    font-weight:900;
  }

  .fk-side h3{
    margin:5px 0 20px;
  }

  .fk-side label{
    display:block;
    margin-bottom:14px;
    color:#755d49;
    font-size:11px;
  }

  .fk-side input{
    width:100%;
    min-height:42px;
    margin-top:6px;
    border:1px solid #c9b49a;
    border-radius:10px;
    padding:9px 11px;
    background:#fff9ef;
    color:#33281f;
    font-family:inherit;
  }

  .fk-selected-box{
    margin-top:20px;
    padding:12px;
    display:flex;
    justify-content:space-between;
    border-radius:11px;
    background:#e2d2bd;
  }

  .fk-start{
    width:100%;
    min-height:50px;
    margin-top:14px;
    border:0;
    border-radius:11px;
    background:#765033;
    color:#fff9ef;
    font-family:inherit;
    font-weight:900;
    cursor:pointer;
  }

  .fk-start:disabled{
    opacity:.35;
    cursor:not-allowed;
  }

  .fk-category-section{
    min-width:0;
  }

  .fk-section-head{
    margin-bottom:18px;
  }

  .fk-section-head small{
    color:#8b6e56;
  }

  .fk-section-head h1{
    margin:5px 0;
    font-size:34px;
  }

  .fk-section-head p{
    margin:0;
    color:#8d7765;
  }

  .fk-preview-image-box{
    margin:0 0 18px;
    padding:10px;
    border:1px solid #c7b198;
    border-radius:18px;
    background:#f3e8d8;
  }

  .fk-preview-image{
    display:block;
    width:100%;
    border-radius:12px;
  }

  .fk-category-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:11px;
  }

  .fk-category{
    height:230px;
    min-height:230px;
    border:1px solid #c7b198;
    border-radius:16px;
    padding:8px;
    background:#f3e8d8;
    color:#3c2c20;
    font-family:inherit;
    cursor:pointer;
    transition:.16s;
  }

  .fk-category:hover{
    transform:translateY(-2px);
    border-color:#977759;
  }

  .fk-category.active{
    border:2px solid #765033;
    background:#dbc5a9;
    box-shadow:
      0 10px 25px rgba(81,52,31,.10);
  }

  .fk-category-image{
    width:100%;
    height:175px;
    min-width:100%;
    min-height:175px;
    max-width:100%;
    max-height:175px;
    margin:0 0 8px;
    border-radius:12px;
    overflow:hidden;
    background-size:400% 400%;
    background-repeat:no-repeat;
    background-color:#d4bea4;
  }



  .fk-category b{
    display:block;
  }

  .fk-category small{
    display:block;
    margin-top:6px;
    color:#765033;
    font-size:9px;
  }

  /* لوحة اللعب */

  .fk-game-header{
    grid-template-columns:1fr auto auto auto;
    gap:25px;
  }

  .fk-score{
    min-width:150px;
    text-align:center;
    padding:8px 14px;
    border-radius:12px;
    background:#f1e5d4;
    border:1px solid #c6b198;
  }

  .fk-score small{
    display:block;
    color:#826a57;
    font-size:9px;
  }

  .fk-score b{
    font-size:24px;
  }

  .fk-turn{
    min-width:180px;
    text-align:center;
  }

  .fk-turn small{
    display:block;
    color:#8d7561;
    font-size:9px;
  }

  .fk-turn b{
    color:#69482f;
  }

  .fk-board{
    max-width:1180px;
    margin:35px auto;
    display:grid;
    grid-template-columns:
      repeat(5,minmax(0,1fr));
    gap:10px;
  }

  .fk-column{
    display:grid;
    gap:8px;
  }

  .fk-column-head{
    height:175px;
    min-height:175px;
    padding:8px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    border:1px solid #c4ad92;
    border-radius:14px;
    background:#d8c0a3;
  }



  .fk-column-head span{
    font-size:30px;
  }

  .fk-column-head b{
    margin-top:7px;
    font-size:11px;
  }

  .fk-board-category-image{
    width:100%;
    height:125px;
    min-width:100%;
    min-height:125px;
    max-width:100%;
    max-height:125px;
    margin:0 0 6px;
    border-radius:10px;
    overflow:hidden;
    background-size:400% 400%;
    background-repeat:no-repeat;
    background-color:#d4bea4;
  }



  .fk-question-category{
    display:flex;
    align-items:center;
    gap:9px;
  }

  .fk-question-category-image{
    width:52px;
    height:52px;
    min-width:52px;
    min-height:52px;
    max-width:52px;
    max-height:52px;
    border-radius:8px;
    overflow:hidden;
    background-size:400% 400%;
    background-repeat:no-repeat;
    background-color:#d4bea4;
  }



  .fk-point{
    min-height:72px;
    border:1px solid #c6af94;
    border-radius:12px;
    background:#f2e7d6;
    color:#68462e;
    font-size:24px;
    font-weight:1000;
    font-family:inherit;
    cursor:pointer;
  }

  .fk-point:hover{
    background:#e5d2bb;
  }

  .fk-point.used{
    opacity:.22;
    cursor:default;
  }

  /* السؤال */

  .fk-question-overlay{
    position:fixed;
    inset:0;
    z-index:100;
    display:grid;
    place-items:center;
    padding:20px;
    background:rgba(43,31,21,.76);
    backdrop-filter:blur(5px);
  }

  .fk-question-card{
    width:min(800px,96vw);
    padding:30px;
    border:1px solid #cbb79e;
    border-radius:22px;
    background:#f1e6d6;
    color:#34261c;
    box-shadow:0 30px 100px rgba(0,0,0,.35);
  }

  .fk-question-top{
    display:flex;
    justify-content:space-between;
    gap:15px;
    color:#78563b;
    font-size:11px;
  }

  .fk-question-text{
    min-height:170px;
    display:grid;
    place-items:center;
    text-align:center;
    padding:25px;
    font-size:27px;
    line-height:1.8;
  }

  .fk-steal{
    margin-top:15px;
    padding:10px;
    text-align:center;
    border-radius:10px;
    background:#dfc9ae;
  }

  .fk-show-answer{
    width:100%;
    min-height:50px;
    border:0;
    border-radius:11px;
    background:#765033;
    color:#fff;
    font-family:inherit;
    font-weight:900;
    cursor:pointer;
  }

  .fk-answer{
    padding:18px;
    text-align:center;
    border-radius:12px;
    background:#dfcbb2;
  }

  .fk-answer small{
    display:block;
    color:#826851;
  }

  .fk-answer b{
    display:block;
    margin-top:5px;
    font-size:20px;
  }

  .fk-answer-actions{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:10px;
    margin-top:12px;
  }

  .fk-answer-actions button{
    min-height:48px;
    border-radius:11px;
    font-family:inherit;
    font-weight:900;
    cursor:pointer;
  }

  .fk-wrong{
    border:1px solid #aa766d;
    background:#e2c5be;
    color:#70372f;
  }

  .fk-correct{
    border:1px solid #7a8f66;
    background:#d5dfc6;
    color:#415534;
  }

  @media(max-width:900px){
    .fk-setup{
      grid-template-columns:1fr;
    }

    .fk-category-grid{
      grid-template-columns:repeat(3,1fr);
    }
  }

  @media(max-width:650px){
    .fk-category-grid{
      grid-template-columns:repeat(2,1fr);
    }

    .fk-board{
      overflow-x:auto;
      grid-template-columns:repeat(5,150px);
    }
  }
`
