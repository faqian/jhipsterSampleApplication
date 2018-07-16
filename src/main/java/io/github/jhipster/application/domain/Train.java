package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * 考试培训模块数据模型设计表和数据库的关系
 */
@ApiModel(description = "考试培训模块数据模型设计表和数据库的关系")
@Entity
@Table(name = "train")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Train implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "train")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TrainUser> trainUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<TrainUser> getTrainUsers() {
        return trainUsers;
    }

    public Train trainUsers(Set<TrainUser> trainUsers) {
        this.trainUsers = trainUsers;
        return this;
    }

    public Train addTrainUser(TrainUser trainUser) {
        this.trainUsers.add(trainUser);
        trainUser.setTrain(this);
        return this;
    }

    public Train removeTrainUser(TrainUser trainUser) {
        this.trainUsers.remove(trainUser);
        trainUser.setTrain(null);
        return this;
    }

    public void setTrainUsers(Set<TrainUser> trainUsers) {
        this.trainUsers = trainUsers;
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
        Train train = (Train) o;
        if (train.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), train.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Train{" +
            "id=" + getId() +
            "}";
    }
}
