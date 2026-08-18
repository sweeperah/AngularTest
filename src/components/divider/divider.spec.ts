import { TestBed } from '@angular/core/testing'
import { Divider } from './divider'

describe('Divider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Divider],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Divider)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render as a horizontal separator by default', () => {
    const fixture = TestBed.createComponent(Divider)
    fixture.detectChanges()
    const divider = (fixture.nativeElement as HTMLElement).querySelector('.Divider')!

    expect(divider.classList).not.toContain('Divider--vertical')
    expect(divider.getAttribute('role')).toBe('separator')
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal')
  })

  it('should render as a vertical separator when isVertical is true', () => {
    const fixture = TestBed.createComponent(Divider)
    fixture.componentRef.setInput('isVertical', true)
    fixture.detectChanges()
    const divider = (fixture.nativeElement as HTMLElement).querySelector('.Divider')!

    expect(divider.classList).toContain('Divider--vertical')
    expect(divider.getAttribute('aria-orientation')).toBe('vertical')
  })
})
