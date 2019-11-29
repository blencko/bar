import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nomeBanco'
})
export class BancosPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    switch (value) {
      case '001':
        return "Banco do Brasil";
      case '002':
        return "Banco Central do Brasil";
      case '003':
        return "Banco da Amazônia";
      case '004':
        return "Banco do Nordeste do Brasil";
      case '007':
        return "Banco Nacional de Desenvolvimento Econômico e Social";
      case '104':
        return "Caixa Econômica Federal";
      case '046':
        return "Banco Regional de Desenvolvimento do Extremo Sul";
      case '023':
        return "Banco de Desenvolvimento de Minas Gerais";
      case '070':
        return "Banco de Brasília";
      case '047':
        return "Banco do Estado de Sergipe";
      case '021':
        return "Banco do Estado do Espírito Santo";
      case '037':
        return "Banco do Estado do Pará";
      case '041':
        return "Banco do Estado do Rio Grande do Sul";
      case '075':
        return "Banco ABN Amro S.A.";
      case '025':
        return "Banco Alfa";
      case '719':
        return "Banco Banif";
      case '107':
        return "Banco BBM";
      case '318':
        return "Banco BMG";
      case '218':
        return "Banco Bonsucesso";
      case '208':
        return "Banco BTG Pactual";
      case '263':
        return "Banco Cacique";
      case '745':
        return "Banco Citibank";
      case '721':
        return "Banco Credibel";
      case '229':
        return "Banco Cruzeiro do Sul";
      case '707':
        return "Banco Daycoval";
      case '265':
        return "Banco Fator";
      case '224':
        return "Banco Fibra";
      case '121':
        return "Banco Gerador";
      case '612':
        return "Banco Guanabara";
      case '604':
        return "Banco Industrial do Brasil";
      case '320':
        return "Banco Industrial e Comercial";
      case '630':
        return "Banco Intercap";
      case '077':
        return "Banco Intermedium";
      case 'M09':
        return "Banco Itaucred Financiamentos";
      case '389':
        return "Banco Mercantil do Brasil";
      case '746':
        return "Banco Modal";
      case '738':
        return "Banco Morada";
      case '623':
        return "Banco Panamericano";
      case '611':
        return "Banco Paulista";
      case '643':
        return "Banco Pine";
      case '638':
        return "Banco Prosper";
      case '654':
        return "Banco Renner";
      case '453':
        return "Banco Rural";
      case '422':
        return "Banco Safra";
      case '033':
        return "Banco Santander";
      case '637':
        return "Banco Sofisa";
      case '655':
        return "Banco Votorantim";
      case '237':
        return "Bradesco";
      case '399':
        return "HSBC Bank Brasil";
      case '263':
        return "Banco Caixa Geral";
      case '505':
        return "Banco Credit Suisse";
      case '184':
        return "Banco Itaú BBA";
      case '479':
        return "Banco ItaúBank";
      case '741':
        return "Banco Ribeirão Preto";
      case '082':
        return "Banco Topázio";
      case '341':
        return "Itaú Unibanco";
      default :
        return 'Não encontrado';
    }
  }

}
