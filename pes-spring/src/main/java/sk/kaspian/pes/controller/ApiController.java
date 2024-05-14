package sk.kaspian.pes.controller;

import io.micrometer.core.annotation.Timed;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import sk.kaspian.pes.model.ERole;
import sk.kaspian.pes.model.Role;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.*;
import sk.kaspian.pes.openapi.server.controller.v1.ApiApi;
import sk.kaspian.pes.repository.RoleRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.security.JwtUtils;
import sk.kaspian.pes.service.*;
import sk.kaspian.pes.service.impl.UserDetailsImpl;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = {"http://localhost:4200", "https://kaspian-pes.online"})
public class ApiController implements ApiApi {

    @NonNull
    private EntryService entryService;

    @NonNull
    private CampaigneService campaignService;

    @NonNull
    private CardService cardService;

    @NonNull
    private CoworkerService coworkerService;

    @NonNull
    private EventService eventService;

    @NonNull
    private InstitutionService institutionService;

    @NonNull
    private MethodService methodService;

    @NonNull
    private ProgramService programService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public ResponseEntity<Void> deleteCampaign(String code) {
        campaignService.removeCampaigne(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deleteCard(String code) {
        cardService.removeCard(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deleteCoworker(String code) {
        coworkerService.removeCoworker(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deleteEntry(String code) {
        entryService.removeEntry(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deleteEvent(String code) {
        eventService.removeEvent(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deleteInstitutions(String code) {
        institutionService.removeInstitution(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deleteMethods(String code) {
        methodService.removeMethod(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<Void> deletePrograms(String code) {
        programService.removeProgram(Long.valueOf(code));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<List<Campaign>> getAllCampaign() {
        return ResponseEntity.ok(campaignService.getAllCompaignes());
    }

    @Override
    public ResponseEntity<List<Card>> getAllCard() {
        return ResponseEntity.ok(cardService.getAllCards());
    }

    @Override
    public ResponseEntity<List<Entry>> getAllCardEntrysMain(Card card) {
        return ResponseEntity.ok(entryService.getAllEntrysForCardMain(card));
    }

    @Override
    public ResponseEntity<List<Coworker>> getAllCoworker() {
        return ResponseEntity.ok(coworkerService.getAllCompaignes());
    }

    @Override
    public ResponseEntity<List<Entry>> getAllEntry() {
        return ResponseEntity.ok(entryService.getAllEntrys());
    }

    @Override
    public ResponseEntity<List<Event>> getAllEvent() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @Override
    public ResponseEntity<List<Institution>> getAllInstitutions() {
        return ResponseEntity.ok(institutionService.getAllInstitutions());
    }

    @Override
    public ResponseEntity<List<Method>> getAllMethods() {
        return ResponseEntity.ok(methodService.getAllMethods());
    }

    @Override
    public ResponseEntity<List<Program>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    @Override
    public ResponseEntity<Campaign> getCampaign(String code) {
        return ResponseEntity.ok(campaignService.getCampaigneById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<Card> getCard(String code) {
        return ResponseEntity.ok(cardService.getCardById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<Coworker> getCoworker(String code) {
        return ResponseEntity.ok(coworkerService.getCoworkerById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<Entry> getEntry(String code) {
        return ResponseEntity.ok(entryService.getEntryById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<Event> getEvent(String code) {
        return ResponseEntity.ok(eventService.getEventById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<Institution> getInstitutions(String code) {
        return ResponseEntity.ok(institutionService.getInstitutionById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<List<Entry>> getListNewEntrys(Optional<Integer> pageSize) {
        return ResponseEntity.ok(entryService.getListOfNewEntrys(pageSize));
    }

    @Override
    public ResponseEntity<Method> getMethods(String code) {
        return ResponseEntity.ok(methodService.getMethodById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<List<Entry>> getNewUserEntrys() {
        User user = new User();
        return ResponseEntity.ok(entryService.getLastFiveEntrysForUser(user));
    }

    @Override
    public ResponseEntity<Program> getPrograms(String code) {
        return ResponseEntity.ok(programService.getProgramById(Long.valueOf(code)));
    }

    @Override
    public ResponseEntity<List<Entry>> getallCardEntrysOnSite(Card card) {
        return null;
    }

    @Override
    public ResponseEntity<JwtResponse> login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        JwtResponse jwtRespo = new JwtResponse();
        jwtRespo.setToken(jwt);
        jwtRespo.setId(BigDecimal.valueOf(userDetails.getId()));
        jwtRespo.setUsername(userDetails.getUsername());
        jwtRespo.setEmail(userDetails.getEmail());
        jwtRespo.setRoles(roles);
        return ResponseEntity.ok(jwtRespo);
    }

    @Override
    public ResponseEntity<MessageResponse> registerAcess(SignUpRequest signUpRequest) {
        MessageResponse response = new MessageResponse();
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            response.setMessage("Error: Username is already taken!");
            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            response.setMessage("Error: Email is already in use!");
            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = new HashSet<>();
        if (signUpRequest.getRoles()!= null) {
            strRoles.addAll(signUpRequest.getRoles());
        }
        Set<Role> roles = new HashSet<>();

        if (!strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
        response.setMessage("User registered successfully!");
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Campaign> saveCampaign(Campaign campaign) {
        return ResponseEntity.ok(campaignService.updateCampaigne(campaign));
    }

    @Override
    public ResponseEntity<Card> saveCard(Card card) {
        return ResponseEntity.ok(cardService.updateCard(card));
    }

    @Override
    public ResponseEntity<Coworker> saveCoworker(Coworker coworker) {
        return ResponseEntity.ok(coworkerService.updateCoworker(coworker));
    }

    @Override
    public ResponseEntity<Entry> saveEntry(Entry entry) {
        return ResponseEntity.ok(entryService.updateEntry(entry));
    }

    @Override
    public ResponseEntity<Event> saveEvent(Event event) {
        return ResponseEntity.ok(eventService.updateEvent(event));
    }

    @Override
    public ResponseEntity<Institution> saveInstitutions(Institution institution) {
        return ResponseEntity.ok(institutionService.updateInstitution(institution));
    }

    @Override
    public ResponseEntity<Method> saveMethods(Method method) {
        return ResponseEntity.ok(methodService.updateMethod(method));
    }

    @Override
    public ResponseEntity<Program> savePrograms(Program program) {
        return ResponseEntity.ok(programService.updateProgram(program));
    }
}
