import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productTitleResolver } from './product-title.resolver';

describe('productTitleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      productTitleResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
