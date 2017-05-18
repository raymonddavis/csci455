import { Csci455Page } from './app.po';

describe('csci455 App', function() {
  let page: Csci455Page;

  beforeEach(() => {
    page = new Csci455Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
