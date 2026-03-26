package Main.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Main.Entity.Review;
import Main.Repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repo;

    public Review addReview(Review r) {
        return repo.save(r);
    }

    public List<Review> getReviews(Long apiId) {
        return repo.findByApiId(apiId);
    }

    public Double getAvgRating(Long apiId) {
        return repo.getAverageRating(apiId);
    }
}