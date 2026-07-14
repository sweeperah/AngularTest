import type { Meta, StoryObj } from '@storybook/angular'
import { ProductCard } from './productCard'

const meta: Meta<ProductCard> = {
  title: 'Components / ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `
      <div style="max-width: 280px;">
        <ProductCard [name]="name" [price]="price" [category]="category" [rating]="rating" [imageSeed]="imageSeed" />
      </div>
    `,
  }),
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
    },
  },
  args: {
    name: 'Aurora Lounge Chair',
    price: 249,
    category: 'Furniture',
    rating: 4,
    imageSeed: 'aurora-lounge-chair',
  },
}

export default meta
type Story = StoryObj<ProductCard>

export const Default: Story = {}

export const TopRated: Story = {
  args: {
    name: 'Nimbus Table Lamp',
    price: 89,
    category: 'Lighting',
    rating: 5,
    imageSeed: 'nimbus-table-lamp',
  },
}

export const NoRating: Story = {
  args: {
    name: 'Drift Ceramic Vase',
    price: 34,
    category: 'Decor',
    rating: 0,
    imageSeed: 'drift-ceramic-vase',
  },
}
