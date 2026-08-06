import { TestBed } from '@angular/core/testing'
import { SearchBox } from './searchBox'

describe('SearchBox', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBox],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchBox)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should seed the input from the search input', () => {
    const fixture = TestBed.createComponent(SearchBox)
    fixture.componentRef.setInput('search', 'lamp')
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.value).toBe('lamp')
  })

  it('should emit searchChange as the user types', () => {
    const fixture = TestBed.createComponent(SearchBox)
    fixture.detectChanges()
    const searchChange = vi.fn()
    fixture.componentInstance.searchChange.subscribe(searchChange)

    const input = (fixture.nativeElement as HTMLElement).querySelector('input')!

    input.value = 'chair'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    expect(searchChange).toHaveBeenCalledWith('chair')
  })

  it('should emit searchSubmit with the current value on submit', () => {
    const fixture = TestBed.createComponent(SearchBox)
    fixture.detectChanges()
    const searchSubmit = vi.fn()
    fixture.componentInstance.searchSubmit.subscribe(searchSubmit)

    const input = (fixture.nativeElement as HTMLElement).querySelector('input')!

    input.value = 'chair'
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
    ;(fixture.nativeElement as HTMLElement).querySelector('form')!.dispatchEvent(new Event('submit'))
    fixture.detectChanges()

    expect(searchSubmit).toHaveBeenCalledWith('chair')
  })
})
