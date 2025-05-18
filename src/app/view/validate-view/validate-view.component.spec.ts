import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateViewComponent } from './validate-view.component';

describe('ValidateViewComponent', () => {
  let component: ValidateViewComponent;
  let fixture: ComponentFixture<ValidateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
