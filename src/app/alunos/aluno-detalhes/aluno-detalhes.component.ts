import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.scss'],
})
export class AlunoDetalhesComponent implements OnInit, OnDestroy {
  aluno?: any;
  inscricao?: Subscription;

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  constructor(
    private route: ActivatedRoute,
    private alunosSerive: AlunosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params: any) => {
      let id = params['id'];

      this.aluno = this.alunosSerive.getAluno(id);
    });
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }
}
