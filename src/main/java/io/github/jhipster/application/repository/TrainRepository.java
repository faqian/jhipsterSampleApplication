package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Train;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Train entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {

}
