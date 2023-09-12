import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.scss'],
})
export class CicloComponent implements OnInit {
  @Input() valorInicial: number = 10;

  constructor() {}

  ngOnInit(): void {}
}
