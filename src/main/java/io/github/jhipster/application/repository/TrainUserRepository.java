package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TrainUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TrainUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainUserRepository extends JpaRepository<TrainUser, Long> {

}
