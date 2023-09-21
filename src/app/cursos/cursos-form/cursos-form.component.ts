import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModelService } from 'src/app/shared/alert-model.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModelService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.service.save(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        (error) => {
          this.modal.showAlertDanger(msgError);
        }
      );

      // if (this.form.value.id) {
      //   // update
      //   this.service.update(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso');
      //       this.location.back();
      //     },
      //     (error) =>
      //       this.modal.showAlertDanger(
      //         'Erro ao atualizar curso, tente novamente'
      //       ),
      //     () => console.log('update completo')
      //   );
      // } else {
      //   // create
      //   this.service.create(this.form.value).subscribe(
      //     (success) => {
      //       this.modal.showAlertSuccess('Curso criado com sucesso');
      //       this.location.back();
      //     },
      //     (error) =>
      //       this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
      //     () => console.log('request completo')
      //   );
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('onCancel');
  }
}
