package sk.kaspian.pes.model;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonFilterRequest {
  private String name;
  private String sex;
  private LocalDate timeFrom;
  private LocalDate timeTo;
  private Boolean active;
  private String createdBy;
  private String sortBy;
  private String sortOrder;
}
