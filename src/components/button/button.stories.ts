import type { Meta, StoryObj } from '@storybook/angular'
import { Button } from './button'

const meta: Meta<Button> = {
  title: 'Components / Button',
  component: Button,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ButtonComp [variant]="variant" [disabled]="disabled">Click me</ButtonComp>`,
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    variant: 'primary',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
}
