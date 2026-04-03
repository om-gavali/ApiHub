package Main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import Main.Entity.User;
import Main.Repository.UserRepository;
import Main.JWT.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;
    
  

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> user) {
        User u = new User();
        u.setUsername(user.get("username"));
        u.setPassword(passwordEncoder.encode(user.get("password")));
        u.setRoles(Set.of("USER"));
        userRepository.save(u);
        return "User registered!";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> user) {
        User u = userRepository.findByUsername(user.get("username"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(user.get("password"), u.getPassword())) {
            String token = jwtUtil.generateToken(u.getUsername(), u.getRoles());
            String role = u.getRoles().stream().findFirst().orElse("USER");
            return Map.of("token", token, "role", role);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}