import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.scss'],
})
export class DataBindingComponent implements OnInit {
  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://via.placeholder.com/400x200';

  valorAtual: string = '';
  valorSalvo: string = '';
  nome: string = 'abc';

  pessoa: any = {
    nome: 'def',
    idade: 20,
  };

  valorInicial = 15;

  getValor() {
    return 1;
  }

  nomeDoCurso: string = 'Angular';

  getCurtirCurso() {
    return true;
  }

  botaoClicado() {
    alert('Botão clicado!');
  }

  onKeyUp(evento: KeyboardEvent) {
    // console.log((<HTMLInputElement>evento.target).value);
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: any) {
    this.valorSalvo = valor;
  }

  onMudouValor(evento: any) {
    console.log(evento);
  }

  constructor() {}

  ngOnInit(): void {}
}
