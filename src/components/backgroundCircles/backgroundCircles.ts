import { afterNextRender, Component, DestroyRef, ElementRef, inject, NgZone, viewChildren } from '@angular/core'
import { DOCUMENT } from '@angular/common'

interface Circle {
  size: number
  top: number
  left: number
  color: string
  opacity: number
  ampX: number
  ampY: number
  freqX: number
  freqY: number
  phaseX: number
  phaseY: number
}

interface CircleMotion {
  dx: number
  dy: number
  vx: number
  vy: number
}

interface Point {
  x: number
  y: number
}

function createCircles(count: number): Circle[] {
  return Array.from({ length: count }, () => ({
    size: Math.round(40 + Math.random() * 160),
    top: Math.round(Math.random() * 100),
    left: Math.round(Math.random() * 100),
    color: `hsl(${Math.round(Math.random() * 360)}, 80%, 70%)`,
    opacity: Math.round((0.15 + Math.random() * 0.35) * 100) / 100,
    ampX: 10 + Math.random() * 15,
    ampY: 10 + Math.random() * 15,
    freqX: 0.15 + Math.random() * 0.2,
    freqY: 0.15 + Math.random() * 0.2,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
  }))
}

const STIFFNESS = 60
const DAMPING = 14
const REPEL_RADIUS = 140
const MAX_REPEL_FORCE = 9000

@Component({
  selector: 'BackgroundCircles',
  imports: [],
  template: `
    <div class="BackgroundCircles" aria-hidden="true">
      @for (circle of circles; track $index) {
        <span
          #circleEl
          class="BackgroundCirclesItem"
          [style.width.px]="circle.size"
          [style.height.px]="circle.size"
          [style.top.%]="circle.top"
          [style.left.%]="circle.left"
          [style.background]="circle.color"
          [style.opacity]="circle.opacity"
        ></span>
      }
    </div>
  `,
  styleUrl: './backgroundCircles.scss',
})
export class BackgroundCircles {
  protected readonly circles = createCircles(30)

  private readonly circleEls = viewChildren<ElementRef<HTMLSpanElement>>('circleEl')
  private readonly document = inject(DOCUMENT)
  private readonly ngZone = inject(NgZone)
  private readonly destroyRef = inject(DestroyRef)

  private readonly motion: CircleMotion[] = this.circles.map(circle => ({
    dx: circle.ampX * Math.sin(circle.phaseX),
    dy: circle.ampY * Math.sin(circle.phaseY),
    vx: 0,
    vy: 0,
  }))

  private mouse: Point | null = null
  private rafId = 0
  private lastTime = 0

  constructor() {
    afterNextRender(() => this.setup())
  }

  private setup(): void {
    const elements = this.circleEls().map(ref => ref.nativeElement)
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (!media) {
      return
    }

    const onMouseMove = (event: MouseEvent): void => {
      this.mouse = { x: event.clientX, y: event.clientY }
    }

    const loop = (time: number): void => {
      this.step(time, elements)
      this.rafId = requestAnimationFrame(loop)
    }

    const startLoop = (): void => {
      if (this.rafId) {
        return
      }
      this.lastTime = 0
      this.document.addEventListener('mousemove', onMouseMove, { passive: true })
      this.rafId = requestAnimationFrame(loop)
    }

    const stopLoop = (): void => {
      cancelAnimationFrame(this.rafId)
      this.rafId = 0
      this.mouse = null
      this.document.removeEventListener('mousemove', onMouseMove)
    }

    this.ngZone.runOutsideAngular(() => {
      if (!media.matches) {
        startLoop()
      }

      const onMediaChange = (event: MediaQueryListEvent): void => (event.matches ? stopLoop() : startLoop())
      media.addEventListener('change', onMediaChange)

      this.destroyRef.onDestroy(() => {
        stopLoop()
        media.removeEventListener('change', onMediaChange)
      })
    })
  }

  private step(time: number, elements: HTMLElement[]): void {
    const dt = this.lastTime ? Math.min((time - this.lastTime) / 1000, 1 / 30) : 1 / 60
    this.lastTime = time

    const width = window.innerWidth
    const height = window.innerHeight

    this.circles.forEach((circle, i) => {
      const state = this.motion[i]
      const element = elements[i]

      const idleX = circle.ampX * Math.sin((time / 1000) * circle.freqX + circle.phaseX)
      const idleY = circle.ampY * Math.sin((time / 1000) * circle.freqY + circle.phaseY)

      const baseX = (circle.left / 100) * width
      const baseY = (circle.top / 100) * height
      const curX = baseX + state.dx
      const curY = baseY + state.dy

      let repelX = 0
      let repelY = 0
      if (this.mouse) {
        const distX = curX - this.mouse.x
        const distY = curY - this.mouse.y
        const dist = Math.hypot(distX, distY)
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const falloff = (1 - dist / REPEL_RADIUS) ** 2
          const force = MAX_REPEL_FORCE * falloff
          repelX = (distX / dist) * force
          repelY = (distY / dist) * force
        }
      }

      const ax = -STIFFNESS * (state.dx - idleX) - DAMPING * state.vx + repelX
      const ay = -STIFFNESS * (state.dy - idleY) - DAMPING * state.vy + repelY
      state.vx += ax * dt
      state.vy += ay * dt
      state.dx += state.vx * dt
      state.dy += state.vy * dt

      element.style.transform = `translate(-50%, -50%) translate(${state.dx}px, ${state.dy}px)`
    })
  }
}
