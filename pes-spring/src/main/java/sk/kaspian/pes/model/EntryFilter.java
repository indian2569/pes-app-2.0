package sk.kaspian.pes.model;

import lombok.Data;


@Data
public class EntryFilter {
    Integer pageSize;
    Integer pageNumber;
    String sort;
    String place;
    String campaign;
    String yearfrom;
    String yearto;
    String program;
    String author;
}
