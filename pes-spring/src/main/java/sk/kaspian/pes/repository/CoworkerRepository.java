package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Coworker;

import java.util.List;

@Repository
public interface CoworkerRepository extends JpaRepository<Coworker, Long>{

    List<Coworker> findByActiveTrue();
}
