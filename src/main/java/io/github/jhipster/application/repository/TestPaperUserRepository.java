package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TestPaperUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TestPaperUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestPaperUserRepository extends JpaRepository<TestPaperUser, Long> {

}
