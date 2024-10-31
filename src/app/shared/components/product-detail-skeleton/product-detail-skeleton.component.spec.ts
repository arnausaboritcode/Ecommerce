import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSkeletonComponent } from './product-detail-skeleton.component';

describe('ProductDetailSkeletonComponent', () => {
  let component: ProductDetailSkeletonComponent;
  let fixture: ComponentFixture<ProductDetailSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
