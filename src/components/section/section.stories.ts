import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { Section } from './section'
import { SectionTitle } from './sectionTitle/sectionTitle'
import { SectionContent } from './sectionContent/sectionContent'

const meta: Meta<Section> = {
  title: 'Components / Section',
  component: Section,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SectionTitle, SectionContent],
    }),
  ],
  render: () => ({
    template: `
      <Section>
        <SectionTitle title="Featured products" description="Hand-picked items our team loves right now." />

        <SectionContent>
          <p>Section content goes here.</p>
        </SectionContent>
      </Section>
    `,
  }),
}

export default meta
type Story = StoryObj<Section>

export const Default: Story = {}
