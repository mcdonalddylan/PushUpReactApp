package com.pushup.repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pushup.model.Users;

@Repository
@Transactional
public interface UsersRepo extends JpaRepository<Users,Integer>{
	
	/**
	 * Automated method which retrieves user information from a given
	 *  email
	 *  
	 * @param email
	 * @return
	 */
	public Users findByEmail(String email);
	
	public Users findByEmailAndPassword(String email, String password);
	
	@Modifying
	@Query("update Users u set u.verified = ?1 where  u.id = ?2") //'U' in users has to be capitalized here since it's referring to the Entity name
	public void setVerifiedForUsers(boolean verified, Integer id);
	
	@Modifying
	@Query("update Users u set u.password = ?1 where  u.email = ?2") //'U' in users has to be capitalized here since it's referring to the Entity name
	public void setPasswordForUsers(String password, String email);
	
	@Modifying
	@Query("update Users u set u.firstName = ?1 where  u.email = ?2") //'U' in users has to be capitalized here since it's referring to the Entity name
	public void setFirstNameForUsers(String firstName, String email);
	
	@Modifying
	@Query("update Users u set u.lastName = ?1 where  u.email = ?2") //'U' in users has to be capitalized here since it's referring to the Entity name
	public void setLastNameForUsers(String lastName, String email);
}
