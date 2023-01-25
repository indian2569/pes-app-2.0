package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Institution;

@Mapper(componentModel = "spring")
public interface InstitutionMapper {

	List<Institution> map(List<sk.kaspian.pes.model.Institution> findAll);

	sk.kaspian.pes.model.Institution map(Institution institution);

	Institution map(sk.kaspian.pes.model.Institution save);

}
