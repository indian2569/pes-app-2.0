package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Entry;

@Mapper(componentModel = "spring")
public interface EntryMapper {

	List<Entry> map(List<sk.kaspian.pes.model.Entry> findAll);

	sk.kaspian.pes.model.Entry  map(Entry entryInput);

	Entry map(sk.kaspian.pes.model.Entry one);

}
