package briefly.model.comment;

import lombok.*;

/**
 * @author Alexander Shabanov
 */
@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public final class Comment {
  private final Long id;
  private final long sourceId;
  private final long sourceTypeId;
  private final long authorId;
  private final String content;
}
