import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticoComponent } from './analitico.component';

describe('AnaliticoComponent', () => {
  let component: AnaliticoComponent;
  let fixture: ComponentFixture<AnaliticoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnaliticoComponent]
    });
    fixture = TestBed.createComponent(AnaliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
