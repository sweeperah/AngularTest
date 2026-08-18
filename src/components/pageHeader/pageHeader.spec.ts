import { TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { PageHeader } from './pageHeader'

describe('PageHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeader],
      providers: [provideRouter([])],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(PageHeader)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the store name linking home and the phrase', () => {
    const fixture = TestBed.createComponent(PageHeader)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    const logo = compiled.querySelector('a.logo')!

    expect(logo.textContent).toContain('Demo Store')
    expect(logo.getAttribute('href')).toBe('/')
    expect(compiled.querySelector('.phrase')?.textContent).toBe('Get your Dreams')
  })
})
