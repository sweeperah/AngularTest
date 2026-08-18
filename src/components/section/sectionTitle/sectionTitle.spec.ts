import { TestBed } from '@angular/core/testing'
import { SectionTitle } from './sectionTitle'

describe('SectionTitle', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitle],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(SectionTitle)
    fixture.componentRef.setInput('title', 'Featured')
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the title and omit the description when not provided', () => {
    const fixture = TestBed.createComponent(SectionTitle)
    fixture.componentRef.setInput('title', 'Featured')
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.SectionTitleHeading')?.textContent).toBe('Featured')
    expect(compiled.querySelector('.SectionTitleDescription')).toBeNull()
  })

  it('should render the description when provided', () => {
    const fixture = TestBed.createComponent(SectionTitle)
    fixture.componentRef.setInput('title', 'Featured')
    fixture.componentRef.setInput('description', 'Hand-picked for you')
    fixture.detectChanges()

    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.SectionTitleDescription')?.textContent,
    ).toBe('Hand-picked for you')
  })
})
