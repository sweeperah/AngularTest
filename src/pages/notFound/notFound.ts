import { Component } from '@angular/core'
import { ErrorState } from '../../components/errorState/errorState'

@Component({
  selector: 'NotFoundPage',
  imports: [ErrorState],
  template: ` <ErrorState [variant]="'notFound'" actionLabel="Back to home" actionLink="/" /> `,
})
export default class NotFoundPage {}
