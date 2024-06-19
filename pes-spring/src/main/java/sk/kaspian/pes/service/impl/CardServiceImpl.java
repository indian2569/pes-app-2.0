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
import sk.kaspian.pes.mapper.CardMapper;
import sk.kaspian.pes.model.Card;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.repository.CardRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.CardService;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService {

	@NonNull
	private CardRepository cardRepository;

	@Autowired
	private UserRepository userRepository;

	private CardMapper cardMapper;

	@Override
	@Transactional(readOnly = true)
	public List<sk.kaspian.pes.openapi.model.v1.Card> getAllCards() {
		return cardMapper.map(cardRepository.findAll());
	}

	@Override
	@Transactional
	public void removeCard(Long id) {
		cardRepository.deleteById(id);
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Card updateCard(sk.kaspian.pes.openapi.model.v1.Card card) {
		Card mappedCard = cardMapper.map(card);
		if (mappedCard.getId() == null) {
			mappedCard.setStatus(Boolean.TRUE);
		}
		fillSavableFields(mappedCard);
		return cardMapper.map(cardRepository.save(mappedCard));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Card createCard(sk.kaspian.pes.openapi.model.v1.Card card) {
		Card mappedCard = cardMapper.map(card);
		mappedCard.setStatus(Boolean.TRUE);
		fillSavableFields(mappedCard);
		return cardMapper.map(cardRepository.save(mappedCard));
	}

	@Override
	@Transactional(readOnly = true)
	public sk.kaspian.pes.openapi.model.v1.Card getCardById(Long id) {
		return cardMapper.map(cardRepository.getOne(id));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Card activateTogleCard(Long id) {
		Card cardToToggle = cardRepository.getReferenceById(id);
		cardRepository.activateCard(id, !cardToToggle.getStatus());
		return cardMapper.map(cardRepository.getReferenceById(id));
	}

	private void fillSavableFields(Card mappedCard) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Long id = userDetails.getId();
		User changedPerson = userRepository.getReferenceById(id);
		if (mappedCard.getCreated() == null) {
			mappedCard.setCreated(LocalDateTime.now());
			mappedCard.setCreatedBy(changedPerson);
		}
		mappedCard.setUpdated(LocalDateTime.now());
		mappedCard.setLastChange(changedPerson);
	}
}
