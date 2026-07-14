import { Component, computed, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, RouterLink } from '@angular/router'
import { filter, map, startWith } from 'rxjs'
import { products } from '../productGrid/productGrid.data'

interface Crumb {
  label: string
  path: string
}

@Component({
  selector: 'Breadcrumb',
  imports: [RouterLink],
  template: `
    @if (crumbs().length > 1) {
      <nav class="Breadcrumb" aria-label="Breadcrumb">
        <ol>
          @for (crumb of crumbs(); track crumb.path; let last = $last) {
            <li>
              @if (last) {
                <span aria-current="page">{{ crumb.label }}</span>
              } @else {
                <a [routerLink]="crumb.path">{{ crumb.label }}</a>
              }
            </li>
          }
        </ol>
      </nav>
    }
  `,
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  private readonly router = inject(Router)

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  )

  protected readonly crumbs = computed<Crumb[]>(() => {
    const segments = this.url()
      .split('/')
      .filter(segment => segment.length > 0)

    const trail: Crumb[] = [{ label: 'Home', path: '/' }]
    let path = ''

    for (const segment of segments) {
      path += `/${segment}`

      if (segment === 'product') {
        continue
      }

      const product = products.find(p => p.id === segment)
      trail.push({ label: product ? product.name : segment, path })
    }

    return trail
  })
}
