package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.model.PersonFilterRequest;
import sk.kaspian.pes.openapi.model.v1.Card;

public interface CardService {

	/**
	 * Function return all cards created
	 * @return {@link List} {@link Card} list of Cards
	 */
	List<Card> getAllCards();

	/**
	 * Remove Card base on ID
	 * @param id {@link Long} id of Card
	 */

	void removeCard(Long id);

	/**
	 * update Card
	 * @param card {@link Card} campainge with update values
	 * @return {@link Card} updated Card
	 */
	Card updateCard(Card card);

	/**
	 * Create Card
	 * @param card {@link Card} object to crate
	 * @return {@link Card} return created object
	 */
	Card createCard(Card card);

	/**
	 * Return object base on id 
	 * @param id {@link Long} id of Card
	 * @return {@link Card} base on id
	 */
	Card getCardById(Long id);

	/**
	 * Activate or deactivate base of actual state togle states base on id
	 * @param id {@link Long} id of card that should be activated
	 * @return {@link Card} base on id
	 */
	Card activateTogleCard(Long id);

	/**
	 * Function return all cards created that have status set up true mean active
	 * @return {@link List} {@link Card} list of Cards
	 */
	List<Card> getAllActiveCards();

	/**
	 * Method that return cards base on filter values
	 * @param request {@link PersonFilterRequest} filter values object
	 * @return  {@link List} {@link Card} list of Cards filtered
	 */
	List<Card> filterCard(PersonFilterRequest request);
}
