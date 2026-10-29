package sk.kaspian.pes.service.impl;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;

import java.util.stream.Collectors;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.CardMapper;
import sk.kaspian.pes.model.Card;
import sk.kaspian.pes.model.CardFilter;
import sk.kaspian.pes.model.CardSpecifications;
import sk.kaspian.pes.model.PersonFilterRequest;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.CardPage;
import sk.kaspian.pes.repository.CardRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.repository.specialization.CardSpecification;
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
	public sk.kaspian.pes.openapi.model.v1.CardPage getAllCards(CardFilter filter) {
		if (filter == null) {
			CardPage cardPage = new CardPage();
			cardPage.setResults(cardMapper.map(cardRepository.findAll()));
			return cardPage;
		}
		Specification<Card> spec = Specification.where(CardSpecifications.withName(filter.getName()))
				.and(CardSpecifications.withGender(filter.getGender()))
				.and(CardSpecifications.withYearFrom(filter.getYearfrom()))
				.and(CardSpecifications.withYearTo(filter.getYearto()))
				.and(CardSpecifications.withAuthor(filter.getAuthor()));
		// Handle sorting
		Sort sort = Sort.by("id"); // Default sorting by id
		if (filter.getSort() != null && !filter.getSort().isEmpty()) {
			sort = Sort.by(Sort.Order.asc(filter.getSort()));
		}

		// Handle pagination
		Pageable pageable = PageRequest.of(filter.getPageNumber(), filter.getPageSize(), sort);

		return cardMapper.map(cardRepository.findAll(spec, pageable));
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
		Card existingCard = cardRepository.findById(mappedCard.getId())
				.orElseThrow(() -> new EntityNotFoundException("Card not found: " + mappedCard.getId()));
		mergeChangedFields(mappedCard, existingCard);
		fillSavableFields(mappedCard);
		return cardMapper.map(cardRepository.save(existingCard));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Card createCard(sk.kaspian.pes.openapi.model.v1.Card card) {
		Card mappedCard = cardMapper.map(card);
		mappedCard.setStatus(Boolean.TRUE);
		if (mappedCard.getClientBirthYear() != null && (mappedCard.getClientAge() == null || mappedCard.getClientAge().isEmpty()) ) {
			mappedCard.setClientAge(String.valueOf(calculateAge(mappedCard.getClientBirthYear())));
		}
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
		cardRepository.activateCard(id, cardToToggle.getStatus() != null ?!cardToToggle.getStatus(): Boolean.TRUE);
		return cardMapper.map(cardRepository.getReferenceById(id));
	}

	@Override
	public List<sk.kaspian.pes.openapi.model.v1.Card> getAllActiveCards() {
		return cardMapper.map(cardRepository.findByStatusTrue());
	}

	@Override
	public List<sk.kaspian.pes.openapi.model.v1.Card> filterCard(PersonFilterRequest request) {
		Sort sort = StringUtils.hasText(request.getSortBy())
				? Sort.by(Sort.Direction.fromOptionalString(request.getSortOrder()).orElse(Sort.Direction.ASC), request.getSortBy())
				: Sort.by("id");
		return cardRepository.findAll(CardSpecification.filter(request),sort)
				.stream().map(card -> cardMapper.map(card)).collect(Collectors.toList());
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

	private int calculateAge(String birthYearStr) {
		if (birthYearStr == null || birthYearStr.isBlank()) {
			throw new IllegalArgumentException("Birth year must not be null or empty");
		}

		int birthYear;
		try {
			birthYear = Integer.parseInt(birthYearStr);
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException("Invalid birth year format: " + birthYearStr);
		}

		int currentYear = Year.now().getValue();

		if (birthYear > currentYear) {
			throw new IllegalArgumentException("Birth year cannot be in the future");
		}

		return currentYear - birthYear;
	}

	private void mergeChangedFields(Card source, Card target) {
		if (source.getClientNick() != null) {
			target.setClientNick(source.getClientNick());
		}
		if (source.getClientGender() != null) {
			target.setClientGender(source.getClientGender());
		}
		if (source.getClientAnamnesis() != null) {
			target.setClientAnamnesis(source.getClientAnamnesis());
		}
		if (source.getClientDevPlan() != null) {
			target.setClientDevPlan(source.getClientDevPlan());
		}
		if (source.getClientAge() != null) {
			target.setClientAge(source.getClientAge());
		}
		if (source.getClientBirthYear() != null) {
			target.setClientBirthYear(source.getClientBirthYear());
		}
		if (source.getClientName() != null) {
			target.setClientName(source.getClientName());
		}
		if (source.getClientSurname() != null) {
			target.setClientSurname(source.getClientSurname());
		}
		if (source.getClientBirthDate() != null) {
			target.setClientBirthDate(source.getClientBirthDate());
		}
		if (source.getClientFamilyStatus() != null) {
			target.setClientFamilyStatus(source.getClientFamilyStatus());
		}
		if (source.getClientCitizenship() != null) {
			target.setClientCitizenship(source.getClientCitizenship());
		}
		if (source.getClientAddress() != null) {
			target.setClientAddress(source.getClientAddress());
		}
		if (source.getClientPhone() != null) {
			target.setClientPhone(source.getClientPhone());
		}
		if (source.getClientEmail() != null) {
			target.setClientEmail(source.getClientEmail());
		}
		if (source.getClientSocnet() != null) {
			target.setClientSocnet(source.getClientSocnet());
		}
		if (source.getClientHealth() != null) {
			target.setClientHealth(source.getClientHealth());
		}
		if (source.getClientIncome() != null) {
			target.setClientIncome(source.getClientIncome());
		}
		if (source.getClientBelongings() != null) {
			target.setClientBelongings(source.getClientBelongings());
		}
		if (source.getClientOtherInstitutes() != null) {
			target.setClientOtherInstitutes(source.getClientOtherInstitutes());
		}
		if (source.getStatus() != null) {
			target.setStatus(source.getStatus());
		}
	}
}
