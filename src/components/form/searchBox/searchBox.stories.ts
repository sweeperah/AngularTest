import type { Meta, StoryObj } from '@storybook/angular'
import { SearchBox } from './searchBox'

const meta: Meta<SearchBox> = {
  title: 'Components / Form / SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  render: args => ({
    props: args,
    template: `
      <SearchBox
        [search]="search"
        (searchChange)="searchChange($event)"
        (searchSubmit)="searchSubmit($event)"
      />
    `,
  }),
  argTypes: {
    search: {
      control: { type: 'text' },
    },
    searchChange: {
      action: 'searchChange',
    },
    searchSubmit: {
      action: 'SearchSubmit',
    },
  },
  args: {
    search: 'Search',
  },
}

export default meta
type Story = StoryObj<SearchBox>

export const Default: Story = {}
