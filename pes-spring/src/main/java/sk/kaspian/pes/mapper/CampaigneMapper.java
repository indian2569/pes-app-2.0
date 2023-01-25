package sk.kaspian.pes.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import sk.kaspian.pes.model.Campaigne;
import sk.kaspian.pes.openapi.model.v1.Campaign;

@Mapper(componentModel = "spring")
public interface CampaigneMapper {

	List<Campaign> map(List<Campaigne> findAll);

	Campaign map(Campaigne camp);

	sk.kaspian.pes.model.Campaigne map(Campaign campaigne);
}
