import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExtractionComponent } from './data-extraction.component';

describe('DataExtractionComponent', () => {
  let component: DataExtractionComponent;
  let fixture: ComponentFixture<DataExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataExtractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
