package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TestPaper;
import io.github.jhipster.application.repository.TestPaperRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TestPaper.
 */
@RestController
@RequestMapping("/api")
public class TestPaperResource {

    private final Logger log = LoggerFactory.getLogger(TestPaperResource.class);

    private static final String ENTITY_NAME = "testPaper";

    private final TestPaperRepository testPaperRepository;

    public TestPaperResource(TestPaperRepository testPaperRepository) {
        this.testPaperRepository = testPaperRepository;
    }

    /**
     * POST  /test-papers : Create a new testPaper.
     *
     * @param testPaper the testPaper to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testPaper, or with status 400 (Bad Request) if the testPaper has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-papers")
    @Timed
    public ResponseEntity<TestPaper> createTestPaper(@RequestBody TestPaper testPaper) throws URISyntaxException {
        log.debug("REST request to save TestPaper : {}", testPaper);
        if (testPaper.getId() != null) {
            throw new BadRequestAlertException("A new testPaper cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestPaper result = testPaperRepository.save(testPaper);
        return ResponseEntity.created(new URI("/api/test-papers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-papers : Updates an existing testPaper.
     *
     * @param testPaper the testPaper to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testPaper,
     * or with status 400 (Bad Request) if the testPaper is not valid,
     * or with status 500 (Internal Server Error) if the testPaper couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-papers")
    @Timed
    public ResponseEntity<TestPaper> updateTestPaper(@RequestBody TestPaper testPaper) throws URISyntaxException {
        log.debug("REST request to update TestPaper : {}", testPaper);
        if (testPaper.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestPaper result = testPaperRepository.save(testPaper);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testPaper.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-papers : get all the testPapers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testPapers in body
     */
    @GetMapping("/test-papers")
    @Timed
    public List<TestPaper> getAllTestPapers() {
        log.debug("REST request to get all TestPapers");
        return testPaperRepository.findAll();
    }

    /**
     * GET  /test-papers/:id : get the "id" testPaper.
     *
     * @param id the id of the testPaper to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testPaper, or with status 404 (Not Found)
     */
    @GetMapping("/test-papers/{id}")
    @Timed
    public ResponseEntity<TestPaper> getTestPaper(@PathVariable Long id) {
        log.debug("REST request to get TestPaper : {}", id);
        Optional<TestPaper> testPaper = testPaperRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(testPaper);
    }

    /**
     * DELETE  /test-papers/:id : delete the "id" testPaper.
     *
     * @param id the id of the testPaper to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-papers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestPaper(@PathVariable Long id) {
        log.debug("REST request to delete TestPaper : {}", id);

        testPaperRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
