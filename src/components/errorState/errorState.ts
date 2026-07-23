import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'

export type errorStates = ['productNotFound', 'notFound']
export type ErrorStateVariant = errorStates[number]

interface ErrorStateCopy {
  title: string
  description: string
}

const DEFAULT_COPY: Record<ErrorStateVariant, ErrorStateCopy> = {
  productNotFound: {
    title: 'Product not found',
    description:
      "We looked everywhere but couldn't find that product. It may have been removed or the link is incorrect.",
  },
  notFound: {
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has moved somewhere else.",
  },
}

@Component({
  selector: 'ErrorState',
  imports: [RouterLink],
  template: `
    <div class="ErrorState">
      <div class="ErrorStateArt" aria-hidden="true">
        @switch (variant()) {
          @case ('productNotFound') {
            <svg viewBox="0 0 240 200" class="ErrorStateSvg" focusable="false">
              <defs>
                <linearGradient id="errorStateBoxGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8a8a8a" />

                  <stop offset="100%" stop-color="#4a4a4a" />
                </linearGradient>

                <linearGradient id="errorStateLensGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#f4e2b8" />

                  <stop offset="100%" stop-color="#c8af55" />
                </linearGradient>
              </defs>

              <ellipse cx="112" cy="176" rx="70" ry="8" fill="#000000" opacity="0.08" />

              <circle class="ErrorStateFloat ErrorStateFloatSlow" cx="30" cy="46" r="6" fill="#e78a8a" opacity="0.7" />

              <circle class="ErrorStateFloat" cx="206" cy="150" r="8" fill="#7ec9c1" opacity="0.6" />

              <circle class="ErrorStateFloat ErrorStateFloatSlow" cx="196" cy="34" r="5" fill="#c8af55" opacity="0.8" />

              <path d="M52 108 L70 78 L130 78 L148 108 Z" fill="#8a8a8a" />

              <path d="M52 108 L70 78 L70 94 L52 118 Z" fill="#6f6f6f" />

              <path d="M148 108 L130 78 L130 94 L148 118 Z" fill="#6f6f6f" />

              <rect x="52" y="108" width="96" height="62" rx="6" fill="url(#errorStateBoxGradient)" />

              <rect x="52" y="108" width="96" height="14" rx="6" fill="#5a5a5a" />

              <text
                x="100"
                y="154"
                text-anchor="middle"
                font-size="28"
                font-weight="700"
                fill="#e5e5e5"
                font-family="'Playfair Display', serif"
              >
                ?
              </text>

              <g class="ErrorStateFloat">
                <line x1="176" y1="98" x2="196" y2="118" stroke="#4a4a4a" stroke-width="8" stroke-linecap="round" />

                <circle
                  cx="158"
                  cy="80"
                  r="28"
                  fill="url(#errorStateLensGradient)"
                  opacity="0.35"
                  stroke="#c8af55"
                  stroke-width="6"
                />
              </g>
            </svg>
          }
          @default {
            <svg viewBox="0 0 240 200" class="ErrorStateSvg" focusable="false">
              <defs>
                <linearGradient id="errorStateCompassGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#f4e2b8" />

                  <stop offset="100%" stop-color="#c8af55" />
                </linearGradient>
              </defs>

              <ellipse cx="120" cy="176" rx="60" ry="7" fill="#000000" opacity="0.08" />

              <circle class="ErrorStateFloat ErrorStateFloatSlow" cx="26" cy="150" r="7" fill="#7ec9c1" opacity="0.6" />

              <circle class="ErrorStateFloat" cx="212" cy="52" r="6" fill="#e78a8a" opacity="0.7" />

              <circle
                class="ErrorStateFloat ErrorStateFloatSlow"
                cx="202"
                cy="158"
                r="5"
                fill="#c8af55"
                opacity="0.8"
              />

              <text
                x="120"
                y="130"
                text-anchor="middle"
                font-size="88"
                font-weight="700"
                fill="#e5e5e5"
                font-family="'Playfair Display', serif"
              >
                404
              </text>

              <g class="ErrorStateCompass">
                <circle
                  cx="120"
                  cy="92"
                  r="34"
                  fill="url(#errorStateCompassGradient)"
                  opacity="0.9"
                  stroke="#4a4a4a"
                  stroke-width="3"
                />

                <path d="M120 70 L128 92 L120 114 L112 92 Z" fill="#4a4a4a" />

                <circle cx="120" cy="92" r="4" fill="#f4e2b8" />
              </g>
            </svg>
          }
        }
      </div>

      <h1 class="ErrorStateTitle">{{ resolvedTitle() }}</h1>

      <p class="ErrorStateDescription">{{ resolvedDescription() }}</p>

      @if (actionLabel(); as actionLabel) {
        <div class="ErrorStateActions">
          <a class="ErrorStateAction" [routerLink]="actionLink()">{{ actionLabel }}</a>
        </div>
      }
    </div>
  `,
  styleUrl: './errorState.scss',
})
export class ErrorState {
  readonly variant = input<ErrorStateVariant>('notFound')
  readonly title = input<string>()
  readonly description = input<string>()
  readonly actionLabel = input<string>()
  readonly actionLink = input('/')

  protected readonly resolvedTitle = computed(() => this.title() ?? DEFAULT_COPY[this.variant()].title)
  protected readonly resolvedDescription = computed(
    () => this.description() ?? DEFAULT_COPY[this.variant()].description,
  )
}
