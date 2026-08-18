import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

const API =
  'https://mashhoor-secure.11im7med1.workers.dev'

function parseNames(text, max) {
  const seen = new Set()

  return String(text || '')
    .split(/[\n,،]+/)
    .map(name => name.trim())
    .filter(Boolean)
    .filter(name => {
      const key = name.toLowerCase()

      if (seen.has(key)) return false

      seen.add(key)
      return true
    })
    .slice(0, max)
}

function isJoinCommand(raw) {
  const message =
    String(raw || '').trim().toLowerCase()

  return (
    message === '!دخول' ||
    message === 'دخول' ||
    message === '!join'
  )
}

export default function useKickChatPlayers({
  max = 30,
  locked = false
} = {}) {
  const [namesText, setNamesText] = useState('')
  const [joiningOpen, setJoiningOpen] = useState(true)

  const [kickStatus, setKickStatus] =
    useState('checking')

  const [lastJoin, setLastJoin] = useState('')
  const [connectionTick, setConnectionTick] =
    useState(0)

  const players = useMemo(
    () => parseNames(namesText, max),
    [namesText, max]
  )

  const addPlayer = useCallback(
    rawName => {
      if (locked || !joiningOpen) return false

      const name =
        String(rawName || '').trim().slice(0, 24)

      if (name.length < 2) return false

      let added = false

      setNamesText(current => {
        const list = parseNames(current, max)

        if (
          list.some(
            player =>
              player.toLowerCase() ===
              name.toLowerCase()
          )
        ) {
          return current
        }

        if (list.length >= max) return current

        added = true

        return [...list, name].join('\n')
      })

      if (added) {
        setLastJoin(name)
      }

      return added
    },
    [joiningOpen, locked, max]
  )

  const removePlayer = useCallback(
    name => {
      if (locked) return

      setNamesText(current =>
        parseNames(current, max)
          .filter(
            player =>
              player.toLowerCase() !==
              String(name).toLowerCase()
          )
          .join('\n')
      )
    },
    [locked, max]
  )

  const clearPlayers = useCallback(() => {
    if (locked) return
    setNamesText('')
  }, [locked])

  useEffect(() => {
    function receiveMessage(event) {
      const detail = event?.detail || {}

      const sender =
        detail.sender ??
        detail.senderName ??
        detail.name ??
        ''

      const message =
        detail.content ??
        detail.message ??
        detail.text ??
        ''

      if (isJoinCommand(message)) {
        addPlayer(sender)
      }
    }

    window.addEventListener(
      'mashhoor-chat-message',
      receiveMessage
    )

    return () => {
      window.removeEventListener(
        'mashhoor-chat-message',
        receiveMessage
      )
    }
  }, [addPlayer])

  useEffect(() => {
    const session =
      window.localStorage.getItem(
        'mashhoor_kick_session'
      )

    if (!session) {
      setKickStatus('disconnected')
      return
    }

    let stopped = false
    let last = Date.now() - 2200

    setKickStatus('connecting')

    async function pullChat() {
      if (stopped) return

      try {
        const response = await fetch(
          `${API}/api/kick/chat?after=${last}`,
          {
            headers: {
              Authorization:`Bearer ${session}`
            },
            cache:'no-store'
          }
        )

        if (!response.ok) {
          setKickStatus('error')
          return
        }

        const data = await response.json()

        setKickStatus('connected')

        for (const item of data.messages || []) {
          last = Math.max(
            last,
            Number(item.at) || Date.now()
          )

          const content =
            String(item.content || '').trim()

          window.dispatchEvent(
            new CustomEvent(
              'mashhoor-chat-message',
              {
                detail:{
                  sender:item.sender,
                  senderName:item.sender,
                  content,
                  message:content,
                  text:content,
                  platform:'kick',
                  at:item.at
                }
              }
            )
          )
        }
      } catch {
        setKickStatus('error')
      }
    }

    pullChat()

    const timer =
      window.setInterval(pullChat, 1800)

    return () => {
      stopped = true
      window.clearInterval(timer)
    }
  }, [connectionTick])

  function refreshConnection() {
    setConnectionTick(value => value + 1)
  }

  return {
    players,
    namesText,
    setNamesText,
    joiningOpen,
    setJoiningOpen,
    kickStatus,
    lastJoin,
    addPlayer,
    removePlayer,
    clearPlayers,
    refreshConnection,
    locked,
    max
  }
}
