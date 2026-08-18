import { TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { ErrorState } from './errorState'

describe('ErrorState', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorState],
      providers: [provideRouter([])],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(ErrorState)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should show the default "notFound" copy', () => {
    const fixture = TestBed.createComponent(ErrorState)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.ErrorStateTitle')?.textContent).toBe('Page not found')
    expect(compiled.querySelector('.ErrorStateDescription')?.textContent).toContain("doesn't exist")
  })

  it('should show the "productNotFound" copy for that variant', () => {
    const fixture = TestBed.createComponent(ErrorState)
    fixture.componentRef.setInput('variant', 'productNotFound')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.ErrorStateTitle')?.textContent).toBe('Product not found')
  })

  it('should let title/description be overridden', () => {
    const fixture = TestBed.createComponent(ErrorState)
    fixture.componentRef.setInput('title', 'Custom title')
    fixture.componentRef.setInput('description', 'Custom description')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.ErrorStateTitle')?.textContent).toBe('Custom title')
    expect(compiled.querySelector('.ErrorStateDescription')?.textContent).toBe('Custom description')
  })

  it('should only render an action link when actionLabel is set', () => {
    const fixture = TestBed.createComponent(ErrorState)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('.ErrorStateAction')).toBeNull()

    fixture.componentRef.setInput('actionLabel', 'Back to shop')
    fixture.componentRef.setInput('actionLink', '/')
    fixture.detectChanges()
    const action = (fixture.nativeElement as HTMLElement).querySelector('.ErrorStateAction')!

    expect(action.textContent).toBe('Back to shop')
    expect(action.getAttribute('href')).toBe('/')
  })
})
