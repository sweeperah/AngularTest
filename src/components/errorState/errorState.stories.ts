import type { Meta, StoryObj } from '@storybook/angular'
import { ErrorState } from './errorState'

const meta: Meta<ErrorState> = {
  title: 'Components / ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<ErrorState>

export const ProductNotFound: Story = {
  args: {
    variant: 'productNotFound',
  },
}

export const NotFound: Story = {
  args: {
    variant: 'notFound',
  },
}

export const WithAction: Story = {
  args: {
    variant: 'productNotFound',
    actionLabel: 'Back to shop',
    actionLink: '/',
  },
}
