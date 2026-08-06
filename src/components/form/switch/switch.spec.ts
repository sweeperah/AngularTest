import { TestBed } from '@angular/core/testing'
import { Switch } from './switch'

describe('Switch', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Switch],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Switch)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render unchecked by default and reflect the checked input', () => {
    const fixture = TestBed.createComponent(Switch)
    fixture.componentRef.setInput('label', 'Enable notifications')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.SwitchLabel')?.textContent).toBe('Enable notifications')
    expect(compiled.querySelector('input')?.checked).toBe(false)

    fixture.componentRef.setInput('checked', true)
    fixture.detectChanges()

    expect(compiled.querySelector('input')?.checked).toBe(true)
  })

  it('should update the checked model and notify onChange when toggled', () => {
    const fixture = TestBed.createComponent(Switch)
    fixture.detectChanges()
    const onChange = vi.fn()
    fixture.componentInstance.registerOnChange(onChange)

    const input = (fixture.nativeElement as HTMLElement).querySelector('input')!

    input.checked = true
    input.dispatchEvent(new Event('change'))
    fixture.detectChanges()

    expect(fixture.componentInstance.checked()).toBe(true)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('should let the form control write a value via writeValue', () => {
    const fixture = TestBed.createComponent(Switch)
    fixture.componentInstance.writeValue(true)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.checked).toBe(true)
  })

  it('should be disabled when the template input or setDisabledState says so', () => {
    const fixture = TestBed.createComponent(Switch)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.disabled).toBe(false)

    fixture.componentInstance.setDisabledState(true)
    fixture.detectChanges()

    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('input')?.disabled).toBe(true)
    expect(compiled.querySelector('.Switch')?.classList).toContain('disabled')
  })
})
