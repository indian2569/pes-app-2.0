package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Card;
import sk.kaspian.pes.openapi.model.v1.Entry;

public interface EntryService {
	
	/**
	 * Function return all Entry's created
	 * @return {@link List} {@link EntryService} list of Entrys
	 */
	List<Entry> getAllEntrys();
	
	/**
	 * remove Entry
	 * @param id
	 */
	
	void removeEntry(Long id);
	
	/**
	 * update Entry 
	 * @param entry
	 * @return
	 */
	Entry createEntry(Entry entry);
	
	/**
	 * update or create Entry
	 * @param campaigne
	 * @return
	 */
	Entry updateEntry(Entry campaigne);
	
	/**
	 * Return object base on id 
	 * @param id
	 * @return
	 */
	Entry getEntryById(Long id);

	/**
	 * Return all entry's that have contains input card
	 * @param @ {@link Card} find entry with use this card object
	 * @return {@link List} {@link Entry} list of entry
	 */
	List<Entry> getAllForCard(Card card);

	/**
	 * Return all entry's that have contains input card
	 * @param @ {@link User} user for what we want to find entry's
	 * @return {@link List} {@link Entry} list of entry
	 */
	List<Entry> getLastFiveEntrysForUser(User user);

}
