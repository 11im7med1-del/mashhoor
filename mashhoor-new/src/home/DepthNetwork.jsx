import { useEffect, useRef } from 'react'

export default function DepthNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    let raf = 0
    let width = 1
    let height = 1
    let last = 0
    let travel = 0

    const reduced = window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .matches

    const pointer = {
      x:.5,
      y:.5,
      tx:.5,
      ty:.5
    }

    const stars = Array.from(
      { length:42 },
      () => ({
        x:Math.random(),
        y:Math.random(),
        z:.2 + Math.random() * .8
      })
    )

    function resize() {
      const r = canvas.getBoundingClientRect()

      width = Math.max(1, r.width)
      height = Math.max(1, r.height)

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      ctx.setTransform(
        dpr, 0, 0, dpr, 0, 0
      )
    }

    function line(
      x1,
      y1,
      x2,
      y2,
      a,
      w,
      c = '154,164,184'
    ) {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)

      ctx.strokeStyle =
        `rgba(${c},${a})`

      ctx.lineWidth = w
      ctx.stroke()
    }

    function draw(
      now = performance.now()
    ) {
      const dt = last
        ? Math.min(
            .035,
            Math.max(
              .001,
              (now - last) / 1000
            )
          )
        : 1 / 60

      last = now

      if (!reduced) {
        travel =
          (travel + dt * .055) % 1
      }

      pointer.x +=
        (pointer.tx - pointer.x) * .035

      pointer.y +=
        (pointer.ty - pointer.y) * .035

      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      const vx =
        width *
        (
          .50 +
          (pointer.x - .5) * .018
        )

      const horizon =
        height *
        (
          .37 +
          (pointer.y - .5) * .010
        )

      const floorBottom =
        height * 1.12

      const glow =
        ctx.createRadialGradient(
          vx,
          horizon,
          0,
          vx,
          horizon,
          Math.max(width, height) * .78
        )

      glow.addColorStop(
        0,
        'rgba(118,102,214,.085)'
      )

      glow.addColorStop(
        .34,
        'rgba(70,126,116,.035)'
      )

      glow.addColorStop(
        1,
        'rgba(0,0,0,0)'
      )

      ctx.fillStyle = glow

      ctx.fillRect(
        0,
        0,
        width,
        height
      )

      const rays =
        width < 760 ? 13 : 20

      for (
        let i = -rays;
        i <= rays;
        i++
      ) {
        const spread = i / rays

        const endX =
          vx +
          spread * width * .88

        const a =
          .105 +
          Math.abs(spread) * .07

        line(
          vx,
          horizon,
          endX,
          floorBottom,
          a,
          .7 + Math.abs(spread) * .35,
          i % 4 === 0
            ? '129,118,219'
            : '139,153,172'
        )
      }

      const bands =
        width < 760 ? 13 : 19

      for (
        let i = 0;
        i < bands;
        i++
      ) {
        const t =
          (i / bands + travel) % 1

        const p =
          Math.pow(t, 2.55)

        const y =
          horizon +
          (floorBottom - horizon) * p

        const half =
          width * (.055 + .79 * p)

        const a =
          .07 + .22 * p

        line(
          vx - half,
          y,
          vx + half,
          y,
          a,
          .48 + p * .58,
          i % 5 === 0
            ? '114,142,136'
            : '153,163,181'
        )
      }

      const sideCount = 7

      for (
        let i = 0;
        i < sideCount;
        i++
      ) {
        const y =
          height * (.06 + i * .115)

        line(
          0,
          y,
          vx,
          horizon,
          .065 + i * .008,
          .6,
          '121,110,207'
        )

        line(
          width,
          y,
          vx,
          horizon,
          .065 + i * .008,
          .6,
          '121,110,207'
        )
      }

      for (
        let i = 1;
        i < 7;
        i++
      ) {
        const x =
          width * (i / 7)

        const bend =
          (x - vx) * .16

        line(
          x,
          0,
          vx + bend,
          horizon,
          .042,
          .5,
          '146,153,171'
        )
      }

      for (const d of stars) {
        if (!reduced) {
          d.y +=
            dt * (.004 + d.z * .007)

          if (d.y > 1.03) {
            d.y = -.03
          }
        }

        const x =
          d.x * width +
          (pointer.x - .5) *
          14 *
          d.z

        const y =
          d.y * height +
          (pointer.y - .5) *
          8 *
          d.z

        ctx.beginPath()

        ctx.arc(
          x,
          y,
          .35 + d.z * .65,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          `rgba(214,217,226,${.035 + d.z * .09})`

        ctx.fill()
      }

      if (!reduced) {
        raf =
          requestAnimationFrame(draw)
      }
    }

    function move(e) {
      pointer.tx =
        Math.max(
          0,
          Math.min(
            1,
            e.clientX /
            Math.max(
              1,
              innerWidth
            )
          )
        )

      pointer.ty =
        Math.max(
          0,
          Math.min(
            1,
            e.clientY /
            Math.max(
              1,
              innerHeight
            )
          )
        )
    }

    resize()
    draw()

    window.addEventListener(
      'resize',
      resize
    )

    window.addEventListener(
      'pointermove',
      move,
      { passive:true }
    )

    return () => {
      cancelAnimationFrame(raf)

      window.removeEventListener(
        'resize',
        resize
      )

      window.removeEventListener(
        'pointermove',
        move
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="depth-network depth-network-v34"
      aria-hidden="true"
    />
  )
}
