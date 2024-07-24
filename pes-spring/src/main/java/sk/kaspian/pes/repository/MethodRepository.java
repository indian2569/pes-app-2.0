package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Method;

import java.util.List;

@Repository
public interface MethodRepository extends JpaRepository<Method, Long>{

    List<Method> findByActiveTrue();
}
