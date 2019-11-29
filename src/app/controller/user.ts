import { stringify } from 'querystring';

export class User {

tipo: String;
codCliente: String;
nome: String;
tipo_pessoa: String;
documento: String;
criado_em: Number;
atualizado_em: Number;
cedente: Boolean;
cessionario: Boolean;
numero_conta: Number;

constructor(tipo?:string,codCliente?:string, nome?:string, tipo_pessoa?:string,documento?:string, criado_em?:number, atualizado_em?:number, cedente?:boolean, cessionario?:boolean, numero_conta?:number) {
this.tipo = tipo;
this.codCliente = codCliente;
this.nome = nome;
this.tipo_pessoa = tipo_pessoa;
this.documento=documento;
this.criado_em=criado_em;
this.atualizado_em=atualizado_em;
this.cedente=cedente;
this.cessionario=cessionario;
this.numero_conta= numero_conta;

}











}