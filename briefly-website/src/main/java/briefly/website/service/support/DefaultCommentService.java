package briefly.website.service.support;

import briefly.website.service.CommentService;
import com.truward.brikar.common.log.LogUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public final class DefaultCommentService implements CommentService {
  private final Logger log = LoggerFactory.getLogger(getClass());

  @Override
  public void incVisitor(String page) {
    LogUtil.writeCount(log, "Visit-" + page, 1);
  }
}
