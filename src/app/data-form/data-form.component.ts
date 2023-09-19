import { VerificaEmailService } from './services/verifica-email.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { map } from 'rxjs';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/services/form-validations';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  estados!: any;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private dropdownService: DropdownService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {}

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Loiane'),
    //   email: new FormControl(null),
    // });

    // this.verificaEmailService.verificarEmail('emai@email.com').subscribe();

    this.estados = this.dropdownService.getEstadoBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.validarEmail.bind(this)],
      ],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],

      endereco: this.formBuilder.group({
        rua: [null, Validators.required],
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),

      cargo: [null],
      tecnologia: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });
  }

  buildFrameworks() {
    const values = this.frameworks.map((v) => new FormControl(false));
    return this.formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  onSubmit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => (v ? this.frameworks[i] : null))
        .filter((v: any) => v !== null),
    });

    console.log(valueSubmit);

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
      this.verificaValidacoesForm(valueSubmit);
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

  setarTecnologias() {
    this.formulario.get('tecnologia')?.setValue(['java', 'javascript', 'php']);
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks')
      ? (<FormArray>this.formulario.get('frameworks')).controls
      : null;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService
      .verificarEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }
}
