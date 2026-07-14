import type { Meta, StoryObj } from '@storybook/angular'
import { GoogleSymbol } from './googleSymbol'

const meta: Meta<GoogleSymbol> = {
  title: 'Components / GoogleSymbol',
  component: GoogleSymbol,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<GoogleSymbol [name]="name" [size]="size" [weight]="weight" [fill]="fill" [grade]="grade" [color]="color" [label]="label" />`,
  }),
  argTypes: {
    weight: {
      control: 'select',
      options: [100, 200, 300, 400, 500, 600, 700],
    },
  },
  args: {
    name: 'home',
    size: 24,
    weight: 400,
    fill: false,
    grade: 0,
  },
}

export default meta
type Story = StoryObj<GoogleSymbol>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    name: 'favorite',
    fill: true,
  },
}

export const Large: Story = {
  args: {
    name: 'settings',
    size: 48,
  },
}

export const Colored: Story = {
  args: {
    name: 'check_circle',
    color: '#1d4ed8',
  },
}

export const WithAccessibleLabel: Story = {
  args: {
    name: 'notifications',
    label: 'Notifications',
  },
}
