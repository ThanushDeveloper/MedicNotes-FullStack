package com.example.MedicNotes_Team_1.controller;

import com.example.MedicNotes_Team_1.entity.Doctor;
import com.example.MedicNotes_Team_1.repository.DoctorRepository;
import com.example.MedicNotes_Team_1.service.DoctorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DoctorService doctorService;
    // Registor doctor by admin
    @PostMapping("/register-doctor")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> registerDoctor(
            @RequestPart("doctor") String doctorJson,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return doctorService.registerDoctor(doctorJson, image);
    }


    // get all doctor by pagining
    @GetMapping("/AllDoctors")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllDoctorsByAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return doctorService.getAllDoctorsByAdmin(page, size);
    }


    // Get doctor by DoctorId
    @GetMapping("/ByDoctorId/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }


    // Get doctor by name
    @GetMapping("/ByDoctorName/{name}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorsByName(@PathVariable String name) {
        return doctorService.getDoctorsByName(name);
    }


    // Get doctor by email
    @GetMapping("/ByDoctorEmail/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorByEmail(@PathVariable String email) {
        return doctorService.getDoctorByEmail(email);
    }




    // Get doctor by phone
    @GetMapping("/ByDoctorPhone/{phone}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorByPhone(@PathVariable String phone) {
        return doctorService.getDoctorByPhone(phone);
    }


    // Get doctors by gender
    @GetMapping("/ByDoctorGender/{gender}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorsByGender(@PathVariable Doctor.Gender gender) {
        return doctorService.getDoctorsByGender(gender);
    }


    // Get doctors by specialization
    @GetMapping("/ByDoctorSpecialization/{specialization}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorsBySpecialization(@PathVariable String specialization) {
        return doctorService.getDoctorsBySpecialization(specialization);
    }



    // Get doctors by status
    @GetMapping("/ByDoctorStatus/{status}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorsByStatus(@PathVariable Doctor.Status status) {
        return doctorService.getDoctorsByStatus(status);
    }



    // Get all distinct specializations
    @GetMapping("/DoctorsAllSpecializations")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllDistinctSpecializations() {
        List<String> specializations = doctorRepository.findDistinctSpecializations();

        if (specializations.isEmpty()) {
            return ResponseEntity
                    .status(404)
                    .body("No specializations found in the system.");
        }

        return ResponseEntity.ok(specializations);
    }


    // Update doctor status
    @PutMapping("/UpdateDoctorStatus/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateDoctorStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return doctorService.updateDoctorStatus(id, status);
    }

    // Update doctor fully
    @PutMapping("/UpdateDoctor/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor updatedDoctor) {
        return doctorService.updateDoctor(id, updatedDoctor);
    }

    // Delete doctor by ID
    @DeleteMapping("/deleteDoctor/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteDoctorById(@PathVariable Long id) {

        return doctorService.deleteDoctorById(id);
    }


    @GetMapping("/doctor-count")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getDoctorCount() {
        long count = doctorService.getDoctorCount();
        return ResponseEntity.ok(count);
    }


}
