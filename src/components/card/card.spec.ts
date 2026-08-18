import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Card } from './card'

@Component({
  selector: 'CardHost',
  imports: [Card],
  template: `<Card [name]="name" [gap]="gap" [padding]="padding">Content</Card>`,
})
class CardHost {
  name = ''
  gap = 2
  padding = 2
}

describe('Card', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHost],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(Card)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render projected content', () => {
    const fixture = TestBed.createComponent(CardHost)
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Content')
  })

  it('should apply the name as an additional class and expose gap/padding as CSS custom properties', () => {
    const fixture = TestBed.createComponent(CardHost)
    fixture.componentInstance.name = 'Highlighted'
    fixture.componentInstance.gap = 4
    fixture.componentInstance.padding = 0
    fixture.detectChanges()

    const section = (fixture.nativeElement as HTMLElement).querySelector('section')!

    expect(section.classList).toContain('Highlighted')
    expect(section.style.getPropertyValue('--gap')).toBe('4')
    expect(section.style.getPropertyValue('--padding')).toBe('0')
  })
})
