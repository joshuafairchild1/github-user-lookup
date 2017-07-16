import { GithubUserLookupPage } from './app.po';

describe('github-user-lookup App', () => {
  let page: GithubUserLookupPage;

  beforeEach(() => {
    page = new GithubUserLookupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
