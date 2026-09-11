import { TestBed } from '@angular/core/testing'
import { MatInput } from './matInput'

describe('MatInput', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatInput],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(MatInput)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the label', () => {
    const fixture = TestBed.createComponent(MatInput)
    fixture.componentRef.setInput('label', 'First name')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('mat-label')?.textContent).toBe('First name')
  })

  it('should mark the native input as required when isRequired is true', () => {
    const fixture = TestBed.createComponent(MatInput)
    fixture.componentRef.setInput('isRequired', true)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('input')?.required).toBe(true)
  })

  it('should update the value model and notify the registered onChange callback when typed into', () => {
    const fixture = TestBed.createComponent(MatInput)
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
    const fixture = TestBed.createComponent(MatInput)
    fixture.detectChanges()
    const onTouched = vi.fn()
    fixture.componentInstance.registerOnTouched(onTouched)

    ;(fixture.nativeElement as HTMLElement).querySelector('input')!.dispatchEvent(new Event('blur'))

    expect(onTouched).toHaveBeenCalled()
  })

  it('should let the form control write a value via writeValue', () => {
    const fixture = TestBed.createComponent(MatInput)
    fixture.componentInstance.writeValue('Preset')
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.value).toBe('Preset')
  })

  it('should be disabled when the template input or setDisabledState says so', () => {
    const fixture = TestBed.createComponent(MatInput)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.disabled).toBe(false)

    fixture.componentInstance.setDisabledState(true)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.disabled).toBe(true)
  })

  it('should render an error message when error is set', () => {
    const fixture = TestBed.createComponent(MatInput)
    fixture.componentRef.setInput('error', 'Please enter a valid email address.')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('mat-error')?.textContent).toBe('Please enter a valid email address.')
  })
})
