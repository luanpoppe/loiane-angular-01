import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesPipesComponent } from './examples-pipes.component';

describe('ExamplesPipesComponent', () => {
  let component: ExamplesPipesComponent;
  let fixture: ComponentFixture<ExamplesPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamplesPipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamplesPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
