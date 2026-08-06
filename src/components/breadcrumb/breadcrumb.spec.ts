import { TestBed } from '@angular/core/testing'
import { provideRouter, Router } from '@angular/router'
import { routes } from '../../app/app.routes'
import { Breadcrumb } from './breadcrumb'

describe('Breadcrumb', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumb],
      providers: [provideRouter(routes)],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Breadcrumb)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should not render a nav when there is only the Home crumb', () => {
    const fixture = TestBed.createComponent(Breadcrumb)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('nav')).toBeNull()
  })

  it('should render Home and the dash-case-converted product name after navigating to a product page', async () => {
    const router = TestBed.inject(Router)
    await router.navigateByUrl('/product/aurora-lounge-chair')

    const fixture = TestBed.createComponent(Breadcrumb)
    fixture.detectChanges()

    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('li')

    expect(items.length).toBe(2)
    expect(items[0].textContent).toContain('Home')
    expect(items[1].textContent).toContain('Aurora Lounge Chair')
    expect(items[1].querySelector('[aria-current="page"]')).not.toBeNull()
  })
})
