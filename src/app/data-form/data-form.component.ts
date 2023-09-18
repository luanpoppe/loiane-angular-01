import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario: any;

  constructor() {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl('Loiane'),
      email: new FormControl(null),
    });
  }
}
