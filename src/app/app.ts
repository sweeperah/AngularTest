import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PageHeader } from '../components/pageHeader/pageHeader'
import { Breadcrumb } from '../components/breadcrumb/breadcrumb'
import { CustomLayout } from '../components/customLayout/customLayout'
import { BackgroundCircles } from '../components/backgroundCircles/backgroundCircles'

@Component({
  selector: 'AppRoot',
  imports: [RouterOutlet, PageHeader, Breadcrumb, CustomLayout, BackgroundCircles],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
