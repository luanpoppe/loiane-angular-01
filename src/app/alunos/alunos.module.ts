import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalhesComponent } from './aluno-detalhes/aluno-detalhes.component';
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunosService } from './alunos.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlunosComponent, AlunoFormComponent, AlunoDetalhesComponent],
  imports: [CommonModule, AlunosRoutingModule, FormsModule],
  providers: [AlunosService],
})
export class AlunosModule {}
