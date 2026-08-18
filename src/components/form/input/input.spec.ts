import { TestBed } from '@angular/core/testing'
import { Input } from './input'

describe('Input', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Input)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should not mark the label as required by default', () => {
    const fixture = TestBed.createComponent(Input)
    fixture.componentRef.setInput('label', 'First name')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.InputLabel')?.textContent).toBe('First name')
    expect(compiled.querySelector('input')?.required).toBe(false)
  })

  it('should mark the label and native input as required when isRequired is true', () => {
    const fixture = TestBed.createComponent(Input)
    fixture.componentRef.setInput('label', 'First name')
    fixture.componentRef.setInput('isRequired', true)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.InputLabel')?.textContent).toBe('First name *')
    expect(compiled.querySelector('input')?.required).toBe(true)
  })

  it('should update the value model and notify the registered onChange callback when typed into', () => {
    const fixture = TestBed.createComponent(Input)
    fixture.detectChanges()
    const onChange = vi.fn()
    fixture.componentInstance.registerOnChange(onChange)

    const input = (fixture.nativeElement as HTMLElement).querySelector('input')!

    input.value = 'Ada'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(fixture.componentInstance.value()).toBe('Ada')
    expect(onChange).toHaveBeenCalledWith('Ada')
  })

  it('should notify the registered onTouched callback on blur', () => {
    const fixture = TestBed.createComponent(Input)
    fixture.detectChanges()
    const onTouched = vi.fn()
    fixture.componentInstance.registerOnTouched(onTouched)

    ;(fixture.nativeElement as HTMLElement).querySelector('input')!.dispatchEvent(new Event('blur'))

    expect(onTouched).toHaveBeenCalled()
  })

  it('should let the form control write a value via writeValue', () => {
    const fixture = TestBed.createComponent(Input)
    fixture.componentInstance.writeValue('Preset')
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.value).toBe('Preset')
  })

  it('should be disabled when the template input or setDisabledState says so', () => {
    const fixture = TestBed.createComponent(Input)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.disabled).toBe(false)

    fixture.componentInstance.setDisabledState(true)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.disabled).toBe(true)
  })
})
