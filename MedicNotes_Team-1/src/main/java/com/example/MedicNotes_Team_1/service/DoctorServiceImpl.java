package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Doctor;
import com.example.MedicNotes_Team_1.repository.DoctorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public ResponseEntity<String> registerDoctor(String doctorJson, MultipartFile image) throws IOException {
        Doctor doctor = objectMapper.readValue(doctorJson, Doctor.class);

        if (doctorRepository.findByEmail(doctor.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists in another account.");
        }
        if (doctorRepository.findByPhone(doctor.getPhone()) != null) {
            return ResponseEntity.badRequest().body("Phone number already exists in another account.");
        }

        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));

        if (image != null && !image.isEmpty()) {
            doctor.setDoctor_image(image.getBytes());
        }

        doctor.setCreated_at(new Date());
        doctor.setUpdated_at(new Date());

        doctorRepository.save(doctor);
        return ResponseEntity.ok("Doctor registered successfully by admin.");
    }

    @Override
    public ResponseEntity<?> getAllDoctorsByAdmin(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<Doctor> doctors = doctorRepository.findAll(pageable);

        if (doctors.isEmpty()) {
            return ResponseEntity
                    .status(404)
                    .body("No doctors found for the requested page and size.");
        }

        List<Map<String, Object>> simplifiedDoctors = doctors.stream().map(doctor -> {
            Map<String, Object> data = new HashMap<>();
            data.put("id", doctor.getId());
            data.put("name", doctor.getName());
            data.put("email", doctor.getEmail());
            data.put("phone", doctor.getPhone());
            data.put("specialization", doctor.getSpecialization());
            data.put("gender", doctor.getGender());
            data.put("dob", doctor.getDob());
            data.put("status", doctor.getStatus());
            if (doctor.getDoctor_image() != null) {
                data.put("doctor_image", Base64.getEncoder().encodeToString(doctor.getDoctor_image()));
            } else {
                data.put("doctor_image", null);
            }

            return data;
        }).toList();

        return ResponseEntity.ok(simplifiedDoctors);
    }


    @Override
    public ResponseEntity<?> getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);

        if (doctor == null) {
            return ResponseEntity
                    .status(404)
                    .body("No doctor found with ID: " + id);
        }

        Map<String, Object> data = new HashMap<>();
        data.put("id", doctor.getId());
        data.put("name", doctor.getName());
        data.put("email", doctor.getEmail());
        data.put("phone", doctor.getPhone());
        data.put("specialization", doctor.getSpecialization());
        data.put("gender", doctor.getGender());
        data.put("dob", doctor.getDob());
        data.put("status", doctor.getStatus());

        return ResponseEntity.ok(data);
    }

    @Override
    public ResponseEntity<?> getDoctorsByName(String name) {
        List<Doctor> doctors = doctorRepository.findByName(name);

        if (doctors.isEmpty()) {
            return ResponseEntity
                    .status(404)
                    .body("No doctors found with the name: " + name);
        }

        List<Map<String, Object>> response = doctors.stream().map(doctor -> {
            Map<String, Object> data = new HashMap<>();
            data.put("id", doctor.getId());
            data.put("name", doctor.getName());
            data.put("email", doctor.getEmail());
            data.put("phone", doctor.getPhone());
            data.put("specialization", doctor.getSpecialization());
            data.put("gender", doctor.getGender());
            data.put("dob", doctor.getDob());
            data.put("status", doctor.getStatus());
            return data;
        }).toList();

        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<?> getDoctorByEmail(String email) {
        Doctor doctor = doctorRepository.findByEmail(email);

        if (doctor == null) {
            return ResponseEntity
                    .status(404)
                    .body("No doctor found with the email: " + email);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", doctor.getId());
        response.put("name", doctor.getName());
        response.put("email", doctor.getEmail());
        response.put("phone", doctor.getPhone());
        response.put("specialization", doctor.getSpecialization());
        response.put("gender", doctor.getGender());
        response.put("dob", doctor.getDob());
        response.put("status", doctor.getStatus());

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> getDoctorByPhone(String phone) {
        Doctor doctor = doctorRepository.findByPhone(phone);

        if (doctor == null) {
            return ResponseEntity
                    .status(404)
                    .body("No doctor found with the phone number: " + phone);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", doctor.getId());
        response.put("name", doctor.getName());
        response.put("email", doctor.getEmail());
        response.put("phone", doctor.getPhone());
        response.put("specialization", doctor.getSpecialization());
        response.put("gender", doctor.getGender());
        response.put("dob", doctor.getDob());
        response.put("status", doctor.getStatus());

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> getDoctorsByGender(Doctor.Gender gender) {
        List<Doctor> doctors = doctorRepository.findByGender(gender);

        if (doctors.isEmpty()) {
            return ResponseEntity
                    .status(404)
                    .body("No doctors found with gender: " + gender);
        }

        List<Map<String, Object>> doctorList = doctors.stream()
                .map(doc -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", doc.getId());
                    map.put("name", doc.getName());
                    map.put("email", doc.getEmail());
                    map.put("phone", doc.getPhone());
                    map.put("specialization", doc.getSpecialization());
                    map.put("gender", doc.getGender());
                    map.put("dob", doc.getDob());
                    map.put("status", doc.getStatus());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(doctorList);
    }

    @Override
    public ResponseEntity<?> getDoctorsBySpecialization(String specialization) {
        List<Doctor> doctors = doctorRepository.findBySpecialization(specialization);

        if (doctors.isEmpty()) {
            return ResponseEntity
                    .status(404)
                    .body("No doctors found with specialization: " + specialization);
        }

        List<Map<String, Object>> doctorList = doctors.stream()
                .map(doc -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", doc.getId());
                    map.put("name", doc.getName());
                    map.put("email", doc.getEmail());
                    map.put("phone", doc.getPhone());
                    map.put("specialization", doc.getSpecialization());
                    map.put("gender", doc.getGender());
                    map.put("dob", doc.getDob());
                    map.put("status", doc.getStatus());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(doctorList);
    }


    @Override
    public ResponseEntity<?> getDoctorsByStatus(Doctor.Status status) {
        List<Doctor> doctors = doctorRepository.findByStatus(status);

        if (doctors.isEmpty()) {
            return ResponseEntity
                    .status(404)
                    .body("No doctors found with status: " + status);
        }

        List<Map<String, Object>> doctorList = doctors.stream()
                .map(doc -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", doc.getId());
                    map.put("name", doc.getName());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(doctorList);
    }


    @Override
    public ResponseEntity<String> updateDoctorStatus(Long id, String status) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        if (doctor == null) {
            return ResponseEntity.badRequest().body("Doctor with ID " + id + " not found.");
        }

        try {
            Doctor.Status newStatus = Doctor.Status.valueOf(status.toUpperCase());
            doctor.setStatus(newStatus);
            doctor.setUpdated_at(new Date());
            doctorRepository.save(doctor);
            return ResponseEntity.ok("Doctor status updated to " + newStatus);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status. Use ACTIVE or INACTIVE.");
        }
    }


    @Override
    public ResponseEntity<String> updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        if (doctor == null) {
            return ResponseEntity.badRequest().body("Doctor with ID " + id + " not found.");
        }

        doctor.setName(updatedDoctor.getName());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setPhone(updatedDoctor.getPhone());
        doctor.setGender(updatedDoctor.getGender());
        doctor.setDob(updatedDoctor.getDob());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setStatus(updatedDoctor.getStatus());
        doctor.setUpdated_at(new Date());

        doctorRepository.save(doctor);
        return ResponseEntity.ok("Doctor with ID " + id + " updated successfully.");
    }


    @Override
    public ResponseEntity<?> deleteDoctorById(Long id) {
        return doctorRepository.findById(id)
                .map(doctor -> {
                    doctorRepository.deleteById(id);
                    return ResponseEntity.ok("Doctor with ID " + id + " has been deleted successfully.");
                })
                .orElse(ResponseEntity.status(404).body("Doctor with ID " + id + " not found."));
    }



    @Override
    public long getDoctorCount() {
        return doctorRepository.count();
    }




}
