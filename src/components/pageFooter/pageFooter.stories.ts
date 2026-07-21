import type { Meta, StoryObj } from '@storybook/angular'
import { PageFooter } from './pageFooter'

const meta: Meta<PageFooter> = {
  title: 'Components / PageFooter',
  component: PageFooter,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<PageFooter />`,
  }),
  args: {},
}

export default meta
type Story = StoryObj<PageFooter>

export const Default: Story = {}
