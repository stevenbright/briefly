-- Fixture Data
-- NOTE: There should be no zero values assigned to 'id' fields.

INSERT INTO entity_type (id, name) VALUES (1, 'author');
INSERT INTO entity_type (id, name) VALUES (2, 'language');
INSERT INTO entity_type (id, name) VALUES (3, 'person');
INSERT INTO entity_type (id, name) VALUES (5, 'book');
INSERT INTO entity_type (id, name) VALUES (6, 'movie');
INSERT INTO entity_type (id, name) VALUES (7, 'series');
INSERT INTO entity_type (id, name) VALUES (8, 'genre');
INSERT INTO entity_type (id, name) VALUES (9, 'book_origin');

--
-- Persons (Authors)
--

INSERT INTO item (id, name, type_id) VALUES (1001, 'Jack London', 3);
INSERT INTO item (id, name, type_id) VALUES (1002, 'Edgar Poe', 3);
INSERT INTO item (id, name, type_id) VALUES (1003, 'Stephen King', 3);
INSERT INTO item (id, name, type_id) VALUES (1004, 'Joe Hill', 3);
INSERT INTO item (id, name, type_id) VALUES (1005, 'Arkady Strugatsky', 3);
INSERT INTO item (id, name, type_id) VALUES (1006, 'Boris Strugatsky', 3);
INSERT INTO item (id, name, type_id) VALUES (1007, 'Victor Pelevin', 3);
INSERT INTO item (id, name, type_id) VALUES (1008, 'Jason Ciaramella', 3);

--
-- Genres
--

INSERT INTO item (id, name, type_id) VALUES (101, 'sci_fi', 8);
INSERT INTO item (id, name, type_id) VALUES (102, 'fantasy', 8);
INSERT INTO item (id, name, type_id) VALUES (103, 'essay', 8);
INSERT INTO item (id, name, type_id) VALUES (104, 'novel', 8);
INSERT INTO item (id, name, type_id) VALUES (105, 'comics', 8);
INSERT INTO item (id, name, type_id) VALUES (106, 'western', 8);
INSERT INTO item (id, name, type_id) VALUES (107, 'horror', 8);

--
-- Languages
--

INSERT INTO item (id, name, type_id) VALUES (11, 'en', 2);
INSERT INTO item (id, name, type_id) VALUES (12, 'ru', 2);

--
-- Origins
--

INSERT INTO item (id, name, type_id) VALUES (51, 'EnglishClassicBooks', 9);
INSERT INTO item (id, name, type_id) VALUES (52, 'EnglishModernBooks', 9);
INSERT INTO item (id, name, type_id) VALUES (53, 'EnglishMisc', 9);
INSERT INTO item (id, name, type_id) VALUES (54, 'RussianBooks', 9);

--
-- Series
--

INSERT INTO item (id, name, type_id) VALUES (81, 'Noon: 22nd Century', 7);
INSERT INTO item (id, name, type_id) VALUES (82, 'The Dark Tower', 7);

--
-- Books
--

INSERT INTO item (id, name, type_id) VALUES (1100, 'Far Rainbow', 5);

-- Far Rainbow -> Arkady Strugatsky (author)
INSERT INTO item_relation (lhs, rhs, type_id) VALUES (1100, 1005, 1);
-- Far Rainbow -> Boris Strugatsky (author)
INSERT INTO item_relation (lhs, rhs, type_id) VALUES (1100, 1006, 1);
-- Far Rainbow -> ru (language)
INSERT INTO item_relation (lhs, rhs, type_id) VALUES (1100, 12, 2);
-- Noon -> Far Rainbow (series)
INSERT INTO item_relation (lhs, rhs, type_id) VALUES (81, 1100, 7);

-- Item Profile
INSERT INTO item_profile (item_id, description, date_created, date_updated, flags, metadata)
  VALUES (1005, 'Fine Author', '2015-05-27 21:42:54 UTC', '2015-05-28 11:17:05 UTC', 1, '');

INSERT INTO item_profile (item_id, description, date_created, date_updated, flags)
  VALUES (1006, 'Another Fine Author', '2015-05-28 09:13:19 UTC', '2015-05-28 11:16:34 UTC', 1);

INSERT INTO item_profile (item_id, description, date_created, date_updated, flags)
  VALUES (1100, 'Part of Noon Universe', '2015-06-21 15:52:49 UTC', '2015-07-01 12:41:01 UTC', 1);


--
-- What relations can be fetched for a given item?
--

INSERT INTO item_list_relations (item_type_id, relation_type_id) VALUES (5, 1); -- book -> author
INSERT INTO item_list_relations (item_type_id, relation_type_id) VALUES (5, 2); -- book -> language
INSERT INTO item_list_relations (item_type_id, relation_type_id) VALUES (5, 7); -- book -> series
INSERT INTO item_list_relations (item_type_id, relation_type_id) VALUES (5, 8); -- book -> genre

COMMIT;

--
-- EOF
--
