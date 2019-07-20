import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { element, by, browser } from 'protractor';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });





  it('Should enter values', () => {
    browser.get('http://localhost:4200');
    element(by.id('emailL')).sendKeys('test@test.test');
    element(by.id('passwordL')).sendKeys('password');
    element(by.id('logBtn')).click();

    element(by.tagName('h1')).toBe('Welcome to PrettyPenny');
  });
});
