import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSuccessPageComponent } from './cart-success-page.component';

describe('CartSuccessPageComponent', () => {
  let component: CartSuccessPageComponent;
  let fixture: ComponentFixture<CartSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSuccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
