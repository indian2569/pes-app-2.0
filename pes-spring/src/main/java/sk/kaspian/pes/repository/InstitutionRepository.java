package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Institution;
@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {

}
