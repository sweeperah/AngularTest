import { TestBed } from '@angular/core/testing'
import { BackgroundCircles } from './backgroundCircles'

describe('BackgroundCircles', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundCircles],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(BackgroundCircles)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render 30 decorative, non-interactive circles', () => {
    const fixture = TestBed.createComponent(BackgroundCircles)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.BackgroundCircles')?.getAttribute('aria-hidden')).toBe('true')
    expect(compiled.querySelectorAll('.BackgroundCirclesItem').length).toBe(30)
  })
})
