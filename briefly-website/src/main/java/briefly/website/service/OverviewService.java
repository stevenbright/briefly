package briefly.website.service;

import briefly.model.content.Overview;

public interface OverviewService {
  default Overview getOverview(long itemId) {
    throw new UnsupportedOperationException();
  }


}
