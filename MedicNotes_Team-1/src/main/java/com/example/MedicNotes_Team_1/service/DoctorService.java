package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface DoctorService {
    ResponseEntity<String> registerDoctor(String doctorJson, MultipartFile image) throws IOException;
    ResponseEntity<?> getAllDoctorsByAdmin(int page, int size);
    ResponseEntity<?> getDoctorById(Long id);
    ResponseEntity<?> getDoctorsByName(String name);
    ResponseEntity<?> getDoctorByEmail(String email);
    ResponseEntity<?> getDoctorByPhone(String phone);
    ResponseEntity<?> getDoctorsByGender(Doctor.Gender gender);
    ResponseEntity<?> getDoctorsBySpecialization(String specialization);
    ResponseEntity<?> getDoctorsByStatus(Doctor.Status status);
    ResponseEntity<String> updateDoctorStatus(Long id, String status);
    ResponseEntity<String> updateDoctor(Long id, Doctor updatedDoctor);
    ResponseEntity<?> deleteDoctorById(Long id);

    long getDoctorCount();


}
