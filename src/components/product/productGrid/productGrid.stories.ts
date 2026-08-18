import type { Meta, StoryObj } from '@storybook/angular'
import { ProductGrid } from './productGrid'
import { PRODUCTS as products } from '../../../services/product.data'

const meta: Meta<ProductGrid> = {
  title: 'Components / Product / ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ProductGrid [products]="products" />`,
  }),
  args: {
    products,
  },
}

export default meta
type Story = StoryObj<ProductGrid>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    products: [],
  },
}
