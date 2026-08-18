import { TestBed } from '@angular/core/testing'
import { Button } from './button'

describe('Button', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Button)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should default to a primary, non-disabled button type="button"', () => {
    const fixture = TestBed.createComponent(Button)
    fixture.detectChanges()
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!

    expect(button.classList).toContain('primary')
    expect(button.type).toBe('button')
    expect(button.disabled).toBe(false)
  })

  it('should reflect the variant and type inputs', () => {
    const fixture = TestBed.createComponent(Button)
    fixture.componentRef.setInput('variant', 'icon')
    fixture.componentRef.setInput('type', 'submit')
    fixture.detectChanges()
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!

    expect(button.classList).toContain('icon')
    expect(button.type).toBe('submit')
  })

  it('should disable the native button when disabled is true', () => {
    const fixture = TestBed.createComponent(Button)
    fixture.componentRef.setInput('disabled', true)
    fixture.detectChanges()
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!

    expect(button.disabled).toBe(true)
  })
})
