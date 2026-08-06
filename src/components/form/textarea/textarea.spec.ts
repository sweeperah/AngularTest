import { TestBed } from '@angular/core/testing'
import { Textarea } from './textarea'

describe('Textarea', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textarea],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Textarea)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should mark the label and native textarea as required when isRequired is true', () => {
    const fixture = TestBed.createComponent(Textarea)
    fixture.componentRef.setInput('label', 'Message')
    fixture.componentRef.setInput('isRequired', true)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.TextareaLabel')?.textContent).toBe('Message *')
    expect(compiled.querySelector('textarea')?.required).toBe(true)
  })

  it('should default rows to 4 and reflect a custom value', () => {
    const fixture = TestBed.createComponent(Textarea)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('textarea')?.rows).toBe(4)

    fixture.componentRef.setInput('rows', 8)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('textarea')?.rows).toBe(8)
  })

  it('should update the value model and notify onChange when typed into', () => {
    const fixture = TestBed.createComponent(Textarea)
    fixture.detectChanges()
    const onChange = vi.fn()
    fixture.componentInstance.registerOnChange(onChange)

    const textarea = (fixture.nativeElement as HTMLElement).querySelector('textarea')!

    textarea.value = 'Hello there'
    textarea.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(fixture.componentInstance.value()).toBe('Hello there')
    expect(onChange).toHaveBeenCalledWith('Hello there')
  })

  it('should let the form control write a value via writeValue', () => {
    const fixture = TestBed.createComponent(Textarea)
    fixture.componentInstance.writeValue('Preset message')
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('textarea')?.value).toBe('Preset message')
  })

  it('should be disabled when the template input or setDisabledState says so', () => {
    const fixture = TestBed.createComponent(Textarea)
    fixture.detectChanges()

    fixture.componentInstance.setDisabledState(true)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('textarea')?.disabled).toBe(true)
  })
})
