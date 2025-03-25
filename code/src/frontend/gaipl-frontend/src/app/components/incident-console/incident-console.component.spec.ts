import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentConsoleComponent } from './incident-console.component';

describe('IncidentConsoleComponent', () => {
  let component: IncidentConsoleComponent;
  let fixture: ComponentFixture<IncidentConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
