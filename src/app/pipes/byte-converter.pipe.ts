import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteConverter'
})
export class ByteConverterPipe implements PipeTransform {

  transform(bytes: number, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';

    if (bytes === 0) return '0 octets';

    const units = ['octets', 'ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];

    const exp = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = (bytes / Math.pow(1024, exp)).toFixed(precision);

    return `${value} ${units[exp]}`;
  }

}
