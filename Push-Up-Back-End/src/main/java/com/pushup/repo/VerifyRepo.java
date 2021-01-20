package com.pushup.repo;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pushup.model.Verify;

@Repository
@Transactional
public interface VerifyRepo extends JpaRepository<Verify,Integer>{

	@Modifying
	@Query("update Verify v set v.used = ?1 where  v.code = ?2") //'V' in verify has to be capitalized here since it's referring to the Entity name
	public void setUsedForVerify(boolean used, Integer code);
	
	public Verify findByCode(Integer code);
	
	@Modifying
	@Query("delete Verify v where  v.email = ?1") //'V' in verify has to be capitalized here since it's referring to the Entity name
	public void deleteByEmail(String email);
}
