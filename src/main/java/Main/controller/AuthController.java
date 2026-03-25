package Main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import Main.Entity.user;
import Main.Repository.userRepository;
import Main.JWT.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:3000/")
public class AuthController {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> user) {
        user u = new user();
        u.setUsername(user.get("username"));
        u.setPassword(passwordEncoder.encode(user.get("password")));
        u.setRoles(Set.of("USER"));
        userRepository.save(u);
        return "User registered!";
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> user) {
        user u = userRepository.findByUsername(user.get("username"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(user.get("password"), u.getPassword())) {
            return jwtUtil.generateToken(u.getUsername(), u.getRoles());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}