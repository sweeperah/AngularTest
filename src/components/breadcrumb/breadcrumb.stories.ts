import { Component, inject } from '@angular/core'
import { provideRouter, Router } from '@angular/router'
import type { Meta, StoryObj } from '@storybook/angular'
import { applicationConfig, moduleMetadata } from '@storybook/angular'
import { Breadcrumb } from './breadcrumb'

@Component({
  selector: 'BreadcrumbStoryHarness',
  imports: [Breadcrumb],
  template: `<Breadcrumb />`,
})
class BreadcrumbStoryHarness {
  constructor() {
    void inject(Router).navigateByUrl('/product/aurora-lounge-chair')
  }
}

const meta: Meta<Breadcrumb> = {
  title: 'Components / Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**', component: BreadcrumbStoryHarness }])],
    }),
    moduleMetadata({
      imports: [BreadcrumbStoryHarness],
    }),
  ],
  render: () => ({
    template: `<BreadcrumbStoryHarness />`,
  }),
}

export default meta
type Story = StoryObj<Breadcrumb>

export const OnProductPage: Story = {}
