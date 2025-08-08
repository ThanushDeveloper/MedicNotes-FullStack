
package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Patient;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface PatientService {
//    Patient addPatient(Patient patient);

    List<Patient> getAllPatients();

    List<Patient> getPatientsRegisteredToday();

    List<Patient> getPatientsRegisteredYesterday();

    Patient addPatient(Patient patient, MultipartFile image);


    List<Patient> getPatientsRegisteredThisWeek();

    List<Patient> getPatientsRegisteredThisMonth();

    List<Patient> getPatientsByGender(Patient.Gender gender);

    List<Patient> getPatientsByName(String name);

    List<Patient> getPatientsByPhone(String phone);

    List<Patient> getPatientsRegisteredOnDate(Date date);

    List<Patient> getPatientsByTreatment(String treatment);

    void updatePatient(Long id, Patient patient);

    void deletePatient(Long id);

    long getPatientCount();

}
