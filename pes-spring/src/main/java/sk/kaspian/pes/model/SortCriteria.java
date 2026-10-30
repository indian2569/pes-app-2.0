package sk.kaspian.pes.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Sort;

/**
 * Parses the `sort` query parameter described in pes.yaml:
 * "property1,property2(desc),property(asc)", e.g. "name,type(desc)".
 */
public final class SortCriteria {

    private SortCriteria() {
    }

    public static Sort parse(String sort, Sort defaultSort) {
        if (sort == null || sort.isBlank()) {
            return defaultSort;
        }
        List<Sort.Order> orders = new ArrayList<>();
        for (String part : sort.split(",")) {
            String property = part.trim();
            if (property.isEmpty()) {
                continue;
            }
            if (property.endsWith("(desc)")) {
                orders.add(Sort.Order.desc(property.substring(0, property.length() - "(desc)".length())));
            } else if (property.endsWith("(asc)")) {
                orders.add(Sort.Order.asc(property.substring(0, property.length() - "(asc)".length())));
            } else {
                orders.add(Sort.Order.asc(property));
            }
        }
        return orders.isEmpty() ? defaultSort : Sort.by(orders);
    }
}
