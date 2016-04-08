package briefly.website.service;

import briefly.model.catalog.CatalogElement;

import java.util.List;

/**
 * @author Alexander Shabanov
 */
public interface CatalogAdapterService {

  List<CatalogElement> getElements(Long startId, int limit);
}
