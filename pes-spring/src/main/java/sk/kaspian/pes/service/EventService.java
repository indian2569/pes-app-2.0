package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.openapi.model.v1.Event;


public interface EventService {

	/**
	 * Function return all Events created
	 * @return {@link List} {@link Event} list of Events
	 */
	List<Event> getAllEvents();
	
	/**
	 * Remove object Event base on Id
	 * @param id {@link Long} id of Event
	 */
	
	void removeEvent(Long id);
	
	/**
	 * Create Event
	 * @param event object that we want to create
	 * @return {@link Event}
	 */
	Event createEvent(Event event);
	
	/**
	 * update Event
	 * @param event object with update values
	 * @return {@link Event} updated object
	 */
	Event updateEvent(Event event);
	
	/**
	 * Return object base on id
	 * @param id {@link Long} id of object
	 * @return {@link Event} object base on id
	 */
	Event getEventById(Long id);
	
	/**
	 * Function deactivate Event
	 * 
	 * @param id {@link Long} id of Event
	 * @return {@link Event} update object
	 */
	Event deactivateEvent(Long id);
}
