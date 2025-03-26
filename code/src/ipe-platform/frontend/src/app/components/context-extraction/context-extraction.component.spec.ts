import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextExtractionComponent } from './context-extraction.component';

describe('ContextExtractionComponent', () => {
  let component: ContextExtractionComponent;
  let fixture: ComponentFixture<ContextExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextExtractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
