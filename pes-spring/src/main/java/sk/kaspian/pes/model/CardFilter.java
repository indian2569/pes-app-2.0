package sk.kaspian.pes.model;

import lombok.Data;

import java.util.Optional;

@Data
public class CardFilter {
    Integer pageSize;
    Integer pageNumber;
    String sort;
    String name;
    String gender;
    String yearfrom;
    String yearto;
    String author;
}
