package com.example.MedicNotes_Team_1.repository;

import com.example.MedicNotes_Team_1.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByEmail(String email);

    Optional<Patient> findByPhone(String phone);

    List<Patient> findByGender(Patient.Gender gender);

    List<Patient> findByName(String name);

    List<Patient> findByTreatment(String treatment);

    List<Patient> findByCreatedAtBetween(Date startDate, Date endDate);

}

