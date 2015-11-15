package briefly.website.controller.rest;

import com.truward.brikar.error.helper.ExceptionResponseUtil;
import com.truward.brikar.server.controller.AbstractRestController;

import javax.annotation.Nonnull;

/**
 * Base REST controller for briefly package.
 *
 * @author Alexander Shabanov
 */
public abstract class BaseRestController extends AbstractRestController {

  @Nonnull
  @Override
  protected Object getResponseObjectFromException(@Nonnull Throwable e) {
    return ExceptionResponseUtil.shallowConvert(e);
  }
}
