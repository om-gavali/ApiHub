package Main.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name = "api_directory")
public class Api {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String auth;
    private String category;
    private String cors;
    private Boolean https;
    private String link;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getCors() {
		return cors;
	}
	public void setCors(String cors) {
		this.cors = cors;
	}
	public Boolean getHttps() {
		return https;
	}
	public void setHttps(Boolean https) {
		this.https = https;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}

    
}