
class TitleService {

  setTitle(pageNamePart: string): void {
    document.title = "Briefly \u00BB " + pageNamePart;
  }
};

export default new TitleService();
