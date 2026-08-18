import type { Meta, StoryObj } from '@storybook/angular'
import { Switch } from './switch'

const meta: Meta<Switch> = {
  title: 'Components / Form / Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Enable notifications',
    disabled: false,
    checked: false,
  },
}

export default meta
type Story = StoryObj<Switch>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
