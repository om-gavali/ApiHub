package Main.Entity;

import jakarta.persistence.*;

@Entity
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long apiId;

     
    @ManyToOne
    @JoinColumn(name = "apiId", insertable = false, updatable = false)
    private Api api;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getApiId() {
        return apiId;
    }

    public Api getApi() {
        return api;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setApiId(Long apiId) {
        this.apiId = apiId;
    }

    public void setApi(Api api) {
        this.api = api;
    }
}