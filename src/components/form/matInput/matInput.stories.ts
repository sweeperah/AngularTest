import type { Meta, StoryObj } from '@storybook/angular'
import { MatInput } from './matInput'

const meta: Meta<MatInput> = {
  title: 'Components / Form / MatInput',
  component: MatInput,
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
type Story = StoryObj<MatInput>

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
