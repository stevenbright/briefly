package briefly.website.service;

/**
 * Increments number of active visitors, called from the main page.
 */
public interface CommentService {
  void incVisitor(String page);
}
