import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseDataComponent } from './enterprise-data.component';

describe('EnterpriseDataComponent', () => {
  let component: EnterpriseDataComponent;
  let fixture: ComponentFixture<EnterpriseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterpriseDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
