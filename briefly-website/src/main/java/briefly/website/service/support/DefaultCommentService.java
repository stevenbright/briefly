package briefly.website.service.support;

import briefly.website.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public final class DefaultCommentService implements CommentService {
  private final Logger log = LoggerFactory.getLogger(getClass());
}
