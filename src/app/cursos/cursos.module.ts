import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosService } from './cursos.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CursoDetalheComponent,
    CursoNaoEncontradoComponent,
    CursosComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [],
  providers: [CursosService],
})
export class CursosModule {}
