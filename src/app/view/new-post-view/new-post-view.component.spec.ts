import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostViewComponent } from './new-post-view.component';

describe('NewPostViewComponent', () => {
  let component: NewPostViewComponent;
  let fixture: ComponentFixture<NewPostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPostViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
