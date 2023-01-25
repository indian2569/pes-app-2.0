package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Coworker;

@Mapper(componentModel = "spring")
public interface CoworkerMapper {

	List<Coworker> map(List<sk.kaspian.pes.model.Coworker> findAll);

	sk.kaspian.pes.model.Coworker map(Coworker coworker);

	Coworker map(sk.kaspian.pes.model.Coworker save);

}
