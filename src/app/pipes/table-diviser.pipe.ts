import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableDiviser'
})
export class TableDiviserPipe implements PipeTransform {

  transform(value: any, args?: any, item?): any {
    const data = args.item.split('.');
    let val;


    switch (data.length) {
      case 1:
        val = this.obj(item);
        break;
      case 2:
        val = item[0][1];
        break;
      case 3:
        val = item[0][1][2];
        break;
      case 4:
        val = item[0][1][2][3];
        break;
      case 5:
        val = item[0][1][2][3][4];
        break;
    }
    console.log(val);

    return 'teste';
  }


  private obj(obj) {
    for (const k in obj) {
      if (typeof obj[k] !== 'function') {
        console.log(obj);
      }
    }
  }

}
