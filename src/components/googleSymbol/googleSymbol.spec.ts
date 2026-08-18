import { TestBed } from '@angular/core/testing'
import { GoogleSymbol } from './googleSymbol'

describe('GoogleSymbol', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSymbol],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(GoogleSymbol)
    fixture.componentRef.setInput('name', 'home')
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the icon name and default size/weight in the font variation settings', () => {
    const fixture = TestBed.createComponent(GoogleSymbol)
    fixture.componentRef.setInput('name', 'home')
    fixture.detectChanges()
    const div = (fixture.nativeElement as HTMLElement).querySelector('.GoogleSymbol')! as HTMLElement

    expect(div.textContent?.trim()).toBe('home')
    expect(div.style.fontSize).toBe('24px')
    expect(div.style.getPropertyValue('font-variation-settings')).toContain("'FILL' 0")
    expect(div.style.getPropertyValue('font-variation-settings')).toContain("'wght' 400")
  })

  it('should be hidden from assistive tech without a label, and exposed as an image with one', () => {
    const fixture = TestBed.createComponent(GoogleSymbol)
    fixture.componentRef.setInput('name', 'home')
    fixture.detectChanges()
    let div = (fixture.nativeElement as HTMLElement).querySelector('.GoogleSymbol')!

    expect(div.getAttribute('aria-hidden')).toBe('true')
    expect(div.getAttribute('role')).toBeNull()

    fixture.componentRef.setInput('label', 'Home')
    fixture.detectChanges()
    div = (fixture.nativeElement as HTMLElement).querySelector('.GoogleSymbol')!

    expect(div.getAttribute('aria-hidden')).toBeNull()
    expect(div.getAttribute('role')).toBe('img')
    expect(div.getAttribute('aria-label')).toBe('Home')
  })

  it('should reflect fill in the font variation settings', () => {
    const fixture = TestBed.createComponent(GoogleSymbol)
    fixture.componentRef.setInput('name', 'favorite')
    fixture.componentRef.setInput('fill', true)
    fixture.detectChanges()
    const div = (fixture.nativeElement as HTMLElement).querySelector('.GoogleSymbol')! as HTMLElement

    expect(div.style.getPropertyValue('font-variation-settings')).toContain("'FILL' 1")
  })
})
