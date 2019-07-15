import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartminiComponent } from './cartmini.component';

describe('CartminiComponent', () => {
  let component: CartminiComponent;
  let fixture: ComponentFixture<CartminiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartminiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
