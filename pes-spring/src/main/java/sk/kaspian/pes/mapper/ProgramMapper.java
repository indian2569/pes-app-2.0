package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Program;

@Mapper(componentModel = "spring")
public interface ProgramMapper {

	List<Program> map(List<sk.kaspian.pes.model.Program> findAll);

	sk.kaspian.pes.model.Program map(Program program);

	Program map(sk.kaspian.pes.model.Program save);

}
