package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Admin;
import com.example.MedicNotes_Team_1.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // added for encryption

    @Override
    public ResponseEntity<String> registerAdmin(Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()) != null) {
            return ResponseEntity.badRequest().body("An admin with this email already exists. Please use a different email.");
        }
        if (adminRepository.findByPhone(admin.getPhone()) != null) {
            return ResponseEntity.badRequest().body("An admin with this phone number already exists. Please use a different phone number.");
        }

        List<String> validStatuses = Arrays.asList("ACTIVE", "INACTIVE", "SUSPENDED");
        if (!validStatuses.contains(admin.getStatus().toUpperCase())) {
            return ResponseEntity.badRequest().body("Invalid status provided. Allowed values: ACTIVE, INACTIVE, SUSPENDED.");
        }

        List<String> validAdminTypes = Arrays.asList("SUPER_ADMIN", "STAFF_ADMIN", "SUPPORT_ADMIN");
        if (!validAdminTypes.contains(admin.getAdminType().toUpperCase())) {
            return ResponseEntity.badRequest().body("Invalid admin type provided. Allowed values: SUPER_ADMIN, STAFF_ADMIN, SUPPORT_ADMIN.");
        }

        admin.setStatus(admin.getStatus().toUpperCase());
        admin.setAdminType(admin.getAdminType().toUpperCase());

        // Encrypt the password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully.");
    }

    @Override
    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public ResponseEntity<String> updateAdmin(Long id, Admin updatedAdmin) {
        try {
            Admin existingAdmin = adminRepository.findById(id).orElse(null);
            if (existingAdmin == null) {
                return ResponseEntity.badRequest().body("Admin with ID " + id + " not found.");
            }

            existingAdmin.setName(updatedAdmin.getName());
            existingAdmin.setEmail(updatedAdmin.getEmail());
            existingAdmin.setPhone(updatedAdmin.getPhone());
            existingAdmin.setStatus(updatedAdmin.getStatus());
            existingAdmin.setAdminType(updatedAdmin.getAdminType());

            if (updatedAdmin.getAdminPhoto() != null) {
                existingAdmin.setAdminPhoto(updatedAdmin.getAdminPhoto());
            }

            // Do not change the password if the input is null or empty
            if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                existingAdmin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
            }

            adminRepository.save(existingAdmin);
            return ResponseEntity.ok("Admin updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong: " + e.getMessage());
        }
    }


    @Override
    public ResponseEntity<String> updateAdminPassword(Long id, String newPassword) {
        try {
            Admin existingAdmin = adminRepository.findById(id).orElse(null);
            if (existingAdmin == null) {
                return ResponseEntity.badRequest().body("Admin with ID " + id + " not found.");
            }
            if (newPassword == null || newPassword.isEmpty()) {
                return ResponseEntity.badRequest().body("New password cannot be empty.");
            }

            existingAdmin.setPassword(passwordEncoder.encode(newPassword));
            adminRepository.save(existingAdmin);
            return ResponseEntity.ok("Admin password updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong while updating password: " + e.getMessage());
        }
    }


    @Override
    public ResponseEntity<String> updateAdminStatus(Long id, String newStatus) {
        try {
            Admin existingAdmin = adminRepository.findById(id).orElse(null);
            if (existingAdmin == null) {
                return ResponseEntity.badRequest().body("Admin with ID " + id + " not found.");
            }
            if (newStatus == null || newStatus.isEmpty()) {
                return ResponseEntity.badRequest().body("New status cannot be empty.");
            }

            List<String> validStatuses = Arrays.asList("ACTIVE", "INACTIVE", "SUSPENDED");
            if (!validStatuses.contains(newStatus.toUpperCase())) {
                return ResponseEntity.badRequest().body("Invalid status provided. Allowed values: ACTIVE, INACTIVE, SUSPENDED.");
            }

            if (existingAdmin.getStatus().equalsIgnoreCase(newStatus)) {
                return ResponseEntity.ok("Admin status is already in " + newStatus.toUpperCase() + ".");
            }

            existingAdmin.setStatus(newStatus.toUpperCase());
            adminRepository.save(existingAdmin);
            return ResponseEntity.ok("Admin status updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong while updating status: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> deleteAdmin(Long id) {
        try {
            Admin existingAdmin = adminRepository.findById(id).orElse(null);
            if (existingAdmin == null) {
                return ResponseEntity.badRequest().body("Admin with ID " + id + " not found.");
            }
            adminRepository.deleteById(id);
            return ResponseEntity.ok("Admin deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong while deleting admin: " + e.getMessage());
        }
    }


    @Override
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public Admin getAdminByPhone(String phone) {
        return adminRepository.findByPhone(phone);
    }

    @Override
    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public List<Long> getAdminIdsByStatus(String status) {
        List<Admin> admins = adminRepository.findAll();
        return admins.stream()
                .filter(a -> a.getStatus().equalsIgnoreCase(status))
                .map(Admin::getId)
                .toList();
    }

    @Override
    public List<Long> getAdminIdsByAdminType(String adminType) {
        List<Admin> admins = adminRepository.findAll();
        return admins.stream()
                .filter(a -> a.getAdminType() != null && a.getAdminType().equalsIgnoreCase(adminType))
                .map(Admin::getId)
                .toList();
    }


    @Override
    public long getAdminCount() {
        return adminRepository.count();
    }







}
