import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputAutosizeComponent } from './mat-input-autosize.component';

describe('MatInputAutosizeComponent', () => {
  let component: MatInputAutosizeComponent;
  let fixture: ComponentFixture<MatInputAutosizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatInputAutosizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatInputAutosizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
