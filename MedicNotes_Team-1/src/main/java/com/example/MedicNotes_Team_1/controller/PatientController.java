package com.example.MedicNotes_Team_1.controller;

import ch.qos.logback.core.status.Status;
import com.example.MedicNotes_Team_1.entity.Patient;
import com.example.MedicNotes_Team_1.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

//    @PostMapping("/add")
//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('DOCTOR')")
//    public ResponseEntity<String> addPatient(@RequestBody Patient patient) {
//        patientService.addPatient(patient);
//        return ResponseEntity.ok("Registration successful! Your account has been created.");
//    }

//    @PostMapping("/add")
//    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('DOCTOR')")
//    public ResponseEntity<String> addPatient(
//            @RequestPart("patient") Patient patient,
//            @RequestPart("image") MultipartFile image
//    ) {
//        patientService.addPatient(patient, image);
//        return ResponseEntity.ok("Registration successful! Your account has been created.");
//    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('DOCTOR')")
    public ResponseEntity<String> addPatient(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String dob,
            @RequestParam Patient.Gender gender,
            @RequestParam String password,
            @RequestParam String status,
            @RequestParam String treatment,
            @RequestPart MultipartFile image
    ) {
        try {
            // Parse DOB
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDob = formatter.parse(dob);

            // Convert string status to enum if necessary (optional)
            // Example: Patient.Status patientStatus = Patient.Status.valueOf(status.toUpperCase());

            // Create Patient object manually
            Patient patient = new Patient();
            patient.setName(name);
            patient.setEmail(email);
            patient.setPhone(phone);
            patient.setAddress(address);
            patient.setDob(parsedDob);
            patient.setGender(gender);
            patient.setPassword(password); // Will be encoded in the service
            patient.setStatus(Patient.Status.valueOf(status.toUpperCase())); // Adjust as needed
            patient.setTreatment(treatment);

            // Call service to save
            patientService.addPatient(patient, image);
            return ResponseEntity.ok("Registration successful! Your account has been created.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }





    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('DOCTOR')")
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/registered-today")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsRegisteredToday() {
        return ResponseEntity.ok(patientService.getPatientsRegisteredToday());
    }

    @GetMapping("/registered-yesterday")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsRegisteredYesterday() {
        return ResponseEntity.ok(patientService.getPatientsRegisteredYesterday());
    }

    @GetMapping("/registered-this-week")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsRegisteredThisWeek() {
        return ResponseEntity.ok(patientService.getPatientsRegisteredThisWeek());
    }

    @GetMapping("/registered-this-month")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsRegisteredThisMonth() {
        return ResponseEntity.ok(patientService.getPatientsRegisteredThisMonth());
    }

    @GetMapping("/by-gender/{gender}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsByGender(@PathVariable Patient.Gender gender) {
        return ResponseEntity.ok(patientService.getPatientsByGender(gender));
    }

    @GetMapping("/by-name/{name}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsByName(@PathVariable String name) {
        return ResponseEntity.ok(patientService.getPatientsByName(name));
    }

    @GetMapping("/by-phone/{phone}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsByPhone(@PathVariable String phone) {
        return ResponseEntity.ok(patientService.getPatientsByPhone(phone));
    }

    @GetMapping("/registered-on/{date}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsRegisteredOnDate(@PathVariable String date) throws ParseException {
        Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
        return ResponseEntity.ok(patientService.getPatientsRegisteredOnDate(parsedDate));
    }

    @GetMapping("/by-treatment/{treatment}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Patient>> getPatientsByTreatment(@PathVariable String treatment) {
        return ResponseEntity.ok(patientService.getPatientsByTreatment(treatment));
    }


    @GetMapping("/patient-count")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getPatientCount() {
        long count = patientService.getPatientCount();
        return ResponseEntity.ok(count);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        patientService.updatePatient(id, patient);
        return ResponseEntity.ok("Patient updated successfully.");
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient with ID " + id + " deleted successfully.");
    }


}