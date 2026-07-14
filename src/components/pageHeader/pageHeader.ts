import { Component } from '@angular/core'
import { GoogleSymbol } from '../googleSymbol/googleSymbol'
import { CustomLayout } from '../customLayout/customLayout'

@Component({
  selector: 'PageHeader',
  imports: [
    GoogleSymbol, CustomLayout,
  ],
  template: `
    <div class="pageHeader">
      <CustomLayout>
        <ng-container>
          <div class="pageHeaderInner">
            <div class="logo"><GoogleSymbol [name]="('star')" /> Demo Store</div>

            <div class="phrase">Get your Dreams</div>
          </div>
        </ng-container>
      </CustomLayout>
    </div>
  `,
  styleUrl: './pageHeader.scss',
})
export class PageHeader {}
