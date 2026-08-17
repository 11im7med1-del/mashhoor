import { useMemo, useState } from 'react'

const LETTERS = [
  'ا','ب','ت','ث','ج',
  'ح','خ','د','ذ','ر',
  'ز','س','ش','ص','ض',
  'ط','ظ','ع','غ','ف',
  'ق','ك','ل','م','ن',
  'ه','و','ي'
]

const QUESTIONS = {
  ا:[
    { q:'حيوان مفترس يُعرف بملك الغابة؟', a:'أسد' },
    { q:'اسم قارة تضم مصر والجزائر والمغرب؟', a:'أفريقيا' }
  ],
  ب:[
    { q:'فاكهة كبيرة خضراء من الخارج وحمراء غالبًا من الداخل؟', a:'بطيخ' },
    { q:'مدينة لبنانية ساحلية شهيرة؟', a:'بيروت' }
  ],
  ت:[
    { q:'دولة عربية عاصمتها تونس؟', a:'تونس' },
    { q:'فاكهة تؤكل طازجة أو مجففة وتشتهر بها المناطق الحارة؟', a:'تمر' }
  ],
  ث:[
    { q:'حيوان ماكر من فصيلة الكلبيات؟', a:'ثعلب' },
    { q:'شيء أبيض يتساقط في الطقس شديد البرودة؟', a:'ثلج' }
  ],
  ج:[
    { q:'تضاريس مرتفعة عن سطح الأرض؟', a:'جبل' },
    { q:'حيوان صحراوي يلقب بسفينة الصحراء؟', a:'جمل' }
  ],
  ح:[
    { q:'حيوان أليف يُستخدم في الركوب والسباقات؟', a:'حصان' },
    { q:'شراب أبيض ينتجه البقر ويشربه الإنسان؟', a:'حليب' }
  ],
  خ:[
    { q:'حيوان ثديي يستطيع الطيران وينشط غالبًا ليلًا؟', a:'خفاش' },
    { q:'خضار أخضر طويل يستخدم كثيرًا في السلطات؟', a:'خيار' }
  ],
  د:[
    { q:'عاصمة سوريا؟', a:'دمشق' },
    { q:'حيوان بحري ذكي معروف بالقفز فوق الماء؟', a:'دلفين' }
  ],
  ذ:[
    { q:'معدن أصفر ثمين يستخدم في المجوهرات؟', a:'ذهب' },
    { q:'حيوان مفترس من فصيلة الكلاب يعيش في البرية؟', a:'ذئب' }
  ],
  ر:[
    { q:'فاكهة حمراء مليئة بحبوب صغيرة؟', a:'رمان' },
    { q:'مادة طبيعية موجودة على الشواطئ والصحارى؟', a:'رمل' }
  ],
  ز:[
    { q:'أطول حيوان بري معروف؟', a:'زرافة' },
    { q:'نبات عطري يستخدم في المشروبات والطعام؟', a:'زعتر' }
  ],
  س:[
    { q:'كائن يعيش في الماء ويتنفس بالخياشيم؟', a:'سمك' },
    { q:'جسم مضيء نراه في السماء ليلًا؟', a:'سحابة' }
  ],
  ش:[
    { q:'النجم الذي يضيء الأرض نهارًا؟', a:'شمس' },
    { q:'نبات كبير له جذع وأغصان؟', a:'شجرة' }
  ],
  ص:[
    { q:'طائر جارح مشهور بقوة بصره؟', a:'صقر' },
    { q:'مكان واسع تغطيه الرمال؟', a:'صحراء' }
  ],
  ض:[
    { q:'حيوان برمائي يقفز ويعيش قرب الماء؟', a:'ضفدع' },
    { q:'نور قوي يظهر في السماء أثناء العواصف؟', a:'ضوء' }
  ],
  ط:[
    { q:'وسيلة نقل تطير في السماء؟', a:'طائرة' },
    { q:'حيوان أليف صغير يصطاد الفئران؟', a:'ط قط' }
  ],
  ظ:[
    { q:'وعاء ورقي يوضع فيه الخطاب؟', a:'ظرف' },
    { q:'شيء يتكون خلف الجسم عند وجود مصدر ضوء؟', a:'ظل' }
  ],
  ع:[
    { q:'عاصمة الأردن؟', a:'عمّان' },
    { q:'مادة حلوة ينتجها النحل؟', a:'عسل' }
  ],
  غ:[
    { q:'حيوان بري رشيق يشبه الظبي؟', a:'غزال' },
    { q:'تجمع بخار الماء في السماء؟', a:'غيمة' }
  ],
  ف:[
    { q:'دولة عربية عاصمتها القدس بحسب الموقف العربي؟', a:'فلسطين' },
    { q:'فاكهة حمراء صغيرة عليها بذور من الخارج؟', a:'فراولة' }
  ],
  ق:[
    { q:'جسم سماوي يدور حول الأرض؟', a:'قمر' },
    { q:'أداة نستخدمها للكتابة بالحبر؟', a:'قلم' }
  ],
  ك:[
    { q:'دولة كبيرة في أمريكا الشمالية وعاصمتها أوتاوا؟', a:'كندا' },
    { q:'مخلوق بحري ضخم من الثدييات؟', a:'حوت' }
  ],
  ل:[
    { q:'فاكهة صفراء حامضة الطعم؟', a:'ليمون' },
    { q:'جزء من اليوم يأتي بعد غروب الشمس؟', a:'ليل' }
  ],
  م:[
    { q:'دولة عربية تقع فيها أهرامات الجيزة؟', a:'مصر' },
    { q:'مسطح مائي مالح أصغر من المحيط عادة؟', a:'م بحر' }
  ],
  ن:[
    { q:'حيوان مفترس مخطط بالأسود والبرتقالي؟', a:'نمر' },
    { q:'حشرة تنتج العسل؟', a:'نحلة' }
  ],
  ه:[
    { q:'طائر ورد اسمه في قصة سليمان ويتميز بتاج من الريش؟', a:'هدهد' },
    { q:'شكل هندسي له خمسة أضلاع؟', a:'ه خماسي' }
  ],
  و:[
    { q:'نبات جميل ذو رائحة وألوان متعددة؟', a:'ورد' },
    { q:'مكان منخفض بين جبلين؟', a:'وادي' }
  ],
  ي:[
    { q:'زهرة بيضاء عطرية مشهورة؟', a:'ياسمين' },
    { q:'جزء من الجسم نستخدمه للمصافحة والكتابة؟', a:'يد' }
  ]
}

function shuffle(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function otherTeam(team) {
  return team === 'green' ? 'orange' : 'green'
}

export default function LettersPlay({
  greenName,
  orangeName,
  onBack
}) {
  const [cells, setCells] = useState(() => {
    const picked = shuffle(LETTERS).slice(0, 25)

    return picked.map((letter, index) => ({
      id:index,
      row:Math.floor(index / 5),
      col:index % 5,
      letter,
      owner:null
    }))
  })

  const [turnTeam, setTurnTeam] = useState('green')
  const [question, setQuestion] = useState(null)
  const [questionTeam, setQuestionTeam] = useState(null)
  const [firstWrong, setFirstWrong] = useState(false)
  const [winner, setWinner] = useState(null)

  const rows = useMemo(() => {
    return [0,1,2,3,4].map(row =>
      cells.filter(cell => cell.row === row)
    )
  }, [cells])

  function teamName(team) {
    return team === 'green'
      ? greenName
      : orangeName
  }

  function getCell(row, col, source = cells) {
    return source.find(
      cell => cell.row === row && cell.col === col
    )
  }

  function neighbors(cell, source) {
    const dirs = [
      [-1,0],
      [1,0],
      [0,-1],
      [0,1],
      [-1,1],
      [1,-1]
    ]

    return dirs
      .map(([dr, dc]) =>
        getCell(cell.row + dr, cell.col + dc, source)
      )
      .filter(Boolean)
  }

  function hasPath(team, source) {
    const starts = source.filter(cell => {
      if (cell.owner !== team) return false

      return team === 'green'
        ? cell.row === 0
        : cell.col === 0
    })

    const visited = new Set()
    const queue = [...starts]

    while (queue.length) {
      const cell = queue.shift()

      if (visited.has(cell.id)) continue
      visited.add(cell.id)

      if (
        team === 'green'
          ? cell.row === 4
          : cell.col === 4
      ) {
        return true
      }

      neighbors(cell, source)
        .filter(next =>
          next.owner === team &&
          !visited.has(next.id)
        )
        .forEach(next => queue.push(next))
    }

    return false
  }

  function openLetter(cell) {
    if (
      winner ||
      question ||
      cell.owner
    ) return

    const list = QUESTIONS[cell.letter] || []

    if (!list.length) return

    const picked =
      list[Math.floor(Math.random() * list.length)]

    setQuestion({
      cell,
      ...picked
    })

    setQuestionTeam(turnTeam)
    setFirstWrong(false)
  }

  function correct() {
    if (!question || !questionTeam) return

    const updated = cells.map(cell =>
      cell.id === question.cell.id
        ? { ...cell, owner:questionTeam }
        : cell
    )

    setCells(updated)

    if (hasPath(questionTeam, updated)) {
      setWinner(questionTeam)
    } else {
      // الفريق الذي أجاب صح يختار الحرف التالي
      setTurnTeam(questionTeam)
    }

    setQuestion(null)
    setQuestionTeam(null)
    setFirstWrong(false)
  }

  function wrong() {
    if (!question || !questionTeam) return

    if (!firstWrong) {
      // نفس السؤال ينتقل للفريق الثاني
      setQuestionTeam(otherTeam(questionTeam))
      setFirstWrong(true)
      return
    }

    // الفريقان أخطآ، الخلية تبقى فارغة
    setTurnTeam(otherTeam(turnTeam))
    setQuestion(null)
    setQuestionTeam(null)
    setFirstWrong(false)
  }

  function resetGame() {
    const picked = shuffle(LETTERS).slice(0, 25)

    setCells(
      picked.map((letter, index) => ({
        id:index,
        row:Math.floor(index / 5),
        col:index % 5,
        letter,
        owner:null
      }))
    )

    setTurnTeam('green')
    setQuestion(null)
    setQuestionTeam(null)
    setFirstWrong(false)
    setWinner(null)
  }

  return (
    <div className="lm-root">
      <style>{styles}</style>

      <header className="lm-header">
        <button onClick={onBack}>
          رجوع
        </button>

        <div className="lm-green-name">
          {greenName}
        </div>

        <div className="lm-title">
          <small>حروف مع محمد</small>
          <b>
            يختار الآن:
            {' '}
            {teamName(turnTeam)}
          </b>
        </div>

        <div className="lm-orange-name">
          {orangeName}
        </div>

        <button onClick={resetGame}>
          إعادة
        </button>
      </header>

      <main className="lm-game">

        <div className="lm-green-edge lm-green-top">
          الأخضر
        </div>

        <div className="lm-board-wrap">

          <div className="lm-orange-edge lm-orange-left">
            البرتقالي
          </div>

          <div className="lm-board">
            {rows.map((row, rowIndex) => (
              <div
                className={`lm-row ${rowIndex % 2 ? 'shift' : ''}`}
                key={rowIndex}
              >
                {row.map(cell => (
                  <button
                    key={cell.id}
                    className={`lm-hex ${cell.owner || ''}`}
                    onClick={() => openLetter(cell)}
                    disabled={!!cell.owner || !!winner}
                  >
                    {cell.letter}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="lm-orange-edge lm-orange-right">
            البرتقالي
          </div>

        </div>

        <div className="lm-green-edge lm-green-bottom">
          الأخضر
        </div>

      </main>

      {question && (
        <div className="lm-overlay">
          <div className="lm-question">

            <div className="lm-question-head">
              <span>
                الحرف
                {' '}
                <b>{question.cell.letter}</b>
              </span>

              <span className={questionTeam}>
                دور
                {' '}
                {teamName(questionTeam)}
              </span>
            </div>

            {firstWrong && (
              <div className="lm-pass">
                إجابة خاطئة — نفس السؤال انتقل للفريق الثاني
              </div>
            )}

            <h2>
              {question.q}
            </h2>

            <div className="lm-answer">
              <small>الإجابة للمنسق</small>
              <b>{question.a}</b>
            </div>

            <div className="lm-actions">
              <button
                className="lm-wrong"
                onClick={wrong}
              >
                خطأ
              </button>

              <button
                className="lm-correct"
                onClick={correct}
              >
                إجابة صحيحة
              </button>
            </div>

          </div>
        </div>
      )}

      {winner && (
        <div className="lm-overlay">
          <div className="lm-winner">
            <small>الفائز</small>

            <h1 className={winner}>
              {teamName(winner)}
            </h1>

            <p>
              أكمل المسار
              {' '}
              {winner === 'green'
                ? 'من الأعلى إلى الأسفل'
                : 'من اليسار إلى اليمين'}
            </p>

            <button onClick={resetGame}>
              جولة جديدة
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

const styles = `
  .lm-root{
    min-height:100vh;
    direction:rtl;
    background:#e8ddcc;
    color:#34271d;
    padding:18px;
  }

  .lm-root *{
    box-sizing:border-box;
  }

  .lm-header{
    max-width:1200px;
    margin:auto;
    min-height:70px;
    display:grid;
    grid-template-columns:auto 1fr 1.3fr 1fr auto;
    align-items:center;
    gap:14px;
    border-bottom:1px solid #c8b69d;
  }

  .lm-header button{
    border:1px solid #b9a58a;
    border-radius:9px;
    background:#f6ecdc;
    padding:9px 13px;
    font-family:inherit;
    cursor:pointer;
  }

  .lm-title{
    text-align:center;
  }

  .lm-title small{
    display:block;
    color:#816c54;
  }

  .lm-title b{
    display:block;
    margin-top:5px;
  }

  .lm-green-name{
    color:#327044;
    font-weight:900;
  }

  .lm-orange-name{
    color:#b45c1c;
    font-weight:900;
    text-align:left;
  }

  .lm-game{
    width:min(760px,95vw);
    margin:24px auto 0;
  }

  .lm-green-edge{
    height:38px;
    display:grid;
    place-items:center;
    border-radius:10px;
    background:#4d9a62;
    color:white;
    font-size:11px;
    font-weight:900;
  }

  .lm-board-wrap{
    display:grid;
    grid-template-columns:40px 1fr 40px;
    align-items:center;
    gap:8px;
    direction:ltr;
  }

  .lm-orange-edge{
    height:430px;
    display:grid;
    place-items:center;
    writing-mode:vertical-rl;
    border-radius:10px;
    background:#d27632;
    color:white;
    font-size:11px;
    font-weight:900;
  }

  .lm-board{
    min-height:440px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:-4px;
    direction:ltr;
  }

  .lm-row{
    display:flex;
    gap:7px;
    margin-top:-9px;
  }

  .lm-row.shift{
    transform:translateX(45px);
  }

  .lm-hex{
    width:88px;
    height:98px;
    border:0;
    clip-path:polygon(
      25% 6%,
      75% 6%,
      100% 50%,
      75% 94%,
      25% 94%,
      0 50%
    );
    background:#f8efe1;
    box-shadow:inset 0 0 0 3px #baa88f;
    color:#3b2b20;
    font-family:inherit;
    font-size:28px;
    font-weight:1000;
    cursor:pointer;
    transition:.15s;
  }

  .lm-hex:hover{
    transform:scale(1.05);
  }

  .lm-hex.green{
    background:#4f9b63;
    color:white;
  }

  .lm-hex.orange{
    background:#d67a34;
    color:white;
  }

  .lm-overlay{
    position:fixed;
    inset:0;
    z-index:100;
    display:grid;
    place-items:center;
    padding:20px;
    background:rgba(45,34,24,.72);
    backdrop-filter:blur(5px);
  }

  .lm-question,
  .lm-winner{
    width:min(720px,96vw);
    padding:28px;
    border:1px solid #c7b398;
    border-radius:20px;
    background:#f4eadb;
    box-shadow:0 30px 90px rgba(0,0,0,.3);
  }

  .lm-question-head{
    display:flex;
    justify-content:space-between;
    gap:20px;
    font-size:13px;
  }

  .lm-question-head .green{
    color:#327044;
    font-weight:900;
  }

  .lm-question-head .orange{
    color:#b55c1c;
    font-weight:900;
  }

  .lm-question h2{
    min-height:150px;
    display:grid;
    place-items:center;
    text-align:center;
    line-height:1.8;
  }

  .lm-answer{
    padding:13px;
    text-align:center;
    border-radius:11px;
    background:#e4d3bc;
  }

  .lm-answer small{
    display:block;
    color:#89745e;
  }

  .lm-answer b{
    display:block;
    margin-top:4px;
    font-size:20px;
  }

  .lm-pass{
    margin-top:15px;
    padding:10px;
    border-radius:10px;
    background:#ead0ba;
    text-align:center;
    font-size:12px;
  }

  .lm-actions{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:10px;
    margin-top:14px;
  }

  .lm-actions button{
    min-height:50px;
    border-radius:10px;
    font-family:inherit;
    font-weight:900;
    cursor:pointer;
  }

  .lm-wrong{
    border:1px solid #ae7469;
    background:#e8c7c0;
    color:#743b33;
  }

  .lm-correct{
    border:1px solid #6e916d;
    background:#d3e2cd;
    color:#355438;
  }

  .lm-winner{
    text-align:center;
  }

  .lm-winner h1{
    font-size:42px;
  }

  .lm-winner h1.green{
    color:#3b8350;
  }

  .lm-winner h1.orange{
    color:#c46c2b;
  }

  .lm-winner button{
    min-width:180px;
    min-height:48px;
    border:0;
    border-radius:10px;
    background:#624a36;
    color:white;
    font-family:inherit;
    font-weight:900;
    cursor:pointer;
  }

  @media(max-width:700px){
    .lm-board{
      transform:scale(.72);
      transform-origin:center;
      width:620px;
      margin-left:-120px;
    }

    .lm-board-wrap{
      overflow:hidden;
    }

    .lm-header{
      grid-template-columns:auto 1fr auto;
    }

    .lm-green-name,
    .lm-orange-name{
      display:none;
    }
  }
`
