import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.scss'],
})
export class AlunoDetalhesComponent implements OnInit, OnDestroy {
  aluno!: Aluno;
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
    // this.inscricao = this.route.params.subscribe((params: any) => {
    //   let id = params['id'];

    //   this.aluno = this.alunosSerive.getAluno(id);
    // });

    this.inscricao = this.route.data.subscribe((info) => {
      this.aluno = info['aluno'];
    });
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }
}
