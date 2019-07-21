import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from '../../src/app/login/login.component';
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
    element(by.id('sbmtBtn')).click();
    element(by.id('genAlert')).toBe('Must provide email.');
  });

  it('Should enter login values', () => {
    browser.get('http://localhost:4200');
    element(by.id('emailL')).sendKeys('test@test.test');
    element(by.id('logBtn')).click();
    element(by.id('genAlert')).toBe('Must enter a password.');
  });


  it('Should enter all login values', () => {
    browser.get('http://localhost:4200');
    element(by.id('emailL')).sendKeys('test@test.test');
    element(by.id('passwordL')).sendKeys('password');
    element(by.id('logBtn')).click();
    if (element(by.tagName('h1')).getText() !== null) {
      element(by.tagName('h1')).toBe('Welcome to PrettyPenny');
    }
    else {
      element(by.id('genAlert')).toBe('Invalid Credentials.');
    }
  });
});
