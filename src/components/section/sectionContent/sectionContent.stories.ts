import type { Meta, StoryObj } from '@storybook/angular'
import { SectionContent } from './sectionContent'

const meta: Meta<SectionContent> = {
  title: 'Components / SectionContent',
  component: SectionContent,
  tags: ['autodocs'],
  render: () => ({
    template: `<SectionContent><p>Section content goes here.</p></SectionContent>`,
  }),
}

export default meta
type Story = StoryObj<SectionContent>

export const Default: Story = {}
