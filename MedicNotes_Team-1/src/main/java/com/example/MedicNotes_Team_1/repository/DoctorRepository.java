package com.example.MedicNotes_Team_1.repository;


import com.example.MedicNotes_Team_1.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Doctor findByEmail(String email);
    Doctor findByPhone(String phone);

    List<Doctor> findByName(String name);
    List<Doctor> findByGender(Doctor.Gender gender);
    List<Doctor> findBySpecialization(String specialization);
    List<Doctor> findByStatus(Doctor.Status status);

    @Query("SELECT DISTINCT d.specialization FROM Doctor d WHERE d.specialization IS NOT NULL")
    List<String> findDistinctSpecializations();

}