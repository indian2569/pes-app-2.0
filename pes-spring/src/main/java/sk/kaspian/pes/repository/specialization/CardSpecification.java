package sk.kaspian.pes.repository.specialization;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.criteria.Predicate;
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
            cb.lower(root.<String>get("clientNick")),
            "%" + f.getName().toLowerCase() + "%"
        ));
      }

      if (StringUtils.hasText(f.getSex())) {
        predicates.add(cb.equal(root.get("clientGender"), f.getSex()));
      }

      if (f.getActive() != null) {
        predicates.add(cb.equal(root.get("status"), f.getActive()));
      }

      if (f.getTimeFrom() != null) {
        predicates.add(cb.greaterThanOrEqualTo(
            root.<String>get("clientBirthYear"), String.valueOf(f.getTimeFrom().getYear())
        ));
      }

      if (f.getTimeTo() != null) {
        predicates.add(cb.lessThanOrEqualTo(
            root.<String>get("clientBirthYear"), String.valueOf(f.getTimeTo().getYear())
        ));
      }

      if (StringUtils.hasText(f.getCreatedBy())) {
        predicates.add(cb.equal(root.get("createdBy").get("username"), f.getCreatedBy()));
      }

      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}
