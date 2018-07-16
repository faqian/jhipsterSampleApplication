package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TrainUser;
import io.github.jhipster.application.repository.TrainUserRepository;
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
 * REST controller for managing TrainUser.
 */
@RestController
@RequestMapping("/api")
public class TrainUserResource {

    private final Logger log = LoggerFactory.getLogger(TrainUserResource.class);

    private static final String ENTITY_NAME = "trainUser";

    private final TrainUserRepository trainUserRepository;

    public TrainUserResource(TrainUserRepository trainUserRepository) {
        this.trainUserRepository = trainUserRepository;
    }

    /**
     * POST  /train-users : Create a new trainUser.
     *
     * @param trainUser the trainUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trainUser, or with status 400 (Bad Request) if the trainUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/train-users")
    @Timed
    public ResponseEntity<TrainUser> createTrainUser(@RequestBody TrainUser trainUser) throws URISyntaxException {
        log.debug("REST request to save TrainUser : {}", trainUser);
        if (trainUser.getId() != null) {
            throw new BadRequestAlertException("A new trainUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrainUser result = trainUserRepository.save(trainUser);
        return ResponseEntity.created(new URI("/api/train-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /train-users : Updates an existing trainUser.
     *
     * @param trainUser the trainUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trainUser,
     * or with status 400 (Bad Request) if the trainUser is not valid,
     * or with status 500 (Internal Server Error) if the trainUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/train-users")
    @Timed
    public ResponseEntity<TrainUser> updateTrainUser(@RequestBody TrainUser trainUser) throws URISyntaxException {
        log.debug("REST request to update TrainUser : {}", trainUser);
        if (trainUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrainUser result = trainUserRepository.save(trainUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trainUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /train-users : get all the trainUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of trainUsers in body
     */
    @GetMapping("/train-users")
    @Timed
    public List<TrainUser> getAllTrainUsers() {
        log.debug("REST request to get all TrainUsers");
        return trainUserRepository.findAll();
    }

    /**
     * GET  /train-users/:id : get the "id" trainUser.
     *
     * @param id the id of the trainUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trainUser, or with status 404 (Not Found)
     */
    @GetMapping("/train-users/{id}")
    @Timed
    public ResponseEntity<TrainUser> getTrainUser(@PathVariable Long id) {
        log.debug("REST request to get TrainUser : {}", id);
        Optional<TrainUser> trainUser = trainUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(trainUser);
    }

    /**
     * DELETE  /train-users/:id : delete the "id" trainUser.
     *
     * @param id the id of the trainUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/train-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteTrainUser(@PathVariable Long id) {
        log.debug("REST request to delete TrainUser : {}", id);

        trainUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
