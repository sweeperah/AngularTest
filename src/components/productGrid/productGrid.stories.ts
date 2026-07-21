import type { Meta, StoryObj } from '@storybook/angular'
import { ProductGrid } from './productGrid'
import { products } from './productGrid.data'

const meta: Meta<ProductGrid> = {
  title: 'Components / ProductGrid',
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
