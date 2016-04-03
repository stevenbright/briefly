package briefly.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Alexander Shabanov
 */
@Controller
@RequestMapping("/g/part")
public final class PagePartController {

  @RequestMapping("/books")
  public ModelAndView getBooks() {
    return new ModelAndView("part/books", "books", null);
  }
}
