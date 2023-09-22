import { CriarCursoModule } from './criar-curso/criar-curso.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CursosModule } from './cursos/cursos.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CriarCursoModule, CursosModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
