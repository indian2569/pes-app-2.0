package sk.kaspian.pes.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.annotation.Timed;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import sk.kaspian.pes.openapi.model.v1.Card;
import sk.kaspian.pes.openapi.server.controller.v1.CardApi;
import sk.kaspian.pes.service.CardService;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = "http://localhost:4200")
public class CardController implements CardApi {

	@NonNull
	private CardService cardService;
	

	@Override
	public ResponseEntity<List<Card>> getAllCard() {
		return ResponseEntity.ok(cardService.getAllCards());
	}

	@Override
	public ResponseEntity<Card> getCard(String code) {
		return ResponseEntity.ok(cardService.getCardById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Card> saveCard(@Valid Card card) {
		return ResponseEntity.ok(cardService.updateCard(card));
	}

	@Override
	public ResponseEntity<Void> deleteCard(String code) {
		cardService.removeCard(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
