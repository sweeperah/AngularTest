import type { Meta, StoryObj } from '@storybook/angular'
import { Divider } from './divider'

const meta: Meta<Divider> = {
  title: 'Components / Divider',
  component: Divider,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<div style="height: 100px"><Divider [isVertical]="isVertical" /></div>`,
  }),
  args: {
    isVertical: false,
  },
}

export default meta
type Story = StoryObj<Divider>

export const Horizontal: Story = {}

export const Vertical: Story = {
  args: {
    isVertical: true,
  },
}
