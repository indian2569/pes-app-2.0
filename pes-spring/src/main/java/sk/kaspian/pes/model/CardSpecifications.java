package sk.kaspian.pes.model;

import org.springframework.data.jpa.domain.Specification;

public class CardSpecifications {
    public static Specification<Card> withName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("clientNick"), "%" + name + "%");
        };
    }

    public static Specification<Card> withGender(String gender) {
        return (root, query, criteriaBuilder) -> {
            if (gender == null || gender.isEmpty()) {
                return null;
            }
            return criteriaBuilder.equal(root.get("clientGender"), gender);
        };
    }

    public static Specification<Card> withYearFrom(String yearFrom) {
        return (root, query, criteriaBuilder) -> {
            if (yearFrom == null || yearFrom.isEmpty()) {
                return null;
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("clientBirthYear"), yearFrom);
        };
    }

    public static Specification<Card> withYearTo(String yearTo) {
        return (root, query, criteriaBuilder) -> {
            if (yearTo == null || yearTo.isEmpty()) {
                return null;
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("clientBirthYear"), yearTo);
        };
    }

    public static Specification<Card> withAuthor(String author) {
        return (root, query, criteriaBuilder) -> {
            if (author == null || author.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("createdBy").get("username"), "%" + author + "%");
        };
    }
}
