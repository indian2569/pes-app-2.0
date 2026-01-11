package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Card;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long>,
    JpaSpecificationExecutor<Card> {


    @Query(value = "UPDATE card SET status = :setValue WHERE id = :cardId", nativeQuery = true)
    @Modifying
    void activateCard(@Param("cardId") Long id, @Param("setValue") boolean setValue);

    List<Card> findByStatusTrue();
}
