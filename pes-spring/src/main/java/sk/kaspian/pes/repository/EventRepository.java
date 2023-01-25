package sk.kaspian.pes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sk.kaspian.pes.model.Event;

@Repository
public interface EventRepository  extends JpaRepository<Event, Long>{
}
