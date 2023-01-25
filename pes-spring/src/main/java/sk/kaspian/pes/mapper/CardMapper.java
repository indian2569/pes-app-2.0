package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Card;

@Mapper(componentModel = "spring")
public interface CardMapper {

	List<Card> map(List<sk.kaspian.pes.model.Card> findAll);

	sk.kaspian.pes.model.Card map(Card card);

	Card map(sk.kaspian.pes.model.Card save);

}
