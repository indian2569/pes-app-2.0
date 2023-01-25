package sk.kaspian.pes.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.EventMapper;
import sk.kaspian.pes.openapi.model.v1.Event;
import sk.kaspian.pes.repository.EventRepository;
import sk.kaspian.pes.service.EventService;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

	@NonNull
	private EventRepository eventRepository;

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
		return eventMapper.map(eventRepository.save(eventMapper.map(event)));
	}

	@Override
	@Transactional
	public Event updateEvent(Event event) {
		return eventMapper.map(eventRepository.save(eventMapper.map(event)));
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

}
