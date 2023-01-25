package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Program;
@Repository
public interface ProgramRepository extends JpaRepository<Program, Long>{

}
