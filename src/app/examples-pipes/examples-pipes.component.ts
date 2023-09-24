import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples-pipes',
  templateUrl: './examples-pipes.component.html',
  styleUrls: ['./examples-pipes.component.scss'],
})
export class ExamplesPipesComponent implements OnInit {
  livro: any = {
    titulo: 'Learning JavaScript Data Structures and Algorithms 2nd ed',
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016, 5, 23),
    url: 'http://a.co/glqjpRP',
  };

  livros: string[] = ['Java', 'Angular2'];
  filtro: string;

  constructor() {}

  ngOnInit(): void {}

  addCurso(valor) {
    this.livros.push(valor);
    console.log(this.livros);
  }

  obterCursos() {
    if (
      this.livros.length === 0 ||
      this.filtro === undefined ||
      this.filtro.trim() === ''
    ) {
      return this.livros;
    }
    return this.livros.filter((v) =>
      v.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );
  }
}
