import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PageHeader } from '../components/pageHeader/pageHeader'
import { Breadcrumb } from '../components/breadcrumb/breadcrumb'
import { CustomLayout } from '../components/customLayout/customLayout'
import { BackgroundCircles } from '../components/backgroundCircles/backgroundCircles'
import { PageFooter } from '../components/pageFooter/pageFooter'

@Component({
  selector: 'AppRoot',
  imports: [RouterOutlet, PageHeader, PageFooter, Breadcrumb, CustomLayout, BackgroundCircles],
  template: `
    <BackgroundCircles />

    <main class="page">
      <PageHeader />

      <CustomLayout>
        <Breadcrumb />

        <router-outlet />
      </CustomLayout>
    </main>

    <PageFooter />
  `,
  styleUrl: './app.scss',
})
export class App {}
