import { TestBed } from '@angular/core/testing'
import { Section } from './section'

describe('Section', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Section)
    fixture.componentRef.setInput('title', 'Featured products')
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the title, description and projected content', () => {
    const fixture = TestBed.createComponent(Section)
    fixture.componentRef.setInput('title', 'Featured products')
    fixture.componentRef.setInput('description', 'Hand-picked for you')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.SectionTitleHeading')?.textContent).toBe('Featured products')
    expect(compiled.querySelector('.SectionTitleDescription')?.textContent).toBe('Hand-picked for you')
  })

  it('should default the gap to "2" and reflect a custom value', () => {
    const fixture = TestBed.createComponent(Section)
    fixture.componentRef.setInput('title', 'Featured products')
    fixture.detectChanges()
    let section = (fixture.nativeElement as HTMLElement).querySelector('section')! as HTMLElement

    expect(section.style.getPropertyValue('--gap')).toBe('2')

    fixture.componentRef.setInput('gap', '4')
    fixture.detectChanges()
    section = (fixture.nativeElement as HTMLElement).querySelector('section')! as HTMLElement

    expect(section.style.getPropertyValue('--gap')).toBe('4')
  })
})
