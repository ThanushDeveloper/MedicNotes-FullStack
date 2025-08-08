//package com.example.MedicNotes_Team_1.controller;
//
//import com.example.MedicNotes_Team_1.dto.LoginRequest;
//import com.example.MedicNotes_Team_1.dto.LoginResponse;
//import com.example.MedicNotes_Team_1.entity.*;
//import com.example.MedicNotes_Team_1.repository.*;
//import com.example.MedicNotes_Team_1.security.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class AuthController {
//
//    private final AdminRepository adminRepo;
//    private final DoctorRepository doctorRepo;
//    private final PatientRepository patientRepo;
//    private final JwtUtil jwtUtil;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//
//    @PostMapping("/admin/login")
//    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
//        Admin admin = null;
//
//        if (request.getAdminId() != null) {
//            admin = adminRepo.findById(request.getAdminId()).orElse(null);
//        } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
//            admin = adminRepo.findByEmail(request.getEmail());
//        } else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
//            admin = adminRepo.findByPhone(request.getPhone());
//        }
//
//        if (admin != null && passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
//            String token = jwtUtil.generateToken(String.valueOf(admin.getId()), "ADMIN");
//            return ResponseEntity.ok(new LoginResponse(token, admin.getId()));
//        }
//
//        return ResponseEntity.badRequest().body("Invalid credentials. Please check your ID, email, phone, or password.");
//    }
//
//
//
//    @PostMapping("/doctor/login")
//    public ResponseEntity<LoginResponse> doctorLogin(@RequestBody LoginRequest request) {
//        Doctor doctor = null;
//
//        if (request.getDoctorId() != null) {
//            doctor = doctorRepo.findById(request.getDoctorId()).orElse(null);
//        } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
//            doctor = doctorRepo.findByEmail(request.getEmail());
//        } else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
//            doctor = doctorRepo.findByPhone(request.getPhone());
//        }
//
//        if (doctor != null && passwordEncoder.matches(request.getPassword(), doctor.getPassword())) {
//            String token = jwtUtil.generateToken(String.valueOf(doctor.getId()), "DOCTOR");
//            System.out.println("Login successful");
//            return ResponseEntity.ok(new LoginResponse(token, doctor.getId()));
//
//        }
//
//        System.out.println("Invalid credentials. Please check your ID, email, phone, or password.");
//        return ResponseEntity.badRequest().body(new LoginResponse("Invalid credentials. Please check your ID, email, phone, or password."));
//    }
//
//
//
//
//    @PostMapping("/patient/login")
//    public ResponseEntity<LoginResponse> patientLogin(@RequestBody LoginRequest request) {
//        Patient patient = null;
//
//        // Try as ID
//        if (request.getPatientId() != null) {
//            patient = patientRepo.findById(request.getPatientId()).orElse(null);
//        }
//
//        // Try as Email
//        else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
//            patient = patientRepo.findByEmail(request.getEmail()).orElse(null);
//        }
//
//        // Try as Phone
//        else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
//            patient = patientRepo.findByPhone(request.getPhone()).orElse(null);
//        }
//
//        // Check credentials
//        if (patient != null && passwordEncoder.matches(request.getPassword(), patient.getPassword())) {
//            String token = jwtUtil.generateToken(patient.getEmail(), "PATIENT");
//            return ResponseEntity.ok(new LoginResponse(token, patient.getId()));
//
//        }
//
//        return ResponseEntity.badRequest().body(new LoginResponse("Invalid credentials. Please check your ID, email, phone, or password."));
//    }
//
//
//
//
//
//
//}



package com.example.MedicNotes_Team_1.controller;

import com.example.MedicNotes_Team_1.dto.LoginRequest;
import com.example.MedicNotes_Team_1.dto.LoginResponse;
import com.example.MedicNotes_Team_1.entity.*;
import com.example.MedicNotes_Team_1.repository.*;
import com.example.MedicNotes_Team_1.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminRepository adminRepo;
    private final DoctorRepository doctorRepo;
    private final PatientRepository patientRepo;
    private final JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
        Admin admin = null;

        if (request.getAdminId() != null) {
            admin = adminRepo.findById(request.getAdminId()).orElse(null);
        } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            admin = adminRepo.findByEmail(request.getEmail());
        } else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            admin = adminRepo.findByPhone(request.getPhone());
        }

        if (admin != null && passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            String token = jwtUtil.generateToken(String.valueOf(admin.getId()), "ADMIN");
            return ResponseEntity.ok(new LoginResponse(token, admin.getId()));
        }

        return ResponseEntity.badRequest().body("Invalid credentials. Please check your ID, email, phone, or password.");
    }

    @PostMapping("/doctor/login")
    public ResponseEntity<?> doctorLogin(@RequestBody LoginRequest request) {
        Doctor doctor = null;

        if (request.getDoctorId() != null) {
            doctor = doctorRepo.findById(request.getDoctorId()).orElse(null);
        } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            doctor = doctorRepo.findByEmail(request.getEmail());
        } else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            doctor = doctorRepo.findByPhone(request.getPhone());
        }

        if (doctor != null && passwordEncoder.matches(request.getPassword(), doctor.getPassword())) {
            String token = jwtUtil.generateToken(String.valueOf(doctor.getId()), "DOCTOR");
            return ResponseEntity.ok(new LoginResponse(token, doctor.getId()));
        }

        return ResponseEntity.badRequest().body("Invalid credentials. Please check your ID, email, phone, or password.");
    }

    @PostMapping("/patient/login")
    public ResponseEntity<?> patientLogin(@RequestBody LoginRequest request) {
        Patient patient = null;

        if (request.getPatientId() != null) {
            patient = patientRepo.findById(request.getPatientId()).orElse(null);
        } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            patient = patientRepo.findByEmail(request.getEmail()).orElse(null);
        } else if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            patient = patientRepo.findByPhone(request.getPhone()).orElse(null);
        }

        if (patient != null && passwordEncoder.matches(request.getPassword(), patient.getPassword())) {
            String token = jwtUtil.generateToken(String.valueOf(patient.getPatientId()), "PATIENT");
            return ResponseEntity.ok(new LoginResponse(token, patient.getPatientId()));
        }

        return ResponseEntity.badRequest().body("Invalid credentials. Please check your ID, email, phone, or password.");
    }
}
