package com.example.MedicNotes_Team_1.controller;

import com.example.MedicNotes_Team_1.entity.Prescription;
import com.example.MedicNotes_Team_1.entity.PrescriptionFiles;
import com.example.MedicNotes_Team_1.repository.PrescriptionFilesRepository;
import com.example.MedicNotes_Team_1.repository.PrescriptionRepository;
import com.example.MedicNotes_Team_1.repository.DoctorRepository;
import com.example.MedicNotes_Team_1.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.MedicNotes_Team_1.service.PrescriptionService;

import java.sql.Timestamp;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private PrescriptionFilesRepository prescriptionFilesRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PrescriptionService prescriptionService;


    @PostMapping("/add-with-files")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public Object addPrescriptionWithFiles(
            @RequestParam Long doctor_id,
            @RequestParam Long patient_id,
            @RequestParam String diagnosis,
            @RequestParam String notes,
            @RequestParam(required = false) String prescription_date,
            @RequestParam(required = false) String next_visit_date,
            @RequestParam(required = false) MultipartFile[] files) {
        return prescriptionService.addPrescriptionWithFiles(
                doctor_id,
                patient_id,
                diagnosis,
                notes,
                prescription_date,
                next_visit_date,
                files
        );
    }



    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Object getAllPrescriptions() {
        try {
            List<Prescription> prescriptions = prescriptionService.getAllPrescriptions();
            return prescriptions;
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while fetching prescriptions: " + e;
        }
    }



    @GetMapping("/by-id/{prescriptionId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Object getPrescriptionById(@PathVariable Long prescriptionId) {
        return prescriptionService.getPrescriptionById(prescriptionId);
    }



    @GetMapping("/by-doctor/{doctorId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Object getPrescriptionsByDoctorId(@PathVariable Long doctorId) {
        try {
            List<Prescription> prescriptions = prescriptionRepository.findByDoctorId(doctorId);
            return prescriptions;
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while fetching prescriptions by doctor ID: " + e;
        }
    }


    @GetMapping("/by-patient/{patientId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Object getPrescriptionsByPatientId(@PathVariable Long patientId) {
        try {
            List<Prescription> prescriptions = prescriptionRepository.findByPatientId(patientId);
            return prescriptions;
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while fetching prescriptions by patient ID: " + e;
        }
    }


    @GetMapping("/created-today")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Object getPrescriptionsCreatedToday() {
        try {
            List<Prescription> prescriptions = prescriptionRepository.findAllCreatedToday();
            return prescriptions;
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while fetching today's prescriptions: " + e;
        }
    }

    @GetMapping("/count")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Object getPrescriptionCount() {
        try {
            long count = prescriptionService.getPrescriptionCount();
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while counting prescriptions: " + e;
        }
    }




}



