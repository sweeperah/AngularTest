import { Component, input } from '@angular/core'
import { SectionContent } from './sectionContent/sectionContent'
import { SectionTitle } from './sectionTitle/sectionTitle'

@Component({
  selector: 'SectionComp',
  imports: [SectionContent, SectionTitle],
  template: `
    <section class="Section" [style.--gap]="gap()">
      <SectionTitle [title]="title()" [description]="description()" />

      <SectionContent>
        <ng-content />
      </SectionContent>
    </section>
  `,
  styleUrl: './section.scss',
})
export class Section {
  readonly title = input.required<string>()
  readonly description = input<string>()
  readonly gap = input<string>('2')
}
