import { TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { CustomLayout } from './customLayout'

@Component({
  selector: 'CustomLayoutHost',
  imports: [CustomLayout],
  template: `<CustomLayout [maxWidth]="maxWidth">Content</CustomLayout>`,
})
class CustomLayoutHost {
  maxWidth = 1900
}

describe('CustomLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLayoutHost],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(CustomLayout)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render projected content and default max width', () => {
    const fixture = TestBed.createComponent(CustomLayoutHost)
    fixture.detectChanges()
    const layout = (fixture.nativeElement as HTMLElement).querySelector('.CustomLayout')! as HTMLElement

    expect(layout.textContent).toContain('Content')
    expect(layout.style.getPropertyValue('--max-width')).toBe('1900px')
  })

  it('should reflect a custom maxWidth', () => {
    const fixture = TestBed.createComponent(CustomLayoutHost)
    fixture.componentInstance.maxWidth = 1200
    fixture.detectChanges()
    const layout = (fixture.nativeElement as HTMLElement).querySelector('.CustomLayout')! as HTMLElement

    expect(layout.style.getPropertyValue('--max-width')).toBe('1200px')
  })
})
