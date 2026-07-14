import type { Meta, StoryObj } from '@storybook/angular'
import { ProductGrid, Product } from './productGrid'

const sampleProducts: Product[] = [
  {
    id: 'aurora-lounge-chair',
    name: 'Aurora Lounge Chair',
    category: 'Furniture',
    price: 249,
    rating: 4,
    imageSeed: 'aurora-lounge-chair',
  },
  {
    id: 'nimbus-table-lamp',
    name: 'Nimbus Table Lamp',
    category: 'Lighting',
    price: 89,
    rating: 5,
    imageSeed: 'nimbus-table-lamp',
  },
  {
    id: 'drift-ceramic-vase',
    name: 'Drift Ceramic Vase',
    category: 'Decor',
    price: 34,
    rating: 3,
    imageSeed: 'drift-ceramic-vase',
  },
  {
    id: 'haven-throw-blanket',
    name: 'Haven Throw Blanket',
    category: 'Textiles',
    price: 59,
    rating: 5,
    imageSeed: 'haven-throw-blanket',
  },
]

const meta: Meta<ProductGrid> = {
  title: 'Components / ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<ProductGrid [products]="products" />`,
  }),
  args: {
    products: sampleProducts,
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
