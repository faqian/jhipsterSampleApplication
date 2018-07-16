package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TestPaperUser;
import io.github.jhipster.application.repository.TestPaperUserRepository;
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
 * REST controller for managing TestPaperUser.
 */
@RestController
@RequestMapping("/api")
public class TestPaperUserResource {

    private final Logger log = LoggerFactory.getLogger(TestPaperUserResource.class);

    private static final String ENTITY_NAME = "testPaperUser";

    private final TestPaperUserRepository testPaperUserRepository;

    public TestPaperUserResource(TestPaperUserRepository testPaperUserRepository) {
        this.testPaperUserRepository = testPaperUserRepository;
    }

    /**
     * POST  /test-paper-users : Create a new testPaperUser.
     *
     * @param testPaperUser the testPaperUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testPaperUser, or with status 400 (Bad Request) if the testPaperUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-paper-users")
    @Timed
    public ResponseEntity<TestPaperUser> createTestPaperUser(@RequestBody TestPaperUser testPaperUser) throws URISyntaxException {
        log.debug("REST request to save TestPaperUser : {}", testPaperUser);
        if (testPaperUser.getId() != null) {
            throw new BadRequestAlertException("A new testPaperUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestPaperUser result = testPaperUserRepository.save(testPaperUser);
        return ResponseEntity.created(new URI("/api/test-paper-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-paper-users : Updates an existing testPaperUser.
     *
     * @param testPaperUser the testPaperUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testPaperUser,
     * or with status 400 (Bad Request) if the testPaperUser is not valid,
     * or with status 500 (Internal Server Error) if the testPaperUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-paper-users")
    @Timed
    public ResponseEntity<TestPaperUser> updateTestPaperUser(@RequestBody TestPaperUser testPaperUser) throws URISyntaxException {
        log.debug("REST request to update TestPaperUser : {}", testPaperUser);
        if (testPaperUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestPaperUser result = testPaperUserRepository.save(testPaperUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testPaperUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-paper-users : get all the testPaperUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testPaperUsers in body
     */
    @GetMapping("/test-paper-users")
    @Timed
    public List<TestPaperUser> getAllTestPaperUsers() {
        log.debug("REST request to get all TestPaperUsers");
        return testPaperUserRepository.findAll();
    }

    /**
     * GET  /test-paper-users/:id : get the "id" testPaperUser.
     *
     * @param id the id of the testPaperUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testPaperUser, or with status 404 (Not Found)
     */
    @GetMapping("/test-paper-users/{id}")
    @Timed
    public ResponseEntity<TestPaperUser> getTestPaperUser(@PathVariable Long id) {
        log.debug("REST request to get TestPaperUser : {}", id);
        Optional<TestPaperUser> testPaperUser = testPaperUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(testPaperUser);
    }

    /**
     * DELETE  /test-paper-users/:id : delete the "id" testPaperUser.
     *
     * @param id the id of the testPaperUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-paper-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestPaperUser(@PathVariable Long id) {
        log.debug("REST request to delete TestPaperUser : {}", id);

        testPaperUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
