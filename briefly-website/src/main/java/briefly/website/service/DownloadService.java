package briefly.website.service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Alexander Shabanov
 */
public interface DownloadService {

  void download(long id, HttpServletResponse response) throws IOException;
}
