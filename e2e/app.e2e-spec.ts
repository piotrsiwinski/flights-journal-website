import { FlightsJournalWebsitePage } from './app.po';

describe('flights-journal-website App', function() {
  let page: FlightsJournalWebsitePage;

  beforeEach(() => {
    page = new FlightsJournalWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
