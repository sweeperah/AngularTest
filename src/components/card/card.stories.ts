import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { Card } from './card'

const meta: Meta<Card> = {
  title: 'Components / Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  render: () => ({
    template: `
      <Card><div>Content</div> <div>Content 2</div></Card>
    `,
  }),
}

export default meta
type Story = StoryObj<Card>

export const Default: Story = {}
