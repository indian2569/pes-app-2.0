package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Event;

@Mapper(componentModel = "spring")
public interface EventMapper {

	List<Event> map(List<sk.kaspian.pes.model.Event> findAll);

	sk.kaspian.pes.model.Event map(Event event);

	Event map(sk.kaspian.pes.model.Event save);

}
