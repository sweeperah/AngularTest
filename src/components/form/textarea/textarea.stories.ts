import type { Meta, StoryObj } from '@storybook/angular'
import { Textarea } from './textarea'

const meta: Meta<Textarea> = {
  title: 'Components / Form / Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Message',
    placeholder: 'Write your message...',
    rows: 4,
    disabled: false,
    isRequired: false,
    error: null,
  },
}

export default meta
type Story = StoryObj<Textarea>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This field is disabled.',
  },
}

export const WithError: Story = {
  args: {
    error: 'Message must be at least 20 characters long.',
  },
}
