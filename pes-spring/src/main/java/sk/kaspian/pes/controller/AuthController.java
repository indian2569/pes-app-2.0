package sk.kaspian.pes.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import sk.kaspian.pes.model.ERole;
import sk.kaspian.pes.model.Role;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.JwtResponse;
import sk.kaspian.pes.openapi.model.v1.MessageResponse;
import sk.kaspian.pes.openapi.model.v1.SignUpRequest;
import sk.kaspian.pes.openapi.server.controller.v1.AuthApi;
import sk.kaspian.pes.service.impl.UserDetailsImpl;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.repository.RoleRepository;
import sk.kaspian.pes.security.JwtUtils;

@CrossOrigin(origins = {"http://localhost:4200", "http://64.226.108.218:4200"}, maxAge = 3600)
@RestController
@RequiredArgsConstructor
@Timed

public class AuthController implements AuthApi {
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
	public ResponseEntity<sk.kaspian.pes.openapi.model.v1.MessageResponse> registerAcess(@Valid SignUpRequest signUpRequest) {
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
	public ResponseEntity<JwtResponse> login(sk.kaspian.pes.openapi.model.v1.@Valid LoginRequest loginRequest) {

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


}
