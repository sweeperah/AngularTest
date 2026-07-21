import { Component, effect, input, output, signal } from '@angular/core'
import { GoogleSymbol } from '../../googleSymbol/googleSymbol'
import { Button } from '../../button/button'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'SearchBox',
  imports: [
    GoogleSymbol, Button, FormsModule,
  ],
  template: `
    <form class="SearchBox" (ngSubmit)="onSubmit()">
      <input
        type="text"
        name="search"
        placeholder="Filter Products"
        [value]="currentSearch()"
        (input)="onInput($event)"
      />

      <ButtonComp [variant]="('icon')" [type]="('submit')"><GoogleSymbol [name]="('search')" [size]="(16)"/></ButtonComp>
    </form>
  `,
  styleUrl: './searchBox.scss',
})
export class SearchBox {
  readonly search = input('')
  protected readonly currentSearch = signal('')

  readonly searchChange = output<string>()
  readonly searchSubmit = output<string>()

  constructor() {
    effect(() => {
      this.currentSearch.set(this.search())
    })
  }

  protected onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value

    this.currentSearch.set(newValue)
    this.searchChange.emit(newValue)
  }

  protected onSubmit() {
    this.searchSubmit.emit(this.currentSearch())
  }
}
