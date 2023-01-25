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
import sk.kaspian.pes.openapi.model.v1.Campaign;
import sk.kaspian.pes.openapi.server.controller.v1.CampaignApi;
import sk.kaspian.pes.service.CampaigneService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@Timed

public class CampaignController implements CampaignApi {

	@NonNull
	private CampaigneService campaignService;

	@Override
	public ResponseEntity<List<Campaign>> getAllCampaign() {
		return ResponseEntity.ok(campaignService.getAllCompaignes());
	}

	@Override
	public ResponseEntity<Campaign> getCampaign(String code) {
		return ResponseEntity.ok(campaignService.getCampaigneById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Campaign> saveCampaign(@Valid Campaign campaign) {
		return ResponseEntity.ok(campaignService.updateCampaigne(campaign));
	}

	@Override
	public ResponseEntity<Void> deleteCampaign(String code) {
		campaignService.removeCampaigne(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
