import { Component, input } from '@angular/core'

@Component({
  selector: 'SectionTitle',
  imports: [],
  template: `
    <div class="SectionTitle">
      <h2 class="SectionTitleHeading">{{ title() }}</h2>

      @if (description(); as description) {
        <p class="SectionTitleDescription">{{ description }}</p>
      }
    </div>
  `,
  styleUrl: './sectionTitle.scss',
})
export class SectionTitle {
  readonly title = input.required<string>()
  readonly description = input<string>()
}
