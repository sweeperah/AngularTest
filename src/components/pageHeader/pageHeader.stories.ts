import type { Meta, StoryObj } from '@storybook/angular'
import { PageHeader } from './pageHeader'

const meta: Meta<PageHeader> = {
  title: 'Components / PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<PageHeader />`,
  }),
  args: {},
}

export default meta
type Story = StoryObj<PageHeader>

export const Default: Story = {}
