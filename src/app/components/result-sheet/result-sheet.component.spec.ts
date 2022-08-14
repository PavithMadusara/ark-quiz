import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSheetComponent } from './result-sheet.component';

describe('ResultSheetComponent', () => {
  let component: ResultSheetComponent;
  let fixture: ComponentFixture<ResultSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
