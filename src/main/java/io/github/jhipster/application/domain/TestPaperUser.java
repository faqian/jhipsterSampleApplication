package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TestPaperUser.
 */
@Entity
@Table(name = "test_paper_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestPaperUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("testPaperUsers")
    private TestPaper testPaper;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestPaper getTestPaper() {
        return testPaper;
    }

    public TestPaperUser testPaper(TestPaper testPaper) {
        this.testPaper = testPaper;
        return this;
    }

    public void setTestPaper(TestPaper testPaper) {
        this.testPaper = testPaper;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestPaperUser testPaperUser = (TestPaperUser) o;
        if (testPaperUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testPaperUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestPaperUser{" +
            "id=" + getId() +
            "}";
    }
}
