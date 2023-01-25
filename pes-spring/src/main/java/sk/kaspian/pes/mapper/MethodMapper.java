package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.openapi.model.v1.Method;

@Mapper(componentModel = "spring")
public interface MethodMapper {

	List<Method> map(List<sk.kaspian.pes.model.Method> findAll);

	sk.kaspian.pes.model.Method map(Method method);

	Method map(sk.kaspian.pes.model.Method save);

}
