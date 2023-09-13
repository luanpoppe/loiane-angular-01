import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from './cursos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit, OnDestroy {
  cursos?: any[];
  pagina?: number;
  inscricao?: Subscription;

  constructor(
    private CursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursos = this.CursosService.getCursos();

    this.inscricao = this.route.queryParams.subscribe((queryParams: any) => {
      this.pagina = queryParams['pagina'];
    });
  }

  ngOnDestroy() {
    this.inscricao?.unsubscribe();
  }

  proximaPagina() {
    if (this.pagina) {
      this.pagina++;
    }
    this.router.navigate(['cursos'], {
      queryParams: {
        pagina: this.pagina,
      },
    });
  }
}
