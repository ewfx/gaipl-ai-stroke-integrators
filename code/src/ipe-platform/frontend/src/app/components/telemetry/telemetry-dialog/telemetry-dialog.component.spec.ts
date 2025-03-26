import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryDialogComponent } from './telemetry-dialog.component';

describe('TelemetryDialogComponent', () => {
  let component: TelemetryDialogComponent;
  let fixture: ComponentFixture<TelemetryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelemetryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
