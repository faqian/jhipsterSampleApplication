package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TestPaper;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TestPaper entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestPaperRepository extends JpaRepository<TestPaper, Long> {

}
