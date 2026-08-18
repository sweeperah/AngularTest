import type { Meta, StoryObj } from '@storybook/angular'
import { Input } from './input'

const meta: Meta<Input> = {
  title: 'Components / Form / Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    disabled: false,
    isRequired: false,
    error: null,
  },
}

export default meta
type Story = StoryObj<Input>

export const Default: Story = {}

export const Required: Story = {
  args: {
    isRequired: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'you@example.com',
  },
}

export const WithError: Story = {
  args: {
    value: 'not-an-email',
    error: 'Please enter a valid email address.',
  },
}
