package sk.kaspian.pes.model;

import java.io.Serializable;

import jakarta.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "coworker")
@EqualsAndHashCode(callSuper = false, of = "name")
@NoArgsConstructor
@RequiredArgsConstructor
public class Coworker extends SaveableObject implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@NonNull
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "position")
	private String position;

	@Column(name = "active")	
	private boolean active;
}
