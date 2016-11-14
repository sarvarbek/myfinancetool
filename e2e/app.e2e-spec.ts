import { MyfinancetoolPage } from './app.po';

describe('myfinancetool App', function() {
  let page: MyfinancetoolPage;

  beforeEach(() => {
    page = new MyfinancetoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
