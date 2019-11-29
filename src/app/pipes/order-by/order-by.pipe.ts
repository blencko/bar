import { Pipe, PipeTransform } from '@angular/core';
declare var moment: any;
/**
 * Recebe um array de entrada e retorna o valor ordenado de acordo com a propriedade do objetos contidos no objeto
 */
@Pipe({ name: 'orderBy', pure: false })
export class OrderByPipe implements PipeTransform {

    value: string[] = [];
    /**
    * Função interna de comparação entre objetos
    * @param {any} a - Objeto a para comparação.
    * @param {any} b - Objeto b para comparação
    */
    static _orderByComparator(a: any, b: any): number {
        const comp1 = moment(a);
        const comp2 = moment(b);

        if (comp1.isValid() && comp2.isValid()) {
            return comp1.isBefore(comp2) ? -1 : 1;
        } else {

            if (a === null || typeof a === 'undefined') { a = 0; }
            if (b === null || typeof b === 'undefined') { b = 0; }

            if (
                (isNaN(parseFloat(a)) ||
                    !isFinite(a)) ||
                (isNaN(parseFloat(b)) || !isFinite(b))
            ) {

                a = a.toString();
                b = b.toString();
                if (a.toLowerCase() < b.toLowerCase()) { return -1; }
                if (a.toLowerCase() > b.toLowerCase()) { return 1; }
            } else {

                if (parseFloat(a) < parseFloat(b)) { return -1; }
                if (parseFloat(a) > parseFloat(b)) { return 1; }
            }

            return 0;
        }
    }
    /**
    * Recebe um array de entrada e retorna o valor ordenado de acordo com a propriedade do objetos contidos no objeto
    * @param {any[]} input - Array a ordenar.
    * @param {string} config - Propriedade sobre qual deve ser realizada a ordenação.
    */
    public transform(input: any[], config: string = '+'): any[] {
        if (!input) { return input; }


        this.value = [...input];
        const value = this.value;
        if (!Array.isArray(value)) { return value; }

        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            const propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            const desc = propertyToCheck.substr(0, 1) === '-';

            if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
                return !desc ? value.sort() : value.sort().reverse();
            } else {
                const property: string = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function (a: any, b: any) {
                    let aValue = a[property];
                    let bValue = b[property];

                    const propertySplit = property.split('.');

                    if (typeof aValue === 'undefined' && typeof bValue === 'undefined' && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    return !desc
                        ? OrderByPipe._orderByComparator(aValue, bValue)
                        : -OrderByPipe._orderByComparator(aValue, bValue);
                });
            }
        } else {

            return value.sort(function (a: any, b: any) {
                for (let i = 0; i < config.length; i++) {
                    const desc = config[i].substr(0, 1) === '-';
                    const property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
                        ? config[i].substr(1)
                        : config[i];

                    let aValue = a[property];
                    let bValue = b[property];

                    const propertySplit = property.split('.');

                    if (typeof aValue === 'undefined' && typeof bValue === 'undefined' && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    const comparison = !desc
                        ? OrderByPipe._orderByComparator(aValue, bValue)
                        : -OrderByPipe._orderByComparator(aValue, bValue);


                    if (comparison !== 0) { return comparison; }
                }

                return 0;
            });
        }
    }
}
