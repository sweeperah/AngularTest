import type { Meta, StoryObj } from '@storybook/angular'
import { Select } from './select'

const meta: Meta<Select> = {
  title: 'Components / Form / Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' },
      { label: 'Spain', value: 'es' },
    ],
    disabled: false,
    isRequired: false,
    error: null,
  },
}

export default meta
type Story = StoryObj<Select>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    error: 'Please select a country.',
  },
}
