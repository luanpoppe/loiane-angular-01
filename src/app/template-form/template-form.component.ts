import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent implements OnInit {
  constructor(private http: HttpClient) {}

  usuario: any = {
    nome: null,
    email: null,
  };

  onSubmit(form: any) {
    console.log(form);

    // console.log(this.usuario);
  }

  ngOnInit(): void {}

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != null && cep !== '') {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.resetaDadosForm(form);

        this.http
          .get(`https://viacep.com.br/ws/${cep}/json`)
          .pipe(map((dados: any) => dados))
          .subscribe((dados) => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //   },
    // });
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        // cep: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
}
