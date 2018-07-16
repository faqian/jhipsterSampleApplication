package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestPaper.
 */
@Entity
@Table(name = "test_paper")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TestPaper implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "testPaper")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TestPaperUser> testPaperUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TestPaperUser> getTestPaperUsers() {
        return testPaperUsers;
    }

    public TestPaper testPaperUsers(Set<TestPaperUser> testPaperUsers) {
        this.testPaperUsers = testPaperUsers;
        return this;
    }

    public TestPaper addTestPaperUser(TestPaperUser testPaperUser) {
        this.testPaperUsers.add(testPaperUser);
        testPaperUser.setTestPaper(this);
        return this;
    }

    public TestPaper removeTestPaperUser(TestPaperUser testPaperUser) {
        this.testPaperUsers.remove(testPaperUser);
        testPaperUser.setTestPaper(null);
        return this;
    }

    public void setTestPaperUsers(Set<TestPaperUser> testPaperUsers) {
        this.testPaperUsers = testPaperUsers;
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
        TestPaper testPaper = (TestPaper) o;
        if (testPaper.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testPaper.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestPaper{" +
            "id=" + getId() +
            "}";
    }
}
