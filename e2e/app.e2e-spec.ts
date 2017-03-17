import { TripplanserverPage } from './app.po';

describe('tripplanserver App', function() {
  let page: TripplanserverPage;

  beforeEach(() => {
    page = new TripplanserverPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
