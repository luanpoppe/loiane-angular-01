import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  estados!: any;
  cargos!: any[];

  constructor(
    private dropdownService: DropdownService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService
  ) {}

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Loiane'),
    //   email: new FormControl(null),
    // });

    this.estados = this.dropdownService.getEstadoBr();

    this.cargos = this.dropdownService.getCargos();

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        rua: [null, Validators.required],
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargo: [null],
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .pipe(map((dados: any) => dados))
        .subscribe(
          (dados) => {
            console.log(dados);
            // this.resetar();
          },
          (error: any) => alert('erro')
        );
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string): any {
    return (
      !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
    );
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        ?.subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
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

  resetaDadosForm() {
    this.formulario.patchValue({
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2
      ? obj1.nome === obj2.nome && obj1.nivel === obj2.nivel
      : obj1 && obj2;
  }
}
