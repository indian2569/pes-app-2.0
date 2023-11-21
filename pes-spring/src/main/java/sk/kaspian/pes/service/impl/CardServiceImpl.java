package sk.kaspian.pes.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.CardMapper;
import sk.kaspian.pes.model.Card;
import sk.kaspian.pes.repository.CardRepository;
import sk.kaspian.pes.service.CardService;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService {

	@NonNull
	private CardRepository cardRepository;

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
		if (mappedCard.getCreateDate() == null) {
			mappedCard.setCreateDate(LocalDateTime.now());
		}
		return cardMapper.map(cardRepository.save(mappedCard));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Card createCard(sk.kaspian.pes.openapi.model.v1.Card card) {
		Card mappedCard = cardMapper.map(card);
		if (mappedCard.getCreateDate() == null) {
			mappedCard.setCreateDate(LocalDateTime.now());
		}
		return cardMapper.map(cardRepository.save(mappedCard));
	}

	@Override
	@Transactional(readOnly = true)
	public sk.kaspian.pes.openapi.model.v1.Card getCardById(Long id) {
		return cardMapper.map(cardRepository.getOne(id));
	}
}
