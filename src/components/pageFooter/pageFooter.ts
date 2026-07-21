import { Component } from '@angular/core'
import { GoogleSymbol } from '../googleSymbol/googleSymbol'
import { CustomLayout } from '../customLayout/customLayout'

@Component({
  selector: 'PageFooter',
  imports: [
    GoogleSymbol, CustomLayout,
  ],
  template: `
    <div class="pageFooter">
      <CustomLayout>
        <ng-container>
          <div class="pageFooterInner">
            <div class="logo"><GoogleSymbol [name]="('star')" /> Demo Store</div>

            <div class="links">
              <a>Impressum</a>

              <a>Legal</a>
            </div>
          </div>
        </ng-container>
      </CustomLayout>
    </div>
  `,
  styleUrl: './pageFooter.scss',
})
export class PageFooter {}
