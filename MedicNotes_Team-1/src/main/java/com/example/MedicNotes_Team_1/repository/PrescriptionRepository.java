package com.example.MedicNotes_Team_1.repository;

import com.example.MedicNotes_Team_1.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    @Query("SELECT p FROM Prescription p WHERE p.doctor_id = :doctorId")
    List<Prescription> findByDoctorId(@Param("doctorId") Long doctorId);


    @Query("SELECT p FROM Prescription p WHERE p.patient_id = :patientId")
    List<Prescription> findByPatientId(@Param("patientId") Long patientId);

    @Query("SELECT p FROM Prescription p WHERE DATE(p.created_at) = CURRENT_DATE")
    List<Prescription> findAllCreatedToday();


}
