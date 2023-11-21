package sk.kaspian.pes.repository;

import java.math.BigDecimal;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import sk.kaspian.pes.model.Entry;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface EntryRepository extends JpaSpecificationExecutor<Entry>, JpaRepository<Entry, Long>{

	@Query("SELECT e FROM Entry e WHERE e.id IN (:cardId)")
	List<Entry> getAllEntrysMatchingListOfIds(@Param("cardId") List<Long> ids);

	@Query("select q from Entry q")
	List<Entry> getFiveNewestEntryForUser(@Param("id") Long id);

	@Query(value = "SELECT c.entry_id FROM pes_entry_clients c WHERE c.card_id = :cardId", nativeQuery = true)
	List<Long> getAllEntrysIdByCardForClients(@Param("cardId") Long id);

	@Query(value = "SELECT c.entry_id FROM pes_entry_card c WHERE c.card_id = :cardId", nativeQuery = true)
	List<Long> getAllEntrysIdByCardForClientsOnSite(@Param("cardId") Long id);

}
