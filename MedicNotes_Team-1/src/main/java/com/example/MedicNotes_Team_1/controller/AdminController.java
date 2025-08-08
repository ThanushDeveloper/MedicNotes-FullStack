package com.example.MedicNotes_Team_1.controller;

import com.example.MedicNotes_Team_1.entity.Admin;
import com.example.MedicNotes_Team_1.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> registerAdmin(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String password,
            @RequestParam String status,
            @RequestParam String adminType,
            @RequestParam MultipartFile adminPhoto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        Admin admin = new Admin();
        admin.setName(name);
        admin.setEmail(email);
        admin.setPhone(phone);
        admin.setPassword(password);
        admin.setStatus(status);
        admin.setAdminType(adminType);

        try {
            admin.setAdminPhoto(adminPhoto.getBytes());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to process image: " + e.getMessage());
        }

        return adminService.registerAdmin(admin);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllAdmins() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateAdmin(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam(required = false) String password,
            @RequestParam String status,
            @RequestParam String adminType,
            @RequestParam(required = false) MultipartFile adminPhoto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        Admin updatedAdmin = new Admin();
        updatedAdmin.setName(name);
        updatedAdmin.setEmail(email);
        updatedAdmin.setPhone(phone);
        updatedAdmin.setPassword(password);
        updatedAdmin.setStatus(status);
        updatedAdmin.setAdminType(adminType);

        try {
            if (adminPhoto != null && !adminPhoto.isEmpty()) {
                updatedAdmin.setAdminPhoto(adminPhoto.getBytes());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to process image: " + e.getMessage());
        }

        return adminService.updateAdmin(id, updatedAdmin);
    }

    @PutMapping("/update-password/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateAdminPassword(
            @PathVariable Long id,
            @RequestParam String newPassword) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        return adminService.updateAdminPassword(id, newPassword);
    }

    @PutMapping("/update-status/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> updateAdminStatus(
            @PathVariable Long id,
            @RequestParam String newStatus) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        return adminService.updateAdminStatus(id, newStatus);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        return adminService.deleteAdmin(id);
    }


    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminById(@PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        Admin admin = adminService.getAdminById(id);
        if (admin == null) {
            return ResponseEntity.badRequest().body("Admin with ID " + id + " not found.");
        }
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/get-by-phone")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminByPhone(@RequestParam String phone) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        Admin admin = adminService.getAdminByPhone(phone);
        if (admin == null) {
            return ResponseEntity.badRequest().body("Admin with phone number " + phone + " not found.");
        }
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/get-by-email")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminByEmail(@RequestParam String email) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        Admin admin = adminService.getAdminByEmail(email);
        if (admin == null) {
            return ResponseEntity.badRequest().body("Admin with email " + email + " not found.");
        }
        return ResponseEntity.ok(admin);
    }


    @GetMapping("/get-ids-by-status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminIdsByStatus(@RequestParam String status) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        List<Long> adminIds = adminService.getAdminIdsByStatus(status);
        if (adminIds.isEmpty()) {
            return ResponseEntity.badRequest().body("No admins found with status " + status.toUpperCase() + ".");
        }
        return ResponseEntity.ok(adminIds);
    }


    @GetMapping("/get-ids-by-admin-type")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminIdsByAdminType(@RequestParam String adminType) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        List<Long> adminIds = adminService.getAdminIdsByAdminType(adminType);
        if (adminIds.isEmpty()) {
            return ResponseEntity.badRequest().body("No admins found with admin type " + adminType.toUpperCase() + ".");
        }
        return ResponseEntity.ok(adminIds);
    }



    @GetMapping("/count")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminCount() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = authentication.getName();
        Admin loggedInAdmin = adminService.findByEmail(loggedInEmail);

        // REMOVED SUPER_ADMIN CHECK

        long count = adminService.getAdminCount();
        return ResponseEntity.ok(count);
    }




}
