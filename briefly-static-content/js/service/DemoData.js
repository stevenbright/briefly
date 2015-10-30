
'use strict';

import Immutable from "immutable";

// Helper functions

function person(id, name) {
  return {id, name, type: "person"}
}

// Demo data

const FAR_RAINBOW = {
  id: 3097,
  name: "Far Rainbow",
  type: "book",
  relatedItems: {
    author: [person(1052, "Arkady Strugatsky"), person(1053, "Boris Strugatsky")],
    language: [{id: 11, name: "ru", type: "language"}],
    genre: [{id: 98710, name: "fiction", type: "genre"}]
  }
};

// Export

export default {

  FAR_RAINBOW,

  CATALOG_LIST: [
    {
      id: 1029,
      name: "A Christmas Carol",
      type: "book",
      relatedItems: {
        author: [{id: 5097, name: "Charles Dickens", type: "person"}],
        illustrator: [{id: 6970, name: "Sam Golding", type: "person"}, {id: 7041, name: "George Irwing", type: "person"}],
        language: [{id: 12, name: "en", type: "language"}],
        genre: [{id: 98710, name: "fiction", type: "genre"}, {id: 40125, name: "classic", type: "genre"}]
      }
    },
    FAR_RAINBOW,
    {
      id: 3078,
      name: "Spanish-Chinese Dictionary",
      type: "book",
      relatedItems: {
        author: [{id: 6512, name: "Miguel De Cervantes", type: "person"}],
        language: [{id: 31, name: "es", type: "language"}, {id: 45, name: "cn", type: "language"}],
        genre: [{id: 97142, name: "dictionary", type: "genre"}]
      }
    }
  ],

  NAMES_1: [person(1, "Alice"), person(2, "Bob"), person(3, "Catherine"), person(4, "Edward")],

  NAME_HINTS_1: ["Ba", "Be", "Bo"]
}
