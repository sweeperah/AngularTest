import { TestBed } from '@angular/core/testing'
import { PageFooter } from './pageFooter'

describe('PageFooter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFooter],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(PageFooter)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the store name and legal links', () => {
    const fixture = TestBed.createComponent(PageFooter)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    const linkTexts = [...compiled.querySelectorAll('.links a')].map(a => a.textContent)

    expect(compiled.querySelector('.logo')?.textContent).toContain('Demo Store')
    expect(linkTexts).toEqual(['Impressum', 'Legal'])
  })
})
