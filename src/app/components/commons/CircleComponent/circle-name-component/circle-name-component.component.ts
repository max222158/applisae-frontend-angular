import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-name-component',
  templateUrl: './circle-name-component.component.html',
  styleUrl: './circle-name-component.component.css'
})
export class CircleNameComponentComponent {
  @Input() name: string = '';
  initial: string = '';
  backgroundColor: string = '';

  ngOnInit(): void {
    this.initial = this.name.charAt(0).toUpperCase();
    this.backgroundColor = this.getRandomDarkColor();
  }

  getRandomDarkColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      const value = Math.floor(Math.random() * 16);
      color += letters[value < 8 ? 0 : value]; // only use dark colors
    }
    return color;
  }

}
