package briefly.website.service;

import briefly.model.comment.Comment;

/**
 * Increments number of active visitors, called from the main page.
 */
public interface CommentService {
  void incVisitor(String page);

  default Comment getComment(long id) {
    throw new UnsupportedOperationException();
  }
}
