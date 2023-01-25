package sk.kaspian.pes.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "card")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@RequiredArgsConstructor
public class Card implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@NonNull
	private Long id;
	
	@Column(name = "client_nick")
	private String clientNick;

	@Column(name = "client_gender")
	private String clientGender;	

	@Column(name = "client_anamnesis")
	private String clientAnamnesis;

	@Column(name = "client_dev_plan")
	private String clientDevPlan;

	@Column(name = "client_age")
	private String clientAge;

	@Column(name = "client_birth_year")
	private String clientBirthYear;

	@Column(name = "client_name")
	private String clientName;

	@Column(name = "client_surname")
	private String clientSurname;	

	@Column(name = "client_birth_date")
	private String clientBirthDate;

	@Column(name = "client_family_status")
	private String clientFamilyStatus;

	@Column(name = "client_citizenship")
	private String clientCitizenship;

	@Column(name = "client_address")
	private String clientAddress;

	@Column(name = "client_phone")
	private String clientPhone;

	@Column(name = "client_email")
	private String clientEmail;

	@Column(name = "client_socnet")
	private String clientSocnet;

	@Column(name = "client_health")
	private String clientHealth;

	@Column(name = "client_income")
	private String clientIncome;

	@Column(name = "client_belongings")
	private String clientBelongings;

	@OneToMany(mappedBy = "id", fetch = FetchType.LAZY)
	private List<Institution> clientOtherInstitutes;

	@Column(name = "created_by")
	private String createdBy;

	@Column(name = "status")
	private Boolean status;

	@Column(name = "create_date")
	private LocalDateTime createDate;
}
