package sk.kaspian.pes.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
            return criteriaBuilder.like(root.get("campaign").get("name"), "%" + campaign + "%");
        };
    }

    /** yearFrom is a date (yyyy-MM-dd) or a year (yyyy); matches entries starting on or after it. */
    public static Specification<Entry> withYearFrom(String yearFrom) {
        return (root, query, criteriaBuilder) -> {
            if (yearFrom == null || yearFrom.isEmpty()) {
                return null;
            }
            return criteriaBuilder.greaterThanOrEqualTo(root.<LocalDateTime>get("entryDateFrom"), toDate(yearFrom).atStartOfDay());
        };
    }

    /** yearTo is a date (yyyy-MM-dd) or a year (yyyy); matches entries starting on or before that whole day/year. */
    public static Specification<Entry> withYearTo(String yearTo) {
        return (root, query, criteriaBuilder) -> {
            if (yearTo == null || yearTo.isEmpty()) {
                return null;
            }
            LocalDate end = yearTo.length() == 4 ? toDate(yearTo).plusYears(1) : toDate(yearTo).plusDays(1);
            return criteriaBuilder.lessThan(root.<LocalDateTime>get("entryDateFrom"), end.atStartOfDay());
        };
    }

    public static Specification<Entry> withProgram(String program) {
        return (root, query, criteriaBuilder) -> {
            if (program == null || program.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("programType").get("name"), "%" + program + "%");
        };
    }

    public static Specification<Entry> withAuthor(String author) {
        return (root, query, criteriaBuilder) -> {
            if (author == null || author.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("createdBy").get("username"), "%" + author + "%");
        };
    }

    private static LocalDate toDate(String value) {
        return value.length() == 4 ? LocalDate.of(Integer.parseInt(value), 1, 1) : LocalDate.parse(value);
    }
}
