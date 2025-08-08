
package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Patient;
import com.example.MedicNotes_Team_1.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Override
//    public Patient addPatient(Patient patient) {
//        if (!patientRepository.findByPhone(patient.getPhone()).isEmpty()) {
//            throw new RuntimeException("The phone number " + patient.getPhone() + " is already used.");
//        }
//
//        if (patientRepository.findByEmail(patient.getEmail()).isPresent()) {
//            throw new RuntimeException("The email " + patient.getEmail() + " is already used.");
//        }
//
//        if (patient.getPassword() == null || patient.getPassword().isEmpty()) {
//            throw new RuntimeException("Password cannot be null or empty during registration.");
//        }
//        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
//
//        patient.setCreatedAt(new Date());
//        patient.setUpdatedAt(new Date());
//
//        return patientRepository.save(patient);
//    }

    @Override
    public Patient addPatient(Patient patient, MultipartFile image) {
        if (!patientRepository.findByPhone(patient.getPhone()).isEmpty()) {
            throw new RuntimeException("The phone number " + patient.getPhone() + " is already used.");
        }

        if (patientRepository.findByEmail(patient.getEmail()).isPresent()) {
            throw new RuntimeException("The email " + patient.getEmail() + " is already used.");
        }

        if (patient.getPassword() == null || patient.getPassword().isEmpty()) {
            throw new RuntimeException("Password cannot be null or empty during registration.");
        }

        patient.setPassword(passwordEncoder.encode(patient.getPassword()));

        // ✅ Handle image upload (set in BLOB)
        if (image != null && !image.isEmpty()) {
            try {
                patient.setPatientImage(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image");
            }
        }

        patient.setCreatedAt(new Date());
        patient.setUpdatedAt(new Date());

        return patientRepository.save(patient);
    }


    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public List<Patient> getPatientsRegisteredToday() {
        Calendar cal = Calendar.getInstance();
        setDayRange(cal, 0);
        return getPatientsBetween(cal);
    }

    @Override
    public List<Patient> getPatientsRegisteredYesterday() {
        Calendar cal = Calendar.getInstance();
        setDayRange(cal, -1);
        return getPatientsBetween(cal);
    }

    @Override
    public List<Patient> getPatientsRegisteredThisWeek() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK, cal.getFirstDayOfWeek());
        setDayStart(cal);
        Date start = cal.getTime();

        cal.add(Calendar.DAY_OF_WEEK, 6);
        setDayEnd(cal);
        Date end = cal.getTime();

        return patientRepository.findByCreatedAtBetween(start, end);
    }

    @Override
    public List<Patient> getPatientsRegisteredThisMonth() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH, 1);
        setDayStart(cal);
        Date start = cal.getTime();

        cal.add(Calendar.MONTH, 1);
        cal.add(Calendar.DATE, -1);
        setDayEnd(cal);
        Date end = cal.getTime();

        return patientRepository.findByCreatedAtBetween(start, end);
    }

    @Override
    public List<Patient> getPatientsByGender(Patient.Gender gender) {
        return patientRepository.findByGender(gender);
    }

    @Override
    public List<Patient> getPatientsByName(String name) {
        return patientRepository.findByName(name);
    }

//    @Override
//    public List<Patient> getPatientsByPhone(String phone) {
//        return patientRepository.findByPhone(phone);
//    }

    @Override
    public List<Patient> getPatientsByPhone(String phone) {
        return patientRepository.findByPhone(phone)
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }


    @Override
    public List<Patient> getPatientsRegisteredOnDate(Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        setDayRange(cal, 0);
        return getPatientsBetween(cal);
    }

    @Override
    public List<Patient> getPatientsByTreatment(String treatment) {
        return patientRepository.findByTreatment(treatment);
    }

    @Override
    public void updatePatient(Long id, Patient patient) {
        Patient existing = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient with ID " + id + " not found."));

        existing.setName(patient.getName());
        existing.setEmail(patient.getEmail());
        existing.setPhone(patient.getPhone());
        existing.setAddress(patient.getAddress());
        existing.setDob(patient.getDob());
        existing.setGender(patient.getGender());
        existing.setTreatment(patient.getTreatment());
        existing.setStatus(patient.getStatus());
        existing.setUpdatedAt(new Date());

        if (patient.getPassword() != null && !patient.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(patient.getPassword()));
        }

        patientRepository.save(existing);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    private void setDayRange(Calendar cal, int offset) {
        cal.add(Calendar.DATE, offset);
        setDayStart(cal);
    }

    private void setDayStart(Calendar cal) {
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
    }

    private void setDayEnd(Calendar cal) {
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 999);
    }

    private List<Patient> getPatientsBetween(Calendar cal) {
        Date start = cal.getTime();
        setDayEnd(cal);
        Date end = cal.getTime();
        return patientRepository.findByCreatedAtBetween(start, end);
    }



    @Override
    public long getPatientCount() {
        return patientRepository.count();
    }

}