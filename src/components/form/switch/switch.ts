import { Component, forwardRef, input, model, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { uniqueId } from '../../../helpers/uniqueId'

@Component({
  selector: 'Switch',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  template: `
    <label class="Switch" [class.disabled]="disabled() || formDisabled()" [for]="id">
      <input
        class="SwitchInput"
        type="checkbox"
        role="switch"
        [id]="id"
        [name]="name()"
        [disabled]="disabled() || formDisabled()"
        [checked]="checked()"
        (change)="onChangeValue($any($event.target).checked)"
        (blur)="onTouched()"
      />

      <span class="SwitchTrack" aria-hidden="true"></span>

      <span class="SwitchLabel">{{ label() }}</span>
    </label>
  `,
  styleUrl: './switch.scss',
})
export class Switch implements ControlValueAccessor {
  readonly label = input('')
  readonly name = input('')
  readonly disabled = input(false)

  readonly checked = model(false)

  protected readonly formDisabled = signal(false)

  protected readonly id = uniqueId('switch')

  private onChange: (checked: boolean) => void = () => {}
  protected onTouched: () => void = () => {}

  protected onChangeValue(checked: boolean): void {
    this.checked.set(checked)
    this.onChange(checked)
  }

  writeValue(checked: boolean): void {
    this.checked.set(checked ?? false)
  }

  registerOnChange(fn: (checked: boolean) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled)
  }
}
