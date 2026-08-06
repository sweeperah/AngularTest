import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { SectionContent } from './sectionContent'

@Component({
  selector: 'SectionContentHost',
  imports: [SectionContent],
  template: `<SectionContent>Content</SectionContent>`,
})
class SectionContentHost {}

describe('SectionContent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionContentHost],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(SectionContent)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render projected content', () => {
    const fixture = TestBed.createComponent(SectionContentHost)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('.SectionContent')?.textContent).toBe('Content')
  })
})
