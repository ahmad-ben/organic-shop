import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFromComponent } from './product-from.component';

describe('ProductFromComponent', () => {
  let component: ProductFromComponent;
  let fixture: ComponentFixture<ProductFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
