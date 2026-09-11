import type { Preview } from '@storybook/angular'
import { applicationConfig } from '@storybook/angular'
import { setCompodocJson } from '@storybook/addon-docs/angular'
import { provideRouter } from '@angular/router'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import docJson from '../documentation.json'

setCompodocJson(docJson)

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideRouter([]), { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
