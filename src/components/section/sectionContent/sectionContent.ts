import { Component } from '@angular/core'

@Component({
  selector: 'SectionContent',
  imports: [],
  template: `
    <div class="SectionContent">
      <ng-content />
    </div>
  `,
  styleUrl: './sectionContent.scss',
})
export class SectionContent {}
