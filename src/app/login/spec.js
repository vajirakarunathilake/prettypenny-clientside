browser.ignoreSynchronization = true
describe('LoginComponent', () => {

  it('Should enter values', () => {
    browser.get('http://localhost:4200/login');
    element(by.id("sbmtBtn")).click();
    browser.driver.sleep(10000);

    expect(element(by.id("genAlert")).getText()).toBe("Must provide email.");
  });

  it('Should enter login values', () => {
    browser.get('http://localhost:4200/login');
    element(by.id("emailL")).sendKeys("test@test.test");
    element(by.id("logBtn")).click();
    browser.driver.sleep(10000);

    expect(element(by.id("genAlert")).getText()).toBe("Must enter a password.");
  });


  it('Should enter all login values', () => {
    browser.get('http://localhost:4200/login');
    element(by.id('emailL')).sendKeys('nobody');
    element(by.id('passwordL')).sendKeys('pass');
    element(by.id('logBtn')).click();
    browser.driver.sleep(10000);
    expect(element(by.id('genAlert')).getText()).toBe("Invalid Credentials.");

  });
});
