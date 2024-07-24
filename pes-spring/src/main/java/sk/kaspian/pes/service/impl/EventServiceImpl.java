package sk.kaspian.pes.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.EventMapper;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Event;
import sk.kaspian.pes.repository.EventRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.EventService;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

	@NonNull
	private EventRepository eventRepository;

	@Autowired
	private UserRepository userRepository;

	private EventMapper eventMapper ;

	@Override
	@Transactional(readOnly = true)
	public List<Event> getAllEvents() {
		return eventMapper.map(eventRepository.findAll());
	}

	@Override
	@Transactional
	public void removeEvent(Long id) {
		eventRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Event createEvent(Event event) {
		sk.kaspian.pes.model.Event map = eventMapper.map(event);
		map.setActive(Boolean.TRUE);
		fillSavableFields(map);
		return eventMapper.map(eventRepository.save(map));
	}

	@Override
	@Transactional
	public Event updateEvent(Event event) {		sk.kaspian.pes.model.Event map = eventMapper.map(event);
		fillSavableFields(map);
		return eventMapper.map(eventRepository.save(map));
	}

	@Override
	@Transactional(readOnly = true)
	public Event getEventById(Long id) {
		return eventMapper.map(eventRepository.getOne(id));
	}

	@Override
	@Transactional
	public Event deactivateEvent(Long id) {
		sk.kaspian.pes.model.Event event = eventRepository.getOne(id);
		event.setActive(Boolean.FALSE);
		return eventMapper.map(eventRepository.save(event));
	}

	@Override
	public List<Event> getAllActiveEvents() {
		return eventMapper.map(eventRepository.findByActiveTrue());
	}

	private void fillSavableFields(sk.kaspian.pes.model.Event updatable) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Long id = userDetails.getId();
		User changedPerson = userRepository.getReferenceById(id);
		if (updatable.getCreated() == null) {
			updatable.setCreated(LocalDateTime.now());
			updatable.setCreatedBy(changedPerson);
		}
		updatable.setUpdated(LocalDateTime.now());
		updatable.setLastChange(changedPerson);
	}
}
