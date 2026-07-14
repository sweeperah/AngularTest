import type { Meta, StoryObj } from '@storybook/angular'
import { BackgroundCircles } from './backgroundCircles'

const meta: Meta<BackgroundCircles> = {
  title: 'Components / BackgroundCircles',
  component: BackgroundCircles,
  tags: ['autodocs'],
  render: () => ({
    template: `
      <div style="position: relative; height: 400px; border: 1px dashed #d1d5db;">
        <BackgroundCircles />
        <p style="position: relative; padding: 1rem;">
          Page content renders above the circles. Move your mouse anywhere in this preview — circles drift on
          their own and are gently pushed away from the cursor across the whole canvas, not just this box.
        </p>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<BackgroundCircles>

export const Default: Story = {}
