import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: string): string {
    const currentDate = new Date();
    const dateValue = new Date(value);

    if (dateValue.toDateString() === currentDate.toDateString()) {
      // Si la date est aujourd'hui, renvoyer l'heure
      return this.formatTime(dateValue);
    } else if (dateValue.getFullYear() === currentDate.getFullYear()) {
      // Si l'année est la même que l'année courante, renvoyer le format "jour mois"
      return `${dateValue.getDate()} ${this.getMonthName(dateValue.getMonth())}`;
    } else {
      // Sinon, renvoyer le format "jour/mois/année"
      return `${dateValue.getDate()}/${dateValue.getMonth() + 1}/${dateValue.getFullYear()}`;
    }
  }

  private formatTime(date: Date): string {
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }

  private getMonthName(monthIndex: number): string {
    const monthNames = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    return monthNames[monthIndex];
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
