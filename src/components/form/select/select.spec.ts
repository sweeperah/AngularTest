import { TestBed } from '@angular/core/testing'
import { Select } from './select'

const options = [
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
]

describe('Select', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Select)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render an option per entry plus an optional placeholder', () => {
    const fixture = TestBed.createComponent(Select)
    fixture.componentRef.setInput('label', 'Country')
    fixture.componentRef.setInput('placeholder', 'Select a country')
    fixture.componentRef.setInput('options', options)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.SelectLabel')?.textContent).toBe('Country')
    expect(compiled.querySelectorAll('option').length).toBe(3)
  })

  it('should mark the label and select as required when isRequired is true', () => {
    const fixture = TestBed.createComponent(Select)
    fixture.componentRef.setInput('label', 'Country')
    fixture.componentRef.setInput('isRequired', true)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.SelectLabel')?.textContent).toBe('Country *')
    expect(compiled.querySelector('select')?.required).toBe(true)
  })

  it('should update the value model and notify onChange when a new option is selected', () => {
    const fixture = TestBed.createComponent(Select)
    fixture.componentRef.setInput('options', options)
    fixture.detectChanges()
    const onChange = vi.fn()
    fixture.componentInstance.registerOnChange(onChange)

    const select = (fixture.nativeElement as HTMLElement).querySelector('select')!

    select.value = 'fr'
    select.dispatchEvent(new Event('change'))
    fixture.detectChanges()

    expect(fixture.componentInstance.value()).toBe('fr')
    expect(onChange).toHaveBeenCalledWith('fr')
  })

  it('should disable the select when the template input or setDisabledState says so', () => {
    const fixture = TestBed.createComponent(Select)
    fixture.componentRef.setInput('options', options)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('select')?.disabled).toBe(false)

    fixture.componentInstance.setDisabledState(true)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('select')?.disabled).toBe(true)
  })
})
