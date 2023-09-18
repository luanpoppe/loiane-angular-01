import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl('Loiane'),
    //   email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map((dados: any) => dados))
      .subscribe(
        (dados) => {
          console.log(dados);
          //resetar o form
          // this.formulario.reset();
          this.resetar();
        },
        (error: any) => alert('erro')
      );
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: any): any {
    return (
      !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
    );
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    };
  }
}
