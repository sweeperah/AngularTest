import type { Meta, StoryObj } from '@storybook/angular'
import { RadioGroup } from './radioGroup'

const meta: Meta<RadioGroup> = {
  title: 'Components / Form / RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    label: 'Shipping method',
    options: [
      { label: 'Standard (3-5 days)', value: 'standard' },
      { label: 'Express (1-2 days)', value: 'express' },
      { label: 'Overnight', value: 'overnight' },
    ],
    value: 'standard',
    disabled: false,
    error: null,
  },
}

export default meta
type Story = StoryObj<RadioGroup>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    value: '',
    error: 'Please select a shipping method.',
  },
}
