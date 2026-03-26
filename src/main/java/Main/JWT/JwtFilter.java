package Main.JWT;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import Main.Repository.userRepository;
import Main.Entity.user;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final userRepository userRepository;

    public JwtFilter(JwtUtil jwtUtil, userRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtUtil.getUsername(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            user user = userRepository.findByUsername(username).orElse(null);

            if (user != null && jwtUtil.validateToken(token)) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(),
                                null,
                                user.getRoles().stream()
                                        .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + role))
                                        .toList()
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);

                 
                request.setAttribute("userId", user.getId());
            }
        }

        filterChain.doFilter(request, response);
    }
}