import type { Meta, StoryObj } from '@storybook/angular'
import { SectionTitle } from './sectionTitle'

const meta: Meta<SectionTitle> = {
  title: 'Components / Section / SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `<SectionTitle [title]="title" [description]="description" />`,
  }),
  args: {
    title: 'Featured products',
    description: 'Hand-picked items our team loves right now.',
  },
}

export default meta
type Story = StoryObj<SectionTitle>

export const Default: Story = {}

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
}
