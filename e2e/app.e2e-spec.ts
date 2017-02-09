import { Ng2CognitoSyncPage } from './app.po';

describe('ng2-cognito-sync App', function() {
  let page: Ng2CognitoSyncPage;

  beforeEach(() => {
    page = new Ng2CognitoSyncPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
