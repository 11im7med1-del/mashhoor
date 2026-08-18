import {
  useEffect,
  useRef,
  useState
} from 'react'

import DepthNetwork from './DepthNetwork'
import './home-v2.css'
import { LETTERS_BANK } from '../games/letters/lettersBank.js'
import { FAKKERHA_BANK } from '../games/fakkerha/fakkerhaBank.js'

const API =
  'https://mashhoor-api.11im7med1.workers.dev'

const DEFAULT_COPY = {
  heroTitle:'الجمهور مو متفرّج.',
  heroAccent:'هو جزء من اللعبة.',
  heroText:
    'مشهور يجمع ألعاب البث التفاعلية في تجربة عربية واضحة، سريعة، ومصممة للستريمر والجمهور من أول دخول حتى إعلان الفائز.',
  about:
    'أنا 1im7med، مطور مشهور. بنيت المشروع بهدف تحويل البث من مجرد مشاهدة إلى تجربة يشارك فيها الجمهور فعليًا، مع اهتمام بالتفاصيل الصغيرة التي تصنع فرقًا كبيرًا في اللعب.',
  philosophy:
    'البساطة لا تعني أن التصميم يكون فارغًا. هدفي أقل تعقيد ممكن، لكن بأكبر قدر من التفاعل والحيوية. كل حركة، لون، شاشة سؤال، وصوت لازم يخدم اللعبة.',
  vision:
    'مشهور ليس مجموعة ألعاب موضوعة جنب بعض. كل لعبة لها شخصيتها وأسلوبها، لكن كلها تنتمي لنفس العالم ونفس الهوية.',
  discord:'1im7med'
}

const games = [
  {
    id:'roulette',
    num:'01',
    title:'الروليت',
    desc:'اختيار، حظ، قرارات مباشرة، ودخول اللاعبين من الشات.',
    image:'/game-art/roulette.svg',
    chat:true
  },
  {
    id:'countries',
    num:'02',
    title:'حرب الدول',
    desc:'أعلام، عجلة، اختيارات وإقصاءات في مواجهة جماعية.',
    image:'/game-art/countries.svg',
    chat:true
  },
  {
    id:'russian',
    num:'03',
    title:'الروليت الروسي',
    desc:'توتر، اختيارات، وست محاولات حتى تحسم الجولة.',
    image:'/game-art/russian.svg',
    chat:true
  },
  {
    id:'letters',
    num:'04',
    title:'حروف مع محمد',
    desc:'أسئلة صعبة ومسارات متصلة بين الأخضر والبرتقالي.',
    image:'/game-art/letters.svg'
  },
  {
    id:'fakkerha',
    num:'05',
    title:'فكّرها',
    desc:'فئات متنوعة، أسئلة كثيرة، وسرقة بين الفريقين.',
    image:'/game-art/fakkerha.svg'
  }
]

function loadCopy() {
  try {
    const value =
      localStorage.getItem('mashhoor:home-copy')

    return value
      ? {...DEFAULT_COPY, ...JSON.parse(value)}
      : DEFAULT_COPY
  } catch {
    return DEFAULT_COPY
  }
}

export default function Home({
  onOpenGame
}) {
  const [copy, setCopy] = useState(loadCopy)
  const [devOpen, setDevOpen] = useState(false)

  const [kickLinked, setKickLinked] =
    useState(() =>
      Boolean(
        localStorage.getItem(
          'mashhoor_kick_session'
        )
      )
    )

  const logoClicks = useRef(0)
  const logoTimer = useRef(null)

  useEffect(() => {
    const hash =
      new URLSearchParams(
        window.location.hash.slice(1)
      )

    const session =
      hash.get('kick_session')

    if (session) {
      localStorage.setItem(
        'mashhoor_kick_session',
        session
      )

      setKickLinked(true)

      window.history.replaceState(
        {},
        '',
        window.location.pathname +
        window.location.search
      )
    }
  }, [])

  function secretLogoClick() {
    logoClicks.current += 1

    if (logoTimer.current) {
      clearTimeout(logoTimer.current)
    }

    logoTimer.current = setTimeout(() => {
      logoClicks.current = 0
    }, 10000)

    if (logoClicks.current < 5) return

    logoClicks.current = 0
    clearTimeout(logoTimer.current)

    setDevOpen(true)
  }

  function connectKick() {
    if (kickLinked) {
      localStorage.removeItem(
        'mashhoor_kick_session'
      )

      setKickLinked(false)
      return
    }

    window.location.assign(
      `https://mashhoor-secure.11im7med1.workers.dev/auth/kick/start`
    )
  }

  return (
    <div className="mh-home">

      <DepthNetwork />

      <header className="mh-nav">
        <button
          className="mh-brand"
          onClick={secretLogoClick}
          aria-label="مشهور"
        >
          <img
            src="/mashhoor-mark.svg"
            alt=""
          />

          <span>
            <b>مشهور</b>
            <small>MASHHOOR GAMES</small>
          </span>
        </button>

        <nav>
          <button
            onClick={() =>
              window.scrollTo({
                top:0,
                behavior:'smooth'
              })
            }
          >
            الرئيسية
          </button>

          <button
            onClick={() =>
              document
                .getElementById('mh-games')
                ?.scrollIntoView({
                  behavior:'smooth'
                })
            }
          >
            الألعاب
          </button>

          <button
            onClick={() =>
              document
                .getElementById('mh-about')
                ?.scrollIntoView({
                  behavior:'smooth'
                })
            }
          >
            عني
          </button>

          <button
            onClick={() =>
              document
                .getElementById('mh-contact')
                ?.scrollIntoView({
                  behavior:'smooth'
                })
            }
          >
            تواصل
          </button>
        </nav>

        <button
          className={
            kickLinked
              ? 'mh-kick linked'
              : 'mh-kick'
          }
          onClick={connectKick}
        >
          <i />
          {kickLinked
            ? 'KICK مرتبط'
            : 'ربط KICK'}
        </button>
      </header>

      <main>

        <section className="mh-hero">

          <div className="mh-hero-copy">

            <div className="mh-eyebrow">
              <i />
              ألعاب تفاعلية للبث المباشر
            </div>

            <h1>
              {copy.heroTitle}
              <span>
                {copy.heroAccent}
              </span>
            </h1>

            <p>
              {copy.heroText}
            </p>

            <div className="mh-hero-actions">
              <button
                className="mh-primary"
                onClick={() =>
                  document
                    .getElementById('mh-games')
                    ?.scrollIntoView({
                      behavior:'smooth'
                    })
                }
              >
                اختر لعبتك
                <span>←</span>
              </button>

              <button
                className="mh-secondary"
                onClick={connectKick}
              >
                {kickLinked
                  ? 'فصل KICK'
                  : 'ربط البث'}
              </button>
            </div>

            <div className="mh-mini-stats">
              <div>
                <b>5</b>
                <span>ألعاب</span>
              </div>

              <div>
                <b>840</b>
                <span>سؤال حروف</span>
              </div>

              <div>
                <b>LIVE</b>
                <span>دخول شات</span>
              </div>
            </div>

          </div>

          <div className="mh-hero-stage">
            <div className="mh-stage-ring one" />
            <div className="mh-stage-ring two" />
            <div className="mh-stage-ring three" />

            <img
              className="mh-stage-logo"
              src="/mashhoor-mark.svg"
              alt="مشهور"
            />

            <div className="mh-stage-card top">
              <span>LIVE</span>
              <b>الجمهور داخل اللعبة</b>
            </div>

            <div className="mh-stage-card bottom">
              <span>!دخول</span>
              <b>من الشات مباشرة</b>
            </div>
          </div>

        </section>

        <section
          className="mh-games"
          id="mh-games"
        >
          <div className="mh-section-head">
            <div>
              <span>اختر لعبتك</span>
              <h2>ألعاب مشهور</h2>
            </div>

            <p>
              كل لعبة لها شخصيتها،
              لكن التحكم والتجربة يظلون
              واضحين من البداية للنهاية.
            </p>
          </div>

          <div className="mh-game-grid">
            {games.map(game => (
              <article
                className="mh-game-card"
                key={game.id}
              >
                <div className="mh-art">
                  <img
                    src={game.image}
                    alt=""
                    loading="lazy"
                  />

                  <span className="mh-game-num">
                    {game.num}
                  </span>

                  {game.chat && (
                    <span className="mh-chat-badge">
                      !دخول من الشات
                    </span>
                  )}
                </div>

                <div className="mh-game-copy">
                  <h3>{game.title}</h3>
                  <p>{game.desc}</p>
                </div>

                <button
                  onClick={() =>
                    onOpenGame(game.id)
                  }
                >
                  دخول اللعبة
                  <span>←</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          className="mh-about"
          id="mh-about"
        >
          <article className="mh-about-main">

            <span className="mh-label">
              وراء مشهور
            </span>

            <div className="mh-dev-id">
              <img
                src="/mashhoor-mark.svg"
                alt=""
              />

              <div>
                <small>DEVELOPER</small>
                <h2>1im7med</h2>
              </div>
            </div>

            <p>{copy.about}</p>

            <div className="mh-signature">
              <span>صُمم وطُوّر لـ</span>
              <b>مشهور</b>
            </div>

          </article>

          <div className="mh-thoughts">

            <article>
              <span>01</span>
              <small>فلسفتي</small>
              <h3>
                البساطة بدون فراغ
              </h3>
              <p>
                {copy.philosophy}
              </p>
            </article>

            <article>
              <span>02</span>
              <small>فكرة مشهور</small>
              <h3>
                هوية واحدة، ألعاب مختلفة
              </h3>
              <p>
                {copy.vision}
              </p>
            </article>

          </div>
        </section>

        <section className="mh-principles">

          <div className="mh-section-head">
            <div>
              <span>التفاصيل تفرق</span>
              <h2>
                الأشياء اللي أهتم فيها
              </h2>
            </div>
          </div>

          <div className="mh-principle-grid">

            <article>
              <b>01</b>
              <h3>واضحة للستريمر</h3>
              <p>
                التحكم ما يحتاج شرح طويل.
                أهم الأشياء قدامك مباشرة.
              </p>
            </article>

            <article>
              <b>02</b>
              <h3>ممتعة للمشاهد</h3>
              <p>
                الجمهور يشوف نتيجة قراره
                وتأثيره على الجولة فورًا.
              </p>
            </article>

            <article>
              <b>03</b>
              <h3>كل لعبة لها شخصية</h3>
              <p>
                نفس هوية مشهور،
                لكن بدون نسخ نفس الشاشة
                على كل الألعاب.
              </p>
            </article>

            <article>
              <b>04</b>
              <h3>الحركة لها سبب</h3>
              <p>
                الأنيميشن يخدم اللحظة
                بدل ما يكون مجرد زحمة.
              </p>
            </article>

          </div>
        </section>

        <section
          className="mh-contact"
          id="mh-contact"
        >
          <div>
            <span>تواصل</span>
            <h2>
              عندك اقتراح أو فكرة؟
            </h2>
            <p>
              تواصل معي مباشرة على Discord.
            </p>
          </div>

          <button
            onClick={() =>
              navigator.clipboard?.writeText(
                copy.discord
              )
            }
          >
            <small>DISCORD</small>
            <b>{copy.discord}</b>
            <span>نسخ ←</span>
          </button>
        </section>

      </main>

      <footer className="mh-footer">
        <div>
          <img
            src="/mashhoor-mark.svg"
            alt=""
          />
          <span>
            <b>مشهور</b>
            <small>
              ألعاب البث التفاعلية
            </small>
          </span>
        </div>

        <p>
          Developed by
          {' '}
          <strong>1im7med</strong>
        </p>
      </footer>

      {devOpen && (
        <DeveloperPanel
          copy={copy}
          setCopy={setCopy}
          kickLinked={kickLinked}
          connectKick={connectKick}
          onClose={() => setDevOpen(false)}
        />
      )}

    </div>
  )
}

async function mashhoorHash(value) {
  const data = new TextEncoder().encode(value)

  const digest = await crypto.subtle.digest(
    'SHA-256',
    data
  )

  return Array.from(
    new Uint8Array(digest)
  )
    .map(byte =>
      byte.toString(16).padStart(2, '0')
    )
    .join('')
}

const DEV_PASSWORD_HASH =
  import.meta.env.VITE_DEV_PASSWORD_HASH || ''


/* =========================================================
   MASHHOOR DEVELOPER BANK CONTROL
========================================================= */

const MASHHOOR_BANK_KEYS = {
  letters:'mashhoor:bank:letters',
  fakkerha:'mashhoor:bank:fakkerha'
}

function mashhoorClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function mashhoorCleanDisabled(value) {
  if (Array.isArray(value)) {
    return value
      .filter(item =>
        !(
          item &&
          typeof item === 'object' &&
          item.__disabled
        )
      )
      .map(mashhoorCleanDisabled)
  }

  if (
    value &&
    typeof value === 'object'
  ) {
    const result = {}

    Object.entries(value).forEach(
      ([key, item]) => {
        if (key === '__disabled') return

        result[key] =
          mashhoorCleanDisabled(item)
      }
    )

    return result
  }

  return value
}

function mashhoorReplaceInPlace(
  target,
  source
) {
  if (
    Array.isArray(target) &&
    Array.isArray(source)
  ) {
    target.splice(
      0,
      target.length,
      ...mashhoorClone(source)
    )

    return
  }

  if (
    target &&
    source &&
    typeof target === 'object' &&
    typeof source === 'object'
  ) {
    Object.keys(target).forEach(key => {
      delete target[key]
    })

    Object.assign(
      target,
      mashhoorClone(source)
    )
  }
}

function mashhoorLoadBank(
  key,
  fallback
) {
  try {
    const saved =
      localStorage.getItem(key)

    if (!saved) {
      return mashhoorClone(fallback)
    }

    return JSON.parse(saved)
  } catch {
    return mashhoorClone(fallback)
  }
}

const MASHHOOR_ORIGINAL_LETTERS =
  mashhoorClone(LETTERS_BANK)

const MASHHOOR_ORIGINAL_FAKKERHA =
  mashhoorClone(FAKKERHA_BANK)

function mashhoorApplyStoredBanks() {
  if (
    typeof window === 'undefined'
  ) return

  const letters =
    mashhoorLoadBank(
      MASHHOOR_BANK_KEYS.letters,
      MASHHOOR_ORIGINAL_LETTERS
    )

  const fakkerha =
    mashhoorLoadBank(
      MASHHOOR_BANK_KEYS.fakkerha,
      MASHHOOR_ORIGINAL_FAKKERHA
    )

  mashhoorReplaceInPlace(
    LETTERS_BANK,
    mashhoorCleanDisabled(letters)
  )

  mashhoorReplaceInPlace(
    FAKKERHA_BANK,
    mashhoorCleanDisabled(fakkerha)
  )
}

mashhoorApplyStoredBanks()

function mashhoorQuestionRows(
  value,
  path = [],
  output = []
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      mashhoorQuestionRows(
        item,
        [...path, index],
        output
      )
    )

    return output
  }

  if (
    !value ||
    typeof value !== 'object'
  ) {
    return output
  }

  const questionKey =
    ['q','question','prompt','text']
      .find(key =>
        typeof value[key] === 'string'
      )

  const answerKey =
    ['a','answer','answers','solution']
      .find(key =>
        typeof value[key] === 'string'
      )

  if (questionKey && answerKey) {
    output.push({
      path,
      questionKey,
      answerKey,
      question:value[questionKey],
      answer:value[answerKey],
      disabled:Boolean(value.__disabled),
      points:value.points ?? '',
      letter:value.letter ?? '',
      category:value.category ?? ''
    })
  }

  Object.entries(value).forEach(
    ([key, item]) => {
      if (
        key === questionKey ||
        key === answerKey
      ) return

      if (
        item &&
        typeof item === 'object'
      ) {
        mashhoorQuestionRows(
          item,
          [...path, key],
          output
        )
      }
    }
  )

  return output
}

function mashhoorGetPath(
  root,
  path
) {
  let value = root

  for (const key of path) {
    if (value == null) return null
    value = value[key]
  }

  return value
}

function mashhoorSetPath(
  root,
  path,
  updater
) {
  const clone =
    mashhoorClone(root)

  let target = clone

  for (
    let i = 0;
    i < path.length - 1;
    i++
  ) {
    target = target[path[i]]
  }

  if (path.length === 0) {
    return updater(clone)
  }

  const last =
    path[path.length - 1]

  target[last] =
    updater(target[last])

  return clone
}

async function mashhoorShowAnnouncement(
  text,
  duration
) {
  const adminToken =
    sessionStorage.getItem(
      'mashhoor:admin-token'
    )

  if (adminToken && text.trim()) {
    try {
      await fetch(
        'https://mashhoor-api.11im7med1.workers.dev/api/admin/announcement',
        {
          method:'POST',
          headers:{
            'content-type':'application/json',
            'authorization':
              `Bearer ${adminToken}`
          },
          body:JSON.stringify({
            text,
            duration
          })
        }
      )
    } catch {}
  }
  if (!text.trim()) return

  const old =
    document.getElementById(
      'mashhoor-dev-live-announcement'
    )

  if (old) old.remove()

  const element =
    document.createElement('div')

  element.id =
    'mashhoor-dev-live-announcement'

  element.className =
    'mashhoor-live-announcement'

  element.innerHTML = `
    <div class="mashhoor-live-announcement-box">
      <small>MASHHOOR</small>
      <strong></strong>
    </div>
  `

  element.querySelector('strong')
    .textContent = text

  document.body.appendChild(element)

  requestAnimationFrame(() => {
    element.classList.add('show')
  })

  setTimeout(() => {
    element.classList.remove('show')

    setTimeout(
      () => element.remove(),
      350
    )
  }, Math.max(1, duration) * 1000)
}


function DeveloperPanel({
  copy,
  setCopy,
  kickLinked,
  connectKick,
  onClose
}) {
  const [draft, setDraft] =
    useState(copy)

  const [authorized, setAuthorized] =
    useState(() =>
      sessionStorage.getItem(
        'mashhoor:dev-unlocked'
      ) === '1'
    )

  const [password, setPassword] =
    useState('')

  const [loginError, setLoginError] =
    useState('')

  const [checkingPassword, setCheckingPassword] =
    useState(false)

  const [tab, setTab] =
    useState('home')

  const [bankType, setBankType] =
    useState('letters')

  const [lettersDraft, setLettersDraft] =
    useState(() =>
      mashhoorLoadBank(
        MASHHOOR_BANK_KEYS.letters,
        MASHHOOR_ORIGINAL_LETTERS
      )
    )

  const [fakkerhaDraft, setFakkerhaDraft] =
    useState(() =>
      mashhoorLoadBank(
        MASHHOOR_BANK_KEYS.fakkerha,
        MASHHOOR_ORIGINAL_FAKKERHA
      )
    )

  const [bankSearch, setBankSearch] =
    useState('')

  const [selectedQuestion, setSelectedQuestion] =
    useState(null)

  const [questionDraft, setQuestionDraft] =
    useState({
      question:'',
      answer:''
    })

  const [announcement, setAnnouncement] =
    useState('')

  const [announcementDuration, setAnnouncementDuration] =
    useState(7)

  async function unlockDeveloper(event) {
    event.preventDefault()

    if (checkingPassword) return

    setCheckingPassword(true)
    setLoginError('')

    try {
      if (!DEV_PASSWORD_HASH) {
        setLoginError(
          'كلمة مرور لوحة المطور غير مجهزة.'
        )
        return
      }

      const hash =
        await mashhoorHash(password)

      if (hash !== DEV_PASSWORD_HASH) {
        setLoginError(
          'كلمة المرور غير صحيحة'
        )
        return
      }

      sessionStorage.setItem(
        'mashhoor:dev-unlocked',
        '1'
      )

      try {
        const response = await fetch(
          'https://mashhoor-api.11im7med1.workers.dev/api/admin/login',
          {
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify({
              password
            })
          }
        )

        const payload =
          await response.json()

        if (payload?.token) {
          sessionStorage.setItem(
            'mashhoor:admin-token',
            payload.token
          )
        }
      } catch {}

      setAuthorized(true)
      setPassword('')
    } finally {
      setCheckingPassword(false)
    }
  }

  function lockDeveloper() {
    sessionStorage.removeItem(
      'mashhoor:dev-unlocked'
    )

    setAuthorized(false)
    setPassword('')
    onClose()
  }

  function saveHome() {
    const adminToken =
      sessionStorage.getItem(
        'mashhoor:admin-token'
      )

    if (adminToken) {
      fetch(
        'https://mashhoor-api.11im7med1.workers.dev/api/admin/config',
        {
          method:'PUT',
          headers:{
            'content-type':'application/json',
            'authorization':
              `Bearer ${adminToken}`
          },
          body:JSON.stringify(draft)
        }
      ).catch(() => {})
    }

    localStorage.setItem(
      'mashhoor:home-copy',
      JSON.stringify(draft)
    )

    setCopy(draft)
  }

  function resetHome() {
    localStorage.removeItem(
      'mashhoor:home-copy'
    )

    setDraft(DEFAULT_COPY)
    setCopy(DEFAULT_COPY)
  }

  const currentBank =
    bankType === 'letters'
      ? lettersDraft
      : fakkerhaDraft

  const allQuestions =
    mashhoorQuestionRows(currentBank)

  const filteredQuestions =
    allQuestions.filter(item => {
      const search =
        bankSearch
          .trim()
          .toLowerCase()

      if (!search) return true

      return (
        item.question
          .toLowerCase()
          .includes(search) ||
        item.answer
          .toLowerCase()
          .includes(search) ||
        String(item.points)
          .includes(search) ||
        String(item.letter)
          .toLowerCase()
          .includes(search) ||
        String(item.category)
          .toLowerCase()
          .includes(search)
      )
    })

  function chooseQuestion(item) {
    setSelectedQuestion(item)

    setQuestionDraft({
      question:item.question,
      answer:item.answer
    })
  }

  function updateCurrentBank(next) {
    if (bankType === 'letters') {
      setLettersDraft(next)
    } else {
      setFakkerhaDraft(next)
    }
  }

  function saveQuestion() {
    if (!selectedQuestion) return

    const next =
      mashhoorSetPath(
        currentBank,
        selectedQuestion.path,
        item => ({
          ...item,
          [selectedQuestion.questionKey]:
            questionDraft.question,
          [selectedQuestion.answerKey]:
            questionDraft.answer
        })
      )

    updateCurrentBank(next)

    setSelectedQuestion({
      ...selectedQuestion,
      question:questionDraft.question,
      answer:questionDraft.answer
    })
  }

  function toggleQuestion(item) {
    const next =
      mashhoorSetPath(
        currentBank,
        item.path,
        value => ({
          ...value,
          __disabled:!value.__disabled
        })
      )

    updateCurrentBank(next)

    if (
      selectedQuestion &&
      JSON.stringify(
        selectedQuestion.path
      ) === JSON.stringify(item.path)
    ) {
      setSelectedQuestion({
        ...selectedQuestion,
        disabled:!item.disabled
      })
    }
  }

  function deleteQuestion(item) {
    if (
      !window.confirm(
        'حذف هذا السؤال من النسخة المعدلة؟'
      )
    ) return

    const path = item.path

    if (!path.length) return

    const parentPath =
      path.slice(0, -1)

    const index =
      path[path.length - 1]

    const next =
      mashhoorSetPath(
        currentBank,
        parentPath,
        parent => {
          if (Array.isArray(parent)) {
            return parent.filter(
              (_, i) => i !== index
            )
          }

          const copy = {...parent}
          delete copy[index]
          return copy
        }
      )

    updateCurrentBank(next)
    setSelectedQuestion(null)
  }

  function addQuestionBesideSelected() {
    if (!selectedQuestion) {
      alert(
        'اختر سؤالًا من نفس القسم أولًا ثم اضغط إضافة.'
      )
      return
    }

    const path =
      selectedQuestion.path

    const parentPath =
      path.slice(0, -1)

    const index =
      path[path.length - 1]

    const original =
      mashhoorGetPath(
        currentBank,
        path
      )

    const next =
      mashhoorSetPath(
        currentBank,
        parentPath,
        parent => {
          if (!Array.isArray(parent)) {
            return parent
          }

          const copy = [...parent]

          const newItem = {
            ...mashhoorClone(original),
            [selectedQuestion.questionKey]:
              'سؤال جديد',
            [selectedQuestion.answerKey]:
              'الإجابة'
          }

          delete newItem.__disabled

          copy.splice(
            Number(index) + 1,
            0,
            newItem
          )

          return copy
        }
      )

    updateCurrentBank(next)
  }

  function saveBanks() {
    const adminToken =
      sessionStorage.getItem(
        'mashhoor:admin-token'
      )

    if (adminToken) {
      Promise.all([
        fetch(
          'https://mashhoor-api.11im7med1.workers.dev/api/admin/bank/letters',
          {
            method:'PUT',
            headers:{
              'content-type':'application/json',
              'authorization':
                `Bearer ${adminToken}`
            },
            body:JSON.stringify({
              bank:lettersDraft
            })
          }
        ),
        fetch(
          'https://mashhoor-api.11im7med1.workers.dev/api/admin/bank/fakkerha',
          {
            method:'PUT',
            headers:{
              'content-type':'application/json',
              'authorization':
                `Bearer ${adminToken}`
            },
            body:JSON.stringify({
              bank:fakkerhaDraft
            })
          }
        )
      ]).catch(() => {})
    }

    localStorage.setItem(
      MASHHOOR_BANK_KEYS.letters,
      JSON.stringify(lettersDraft)
    )

    localStorage.setItem(
      MASHHOOR_BANK_KEYS.fakkerha,
      JSON.stringify(fakkerhaDraft)
    )

    mashhoorReplaceInPlace(
      LETTERS_BANK,
      mashhoorCleanDisabled(
        lettersDraft
      )
    )

    mashhoorReplaceInPlace(
      FAKKERHA_BANK,
      mashhoorCleanDisabled(
        fakkerhaDraft
      )
    )

    alert(
      'تم حفظ بنك الأسئلة وتطبيقه.'
    )
  }

  function restoreBank() {
    const name =
      bankType === 'letters'
        ? 'حروف مع محمد'
        : 'فكّرها'

    if (
      !window.confirm(
        `استعادة بنك ${name} الأصلي؟`
      )
    ) return

    if (bankType === 'letters') {
      const original =
        mashhoorClone(
          MASHHOOR_ORIGINAL_LETTERS
        )

      setLettersDraft(original)

      localStorage.removeItem(
        MASHHOOR_BANK_KEYS.letters
      )

      mashhoorReplaceInPlace(
        LETTERS_BANK,
        original
      )
    } else {
      const original =
        mashhoorClone(
          MASHHOOR_ORIGINAL_FAKKERHA
        )

      setFakkerhaDraft(original)

      localStorage.removeItem(
        MASHHOOR_BANK_KEYS.fakkerha
      )

      mashhoorReplaceInPlace(
        FAKKERHA_BANK,
        original
      )
    }

    setSelectedQuestion(null)
  }

  if (!authorized) {
    return (
      <div
        className="mh-dev-backdrop"
        onMouseDown={event => {
          if (
            event.target ===
            event.currentTarget
          ) {
            onClose()
          }
        }}
      >
        <form
          className="mh-dev-login"
          onSubmit={unlockDeveloper}
        >
          <img
            src="/mashhoor-mark.svg"
            alt=""
          />

          <small>
            MASHHOOR · PRIVATE
          </small>

          <h2>لوحة المطور</h2>

          <p>
            هذه المنطقة خاصة بإدارة مشهور.
          </p>

          <label>
            كلمة المرور

            <input
              type="password"
              value={password}
              autoFocus
              onChange={event =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="••••••••"
            />
          </label>

          {loginError && (
            <div className="mh-dev-login-error">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={
              !password ||
              checkingPassword
            }
          >
            {checkingPassword
              ? 'جاري التحقق...'
              : 'دخول لوحة المطور'}
          </button>

          <button
            type="button"
            className="cancel"
            onClick={onClose}
          >
            إلغاء
          </button>
        </form>
      </div>
    )
  }

  return (
    <div
      className="mh-dev-backdrop"
      onMouseDown={event => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >
      <section className="mh-dev-panel mh-dev-panel-pro">

        <header className="mh-dev-pro-header">
          <div>
            <small>
              MASHHOOR · CONTROL CENTER
            </small>

            <h2>لوحة تحكم مشهور</h2>
          </div>

          <div className="mh-dev-header-actions">
            <button
              className="mh-dev-lock"
              onClick={lockDeveloper}
            >
              قفل
            </button>

            <button onClick={onClose}>
              ×
            </button>
          </div>
        </header>

        <nav className="mh-dev-tabs">
          <button
            className={tab === 'home' ? 'active' : ''}
            onClick={() => setTab('home')}
          >
            الرئيسية
          </button>

          <button
            className={tab === 'questions' ? 'active' : ''}
            onClick={() => setTab('questions')}
          >
            بنك الأسئلة
          </button>

          <button
            className={tab === 'broadcast' ? 'active' : ''}
            onClick={() => setTab('broadcast')}
          >
            شاشة البث
          </button>

          <button
            className={tab === 'kick' ? 'active' : ''}
            onClick={() => setTab('kick')}
          >
            KICK
          </button>
        </nav>

        <div className="mh-dev-content">

          {tab === 'home' && (
            <div className="mh-dev-grid">

              <article>
                <h3>الرئيسية</h3>

                <label>
                  العنوان الأول
                  <input
                    value={draft.heroTitle}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        heroTitle:e.target.value
                      })
                    }
                  />
                </label>

                <label>
                  العنوان الأخضر
                  <input
                    value={draft.heroAccent}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        heroAccent:e.target.value
                      })
                    }
                  />
                </label>

                <label>
                  وصف مشهور
                  <textarea
                    value={draft.heroText}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        heroText:e.target.value
                      })
                    }
                  />
                </label>
              </article>

              <article>
                <h3>المطور</h3>

                <label>
                  عن المطور
                  <textarea
                    value={draft.about}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        about:e.target.value
                      })
                    }
                  />
                </label>

                <label>
                  الفلسفة
                  <textarea
                    value={draft.philosophy}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        philosophy:e.target.value
                      })
                    }
                  />
                </label>

                <label>
                  فكرة مشهور
                  <textarea
                    value={draft.vision}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        vision:e.target.value
                      })
                    }
                  />
                </label>
              </article>

              <article>
                <h3>التواصل</h3>

                <label>
                  Discord
                  <input
                    value={draft.discord}
                    onChange={e =>
                      setDraft({
                        ...draft,
                        discord:e.target.value
                      })
                    }
                  />
                </label>
              </article>

              <div className="mh-dev-actions full">
                <button
                  className="save"
                  onClick={saveHome}
                >
                  حفظ النصوص
                </button>

                <button
                  onClick={resetHome}
                >
                  استعادة الأصل
                </button>
              </div>

            </div>
          )}

          {tab === 'questions' && (
            <div className="mh-bank-admin">

              <div className="mh-bank-toolbar">

                <div className="mh-bank-switch">
                  <button
                    className={
                      bankType === 'letters'
                        ? 'active'
                        : ''
                    }
                    onClick={() => {
                      setBankType('letters')
                      setSelectedQuestion(null)
                    }}
                  >
                    حروف مع محمد
                    <b>
                      {
                        mashhoorQuestionRows(
                          lettersDraft
                        ).length
                      }
                    </b>
                  </button>

                  <button
                    className={
                      bankType === 'fakkerha'
                        ? 'active'
                        : ''
                    }
                    onClick={() => {
                      setBankType('fakkerha')
                      setSelectedQuestion(null)
                    }}
                  >
                    فكّرها
                    <b>
                      {
                        mashhoorQuestionRows(
                          fakkerhaDraft
                        ).length
                      }
                    </b>
                  </button>
                </div>

                <input
                  className="mh-bank-search"
                  value={bankSearch}
                  onChange={event =>
                    setBankSearch(
                      event.target.value
                    )
                  }
                  placeholder="ابحث بالسؤال أو الإجابة..."
                />

                <button
                  className="mh-bank-save-all"
                  onClick={saveBanks}
                >
                  حفظ البنك
                </button>
              </div>

              <div className="mh-bank-layout">

                <div className="mh-bank-list">
                  <div className="mh-bank-list-head">
                    <b>
                      {filteredQuestions.length}
                    </b>
                    <span>
                      سؤال ظاهر
                    </span>
                  </div>

                  {filteredQuestions.map(
                    (item, index) => (
                      <button
                        key={
                          JSON.stringify(
                            item.path
                          ) + index
                        }
                        className={
                          'mh-bank-row ' +
                          (
                            item.disabled
                              ? 'disabled'
                              : ''
                          )
                        }
                        onClick={() =>
                          chooseQuestion(item)
                        }
                      >
                        <span>
                          {item.question}
                        </span>

                        <small>
                          {item.points
                            ? `${item.points} نقطة`
                            : ''}
                          {item.letter
                            ? ` · ${item.letter}`
                            : ''}
                        </small>
                      </button>
                    )
                  )}
                </div>

                <div className="mh-bank-editor">

                  {!selectedQuestion ? (
                    <div className="mh-bank-empty">
                      <div>?</div>
                      <h3>
                        اختر سؤالًا
                      </h3>
                      <p>
                        اختر أي سؤال من القائمة لتعديله.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mh-bank-editor-title">
                        <div>
                          <small>
                            تعديل السؤال
                          </small>
                          <h3>
                            {bankType === 'letters'
                              ? 'حروف مع محمد'
                              : 'فكّرها'}
                          </h3>
                        </div>

                        <button
                          className={
                            selectedQuestion.disabled
                              ? 'enable'
                              : 'disable'
                          }
                          onClick={() =>
                            toggleQuestion(
                              selectedQuestion
                            )
                          }
                        >
                          {selectedQuestion.disabled
                            ? 'تفعيل'
                            : 'تعطيل'}
                        </button>
                      </div>

                      <label>
                        السؤال
                        <textarea
                          className="question"
                          value={
                            questionDraft.question
                          }
                          onChange={event =>
                            setQuestionDraft({
                              ...questionDraft,
                              question:
                                event.target.value
                            })
                          }
                        />
                      </label>

                      <label>
                        الإجابة
                        <textarea
                          value={
                            questionDraft.answer
                          }
                          onChange={event =>
                            setQuestionDraft({
                              ...questionDraft,
                              answer:
                                event.target.value
                            })
                          }
                        />
                      </label>

                      <div className="mh-bank-editor-actions">
                        <button
                          className="save"
                          onClick={saveQuestion}
                        >
                          حفظ السؤال
                        </button>

                        <button
                          onClick={
                            addQuestionBesideSelected
                          }
                        >
                          + إضافة سؤال
                        </button>

                        <button
                          className="danger"
                          onClick={() =>
                            deleteQuestion(
                              selectedQuestion
                            )
                          }
                        >
                          حذف
                        </button>
                      </div>
                    </>
                  )}

                  <button
                    className="mh-bank-restore"
                    onClick={restoreBank}
                  >
                    استعادة البنك الأصلي
                  </button>

                </div>

              </div>
            </div>
          )}

          {tab === 'broadcast' && (
            <div className="mh-broadcast-admin">

              <div className="mh-dev-section-title">
                <small>
                  SCREEN OVERLAY
                </small>
                <h3>
                  رسالة منتصف الشاشة
                </h3>
                <p>
                  معاينة مباشرة للرسالة أثناء اللعب.
                </p>
              </div>

              <label>
                الرسالة
                <textarea
                  value={announcement}
                  onChange={event =>
                    setAnnouncement(
                      event.target.value
                    )
                  }
                  placeholder="اكتب الرسالة..."
                />
              </label>

              <label>
                مدة الظهور
                <div className="mh-duration-control">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={
                      announcementDuration
                    }
                    onChange={event =>
                      setAnnouncementDuration(
                        Number(
                          event.target.value
                        )
                      )
                    }
                  />

                  <b>
                    {announcementDuration}
                    ث
                  </b>
                </div>
              </label>

              <button
                className="mh-send-overlay"
                onClick={() =>
                  mashhoorShowAnnouncement(
                    announcement,
                    announcementDuration
                  )
                }
              >
                إظهار الرسالة
              </button>

            </div>
          )}

          {tab === 'kick' && (
            <div className="mh-kick-admin">

              <div className="mh-kick-state-card">
                <span
                  className={
                    kickLinked
                      ? 'online'
                      : ''
                  }
                />

                <div>
                  <small>KICK CONNECTION</small>

                  <h3>
                    {kickLinked
                      ? 'الحساب مرتبط'
                      : 'الحساب غير مرتبط'}
                  </h3>
                </div>

                <button
                  onClick={connectKick}
                >
                  {kickLinked
                    ? 'فصل الحساب'
                    : 'ربط KICK'}
                </button>
              </div>

              <p className="mh-kick-note">
                إرسال رسائل الشات وقائمة الستريمرز
                المتصلين سيتم ربطها بالـWorker
                حتى تعمل لجميع المستخدمين بشكل آمن.
              </p>

            </div>
          )}

        </div>

      </section>
    </div>
  )
}

