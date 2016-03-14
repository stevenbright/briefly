package briefly.website.service.support;

import briefly.eolaire.model.EolaireModel;
import briefly.website.service.EolaireItemService;
import com.google.protobuf.InvalidProtocolBufferException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

/**
 * @author Alexander Shabanov
 */
@Transactional
public class DefaultEolaireItemService extends AbstractService implements EolaireItemService {
  private final JdbcOperations db;

  public DefaultEolaireItemService(JdbcOperations jdbcOperations) {
    this.db = Objects.requireNonNull(jdbcOperations, "jdbcOperations");
  }

  @Nonnull
  @Override
  @Transactional(readOnly = true)
  public EolaireModel.Item getItemById(long id) {
    return db.queryForObject("SELECT id, name, type_id FROM item WHERE id=?", new ItemRowMapper(), id);
  }

  @Nonnull
  @Override
  public List<EolaireModel.ItemProfile> getItemProfile(long itemId) {
    return db.query("SELECT item_id, description, date_created, date_updated, flags, metadata FROM item_profile " +
        "WHERE item_id=?", new ItemProfileRowMapper(), itemId);
  }

  @Nonnull
  @Override
  public List<EolaireModel.EntityType> getEntityTypeByName(@Nonnull String name) {
    return db.query("SELECT id, name FROM entity_type WHERE name=?", new EntityTypeRowMapper(), name);
  }

  @Nonnull
  @Override
  public List<EolaireModel.EntityType> getEntityTypesOrderedById(@Nullable Long startEntityId, int limit) {
    if (startEntityId == null) {
      return db.query("SELECT id, name FROM entity_type ORDER BY id LIMIT ?", new EntityTypeRowMapper(), limit);
    }

    return db.query("SELECT id, name FROM entity_type WHERE id > ? ORDER BY id LIMIT ?", new EntityTypeRowMapper(),
        startEntityId, limit);
  }

  @Nonnull
  @Override
  public List<Long> getItemIdsByType(long itemTypeId, @Nullable Long startEntityId, int limit) {
    // NOTE: ORDER BY type_id, id - is here because H2 disregards indexes in ORDER BY when ids in WHERE are not used
    final String sql = "SELECT id FROM item WHERE type_id=? AND ((? IS NULL) OR (id > ?)) ORDER BY type_id, id LIMIT ?";
    return db.queryForList(sql,
        Long.class, itemTypeId, startEntityId, startEntityId, limit);
  }

  @Nonnull
  @Override
  public List<Long> getItemIdsByRelation(long itemId,
                                         @Nullable Long relationTypeId,
                                         @Nullable Long relatedItemTypeId,
                                         @Nullable Long startEntityId,
                                         int limit) {
    return db.queryForList("SELECT l.id FROM item AS l\n" +
            "INNER JOIN item_relation AS ir ON ir.lhs=l.id\n" +
            "INNER JOIN item AS r ON ir.rhs=r.id\n" +
            "WHERE r.id=? " +
            "AND ((? IS NULL) OR (ir.type_id=?)) " +
            "AND ((? IS NULL) OR (l.type_id=?)) " +
            "AND ((? IS NULL) OR (l.id > ?)) " +
            "ORDER BY id " +
            "LIMIT ?",
        Long.class,
        itemId,
        relationTypeId, relationTypeId,
        relatedItemTypeId, relatedItemTypeId,
        startEntityId, startEntityId,
        limit);
  }

  @Nonnull
  @Override
  public List<EolaireModel.ItemRelation> getItemRelations(long itemId, EolaireModel.RelationsFilterMode filterMode) {
    switch (filterMode) {
      case ALL:
        return db.query("SELECT rhs, type_id, metadata FROM item_relation WHERE lhs=? ORDER BY rhs",
            new ItemRelationRowMapper(), itemId);

      case ITEM_LIST:
        return db.query("SELECT ir.rhs, ir.type_id, ir.metadata FROM item_relation AS ir\n" +
                "INNER JOIN item AS i ON i.id=ir.lhs\n" +
                "INNER JOIN item_list_relations AS ilr ON ilr.item_type_id=i.type_id\n" +
                "WHERE ir.lhs=? AND ilr.relation_type_id=ir.type_id ORDER BY ir.rhs",
            new ItemRelationRowMapper(), itemId);

      default:
        throw new UnsupportedOperationException("Unsupported filterMode=" + filterMode + " for itemId=" + itemId);
    }
  }

  //
  // Mappers
  //

  private static final class ItemRelationRowMapper implements RowMapper<EolaireModel.ItemRelation> {

    @Override
    public EolaireModel.ItemRelation mapRow(ResultSet rs, int i) throws SQLException {
      return EolaireModel.ItemRelation.newBuilder()
          .setTargetItemId(rs.getLong("rhs"))
          .setRelationTypeId(rs.getLong("type_id"))
          .setMetadata(getMetadata(rs, "metadata"))
          .build();
    }
  }

  private static final class EntityTypeRowMapper implements RowMapper<EolaireModel.EntityType> {

    @Override
    public EolaireModel.EntityType mapRow(ResultSet rs, int rowNum) throws SQLException {
      return EolaireModel.EntityType.newBuilder()
          .setId(rs.getLong("id"))
          .setName(rs.getString("name"))
          .build();
    }
  }

  private static final class ItemRowMapper implements RowMapper<EolaireModel.Item> {

    @Override
    public EolaireModel.Item mapRow(ResultSet rs, int rowNum) throws SQLException {
      return EolaireModel.Item.newBuilder()
          .setId(rs.getLong("id"))
          .setName(rs.getString("name"))
          .setItemTypeId(rs.getLong("type_id"))
          .build();
    }
  }

  private static final class ItemProfileRowMapper implements RowMapper<EolaireModel.ItemProfile> {

    @Override
    public EolaireModel.ItemProfile mapRow(ResultSet rs, int rowNum) throws SQLException {
      final String description = rs.getString("description");
      return EolaireModel.ItemProfile.newBuilder()
          .setItemId(rs.getLong("item_id"))
          .setDescription(description != null ? description : "")
          .setCreated(rs.getTimestamp("date_created").getTime())
          .setUpdated(rs.getTimestamp("date_updated").getTime())
          .setFlags(rs.getLong("flags"))
          .setMetadata(getMetadata(rs, "metadata"))
          .build();
    }
  }

  private static EolaireModel.Metadata getMetadata(ResultSet rs, String name) throws SQLException {
    final byte[] metadataBytes = rs.getBytes(name);
    if (metadataBytes == null) {
      return EolaireModel.Metadata.newBuilder().build();
    }

//    try {
//      //EolaireModel.MetadataEntry.parseFrom("");
//    } catch (InvalidProtocolBufferException ignored) {
//      LoggerFactory.getLogger(DefaultEolaireItemService.class).debug("", ignored);
//    }

    try {
      return EolaireModel.Metadata.parseFrom(metadataBytes);
    } catch (InvalidProtocolBufferException e) {
      // TODO: proper deserialization
      final Logger logger = LoggerFactory.getLogger(DefaultEolaireItemService.class);
      logger.debug("Unable to deserialize item metadata", e); // Produces a lot of log entries
      logger.error("Invalid metadata entry for item");
      //throw new SQLException("Unable to deserialize metadata", e);

      return EolaireModel.Metadata.newBuilder().build();
    }
  }
}
