package briefly.website.service.support;

import briefly.website.service.DownloadService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Alexander Shabanov
 */
public final class DummyDownloadService implements DownloadService {

  @Override
  public void download(long id, HttpServletResponse response) throws IOException {
    response.sendRedirect("/robots.txt");
  }
}
