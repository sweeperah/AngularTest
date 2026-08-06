import { TestBed } from '@angular/core/testing'
import { RadioGroup } from './radioGroup'

const options = [
  { label: 'Standard', value: 'standard' },
  { label: 'Express', value: 'express' },
]

describe('RadioGroup', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroup],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(RadioGroup)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render an option per entry and check the one matching the value', () => {
    const fixture = TestBed.createComponent(RadioGroup)
    fixture.componentRef.setInput('label', 'Shipping')
    fixture.componentRef.setInput('options', options)
    fixture.componentRef.setInput('value', 'express')
    fixture.detectChanges()
    const inputs = [...(fixture.nativeElement as HTMLElement).querySelectorAll('input[type="radio"]')] as HTMLInputElement[]

    expect(inputs.length).toBe(2)
    expect(inputs.find(i => i.value === 'express')?.checked).toBe(true)
    expect(inputs.find(i => i.value === 'standard')?.checked).toBe(false)
  })

  it('should update the value model and notify onChange when an option is picked', () => {
    const fixture = TestBed.createComponent(RadioGroup)
    fixture.componentRef.setInput('options', options)
    fixture.detectChanges()
    const onChange = vi.fn()
    fixture.componentInstance.registerOnChange(onChange)

    const inputs = [...(fixture.nativeElement as HTMLElement).querySelectorAll('input[type="radio"]')] as HTMLInputElement[]
    const expressInput = inputs.find(i => i.value === 'express')!

    expressInput.checked = true
    expressInput.dispatchEvent(new Event('change'))
    fixture.detectChanges()

    expect(fixture.componentInstance.value()).toBe('express')
    expect(onChange).toHaveBeenCalledWith('express')
  })

  it('should let the form control write a value via writeValue', () => {
    const fixture = TestBed.createComponent(RadioGroup)
    fixture.componentRef.setInput('options', options)
    fixture.componentInstance.writeValue('standard')
    fixture.detectChanges()

    const inputs = [...(fixture.nativeElement as HTMLElement).querySelectorAll('input[type="radio"]')] as HTMLInputElement[]

    expect(inputs.find(i => i.value === 'standard')?.checked).toBe(true)
  })

  it('should disable the fieldset when the template input or setDisabledState says so', () => {
    const fixture = TestBed.createComponent(RadioGroup)
    fixture.componentRef.setInput('options', options)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('fieldset')?.disabled).toBe(false)

    fixture.componentInstance.setDisabledState(true)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('fieldset')?.disabled).toBe(true)
  })
})
