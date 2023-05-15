import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderInfoComponent } from './admin-order-info.component';

describe('AdminOrderInfoComponent', () => {
  let component: AdminOrderInfoComponent;
  let fixture: ComponentFixture<AdminOrderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminOrderInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
