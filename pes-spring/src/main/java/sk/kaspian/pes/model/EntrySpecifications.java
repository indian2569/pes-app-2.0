package sk.kaspian.pes.model;

import org.springframework.data.jpa.domain.Specification;

public class EntrySpecifications {
    public static Specification<Entry> withPlace(String place) {
        return (root, query, criteriaBuilder) -> {
            if (place == null || place.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("place"), "%" + place + "%");
        };
    }

    public static Specification<Entry> withCampaign(String campaign) {
        return (root, query, criteriaBuilder) -> {
            if (campaign == null || campaign.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("campaign"), "%" + campaign + "%");
        };
    }

    public static Specification<Entry> withYearFrom(String yearFrom) {
        return (root, query, criteriaBuilder) -> {
            if (yearFrom == null || yearFrom.isEmpty()) {
                return null;
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.get("year"), yearFrom);
        };
    }

    public static Specification<Entry> withYearTo(String yearTo) {
        return (root, query, criteriaBuilder) -> {
            if (yearTo == null || yearTo.isEmpty()) {
                return null;
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("year"), yearTo);
        };
    }

    public static Specification<Entry> withProgram(String program) {
        return (root, query, criteriaBuilder) -> {
            if (program == null || program.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("program"), "%" + program + "%");
        };
    }

    public static Specification<Entry> withAuthor(String author) {
        return (root, query, criteriaBuilder) -> {
            if (author == null || author.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("author"), "%" + author + "%");
        };
    }
}
