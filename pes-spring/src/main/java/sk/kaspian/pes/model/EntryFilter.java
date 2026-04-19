package sk.kaspian.pes.model;

import lombok.Data;

import java.util.Optional;

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
