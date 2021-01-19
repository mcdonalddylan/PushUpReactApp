package com.pushup.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "verify")
public class Verify {

	@Id
	private int code;
	
	@Column(nullable = true, unique = true)
	private String email;
	
	@Column
	private boolean used;
}
