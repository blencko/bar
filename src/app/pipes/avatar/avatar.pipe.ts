import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value: any, args?: any, size?: number): any {
    if (value) {
      return value;
    } else {
      return `https://png.icons8.com/ios/${size ? size : 50}/${(args ? args : 'ffffff')}/user-male-circle.png`;
    }
  }

}
