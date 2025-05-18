import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpBuyComponent } from './pop-up-buy.component';

describe('PopUpBuyComponent', () => {
  let component: PopUpBuyComponent;
  let fixture: ComponentFixture<PopUpBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
