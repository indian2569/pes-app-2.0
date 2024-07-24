package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Campaigne;

import java.util.List;

@Repository
public interface CampaigneRepository extends JpaRepository<Campaigne, Long>{

    List<Campaigne> findByActiveTrue();
}
