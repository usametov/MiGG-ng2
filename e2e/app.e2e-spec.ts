import { MiGGNg2Page } from './app.po';

describe('mi-gg-ng2 App', () => {
  let page: MiGGNg2Page;

  beforeEach(() => {
    page = new MiGGNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
