package briefly.website.service;

import briefly.eolaire.model.EolaireModel;
import com.google.protobuf.InvalidProtocolBufferException;
import org.junit.Test;

import javax.xml.bind.DatatypeConverter;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertTrue;

/**
 * Tests serializing and deserializing metadata
 */
public final class MetadataSerializationTest {

  /**
   * NOTE: this test is important as by default metadata will be empty in eolaire-schema tables.
   */
  @Test
  public void shouldSerializeEmptyMetadataToEmptyByteArray() {
    // Given:
    final EolaireModel.Metadata metadata = EolaireModel.Metadata.newBuilder().build();

    // When:
    final byte[] bytes = metadata.toByteArray();

    // Then:
    assertArrayEquals(new byte[0], bytes);
  }

  @Test
  public void shouldDeserializeSampleMetadataSnapshot() throws InvalidProtocolBufferException {
    // Given:
    final String data = "0a0d0a056c6962496410081a0210180a110a076c696253697a6510071a" +
        "0408eefe040a150a086c6962416464656410081a071080e0b6b3b422";

    // When:
    final byte[] bytes = DatatypeConverter.parseHexBinary(data);
    final EolaireModel.Metadata metadata = EolaireModel.Metadata.parseFrom(bytes);

    // Then:
    assertTrue(metadata.getEntriesCount() > 0);
  }
}
