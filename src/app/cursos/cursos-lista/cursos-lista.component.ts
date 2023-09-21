import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, empty, EMPTY, Subject, switchMap } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModelService } from 'src/app/shared/alert-model.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  // bsModalRef?: BsModalRef;

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  cursoSelecionado: Curso;

  constructor(
    private service: CursosService,
    private alertService: AlertModelService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    // this.service.list().subscribe(
    //   (dados) => console.log(dados),
    //   (error) => console.error(error),
    //   () => console.log('Observable completo')
    // );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde'
    );
  }

  onEdit(id) {
    this.router.navigate(['editar', id], {
      relativeTo: this.route,
    });
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;

    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse curso?'
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.service.remove(curso.id) : EMPTY))
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => {
          this.alertService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tarde'
          );
        }
      );
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) => {
        this.deleteModalRef.hide();
        this.alertService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde'
        );
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
