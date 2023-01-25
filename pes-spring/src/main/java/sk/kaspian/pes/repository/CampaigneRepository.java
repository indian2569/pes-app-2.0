package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Campaigne;
@Repository
public interface CampaigneRepository extends JpaRepository<Campaigne, Long>{

}
