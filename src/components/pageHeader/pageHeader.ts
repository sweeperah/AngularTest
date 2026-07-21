import { Component } from '@angular/core'
import { GoogleSymbol } from '../googleSymbol/googleSymbol'
import { CustomLayout } from '../customLayout/customLayout'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'PageHeader',
  imports: [
    GoogleSymbol, CustomLayout, RouterLink,
  ],
  template: `
    <div class="pageHeader">
      <CustomLayout>
        <ng-container>
          <div class="pageHeaderInner">
            <a class="logo" routerLink="/"><GoogleSymbol [name]="('star')" /> Demo Store</a>

            <div class="phrase">Get your Dreams</div>
          </div>
        </ng-container>
      </CustomLayout>
    </div>
  `,
  styleUrl: './pageHeader.scss',
})
export class PageHeader {}
