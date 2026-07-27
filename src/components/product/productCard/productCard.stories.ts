import type { Meta, StoryObj } from '@storybook/angular'
import { ProductCard } from './productCard'
import { PRODUCTS } from '../../../services/product.data'

const meta: Meta<ProductCard> = {
  title: 'Components / Product / ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `
      <div style="max-width: 280px;">
        <ProductCard [product]="product" />
      </div>
    `,
  }),
  argTypes: {
    product: {
      rating: {
        control: { type: 'range', min: 0, max: 5, step: 1 },
      },
    },
  },
  args: {
    product: PRODUCTS[0],
  },
}

export default meta
type Story = StoryObj<ProductCard>

export const Default: Story = {}
