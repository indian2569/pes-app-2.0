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

	@Query("select e from Entry e")
	List<Entry> getAllByCard(@Param("id") BigDecimal id);

	@Query("select q from Entry q")
	List<Entry> getFiveNewestEntryForUser(@Param("id") Long id);

}
