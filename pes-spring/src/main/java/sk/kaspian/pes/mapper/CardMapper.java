package sk.kaspian.pes.mapper;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;

import org.springframework.data.domain.Page;
import sk.kaspian.pes.openapi.model.v1.Card;
import sk.kaspian.pes.openapi.model.v1.CardPage;
import sk.kaspian.pes.openapi.model.v1.Paging;

@Mapper(componentModel = "spring")
public interface CardMapper {

	List<Card> map(List<sk.kaspian.pes.model.Card> findAll);

	sk.kaspian.pes.model.Card map(Card card);

	Card map(sk.kaspian.pes.model.Card save);

    default CardPage map(Page<sk.kaspian.pes.model.Card> pageValus) {
		var page = new CardPage();
		page.setPaging(toPaging(pageValus));
		page.setResults(map(pageValus.getContent()));
		return page;
	};

	default Paging toPaging(Page<?> page) {
		var paging = new Paging();
		paging.setPageCount(page.getTotalPages());
		paging.setPageNumber(page.getNumber());
		paging.setPageSize(page.getSize());
		paging.setTotalElements(page.getTotalElements());
		return paging;
	}

}
