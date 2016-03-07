package briefly.dbinit.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcOperations;

/**
 * @author Alexander Shabanov
 */
public final class CheckService {
  private CheckService() {}

  public interface Contract {
    boolean check();
  }

  public static final class Impl implements Contract {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final JdbcOperations db;

    public Impl(JdbcOperations db) {
      this.db = db;
    }

    @Override
    public boolean check() {
      log.info("Running checks");

      try {
        final int count = db.queryForObject("SELECT COUNT(0) FROM item", Integer.class);
        log.info("Number of existing items: {}", count);
      } catch (DataAccessException ignored) {
        log.warn("There is no items table, schema is invalid, returning");
        return false;
      }

      db.queryForList("SELECT metadata FROM item_profile LIMIT 10");

      return true;
    }
  }
}
