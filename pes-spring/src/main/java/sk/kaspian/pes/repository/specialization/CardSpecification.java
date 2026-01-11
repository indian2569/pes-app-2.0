package sk.kaspian.pes.repository.specialization;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import sk.kaspian.pes.model.Card;
import sk.kaspian.pes.model.PersonFilterRequest;

public class CardSpecification {

  private CardSpecification() {}

  public static Specification<Card> filter(PersonFilterRequest f) {
    return (root, query, cb) -> {

      List<Predicate> predicates = new ArrayList<>();

      if (StringUtils.hasText(f.getName())) {
        predicates.add(cb.like(
            cb.lower(root.get("client_nick")),
            "%" + f.getName().toLowerCase() + "%"
        ));
      }

      if (StringUtils.hasText(f.getSex())) {
        predicates.add(cb.equal(root.get("client_gender"), f.getSex()));
      }

      if (f.getActive() != null) {
        predicates.add(cb.equal(root.get("status"), f.getActive()));
      }

      if (f.getTimeFrom() != null) {
        predicates.add(cb.greaterThanOrEqualTo(
            root.get("client_birth_year"), f.getTimeFrom()
        ));
      }

      if (f.getTimeTo() != null) {
        predicates.add(cb.lessThanOrEqualTo(
            root.get("client_birth_year"), f.getTimeTo()
        ));
      }

      if (StringUtils.hasText(f.getCreatedBy())) {
        predicates.add(cb.equal(root.get("created_by"), f.getCreatedBy()));
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}
