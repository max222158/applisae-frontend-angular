import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-spinner',
  templateUrl: './button-spinner.component.html',
  styleUrls: ['./button-spinner.component.css']
})
export class ButtonSpinnerComponent {
  @Input() backgroundColor: string = '';
  @Input() textColor: string = 'white';
  @Input() disabled: boolean = false;
  @Input() buttonText: string = 'Cliquez ici';

}
