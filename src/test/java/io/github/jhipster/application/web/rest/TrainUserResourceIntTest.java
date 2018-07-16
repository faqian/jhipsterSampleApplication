package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.TrainUser;
import io.github.jhipster.application.repository.TrainUserRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrainUserResource REST controller.
 *
 * @see TrainUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TrainUserResourceIntTest {

    @Autowired
    private TrainUserRepository trainUserRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTrainUserMockMvc;

    private TrainUser trainUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainUserResource trainUserResource = new TrainUserResource(trainUserRepository);
        this.restTrainUserMockMvc = MockMvcBuilders.standaloneSetup(trainUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainUser createEntity(EntityManager em) {
        TrainUser trainUser = new TrainUser();
        return trainUser;
    }

    @Before
    public void initTest() {
        trainUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainUser() throws Exception {
        int databaseSizeBeforeCreate = trainUserRepository.findAll().size();

        // Create the TrainUser
        restTrainUserMockMvc.perform(post("/api/train-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainUser)))
            .andExpect(status().isCreated());

        // Validate the TrainUser in the database
        List<TrainUser> trainUserList = trainUserRepository.findAll();
        assertThat(trainUserList).hasSize(databaseSizeBeforeCreate + 1);
        TrainUser testTrainUser = trainUserList.get(trainUserList.size() - 1);
    }

    @Test
    @Transactional
    public void createTrainUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainUserRepository.findAll().size();

        // Create the TrainUser with an existing ID
        trainUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainUserMockMvc.perform(post("/api/train-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainUser)))
            .andExpect(status().isBadRequest());

        // Validate the TrainUser in the database
        List<TrainUser> trainUserList = trainUserRepository.findAll();
        assertThat(trainUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTrainUsers() throws Exception {
        // Initialize the database
        trainUserRepository.saveAndFlush(trainUser);

        // Get all the trainUserList
        restTrainUserMockMvc.perform(get("/api/train-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainUser.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getTrainUser() throws Exception {
        // Initialize the database
        trainUserRepository.saveAndFlush(trainUser);

        // Get the trainUser
        restTrainUserMockMvc.perform(get("/api/train-users/{id}", trainUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trainUser.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTrainUser() throws Exception {
        // Get the trainUser
        restTrainUserMockMvc.perform(get("/api/train-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainUser() throws Exception {
        // Initialize the database
        trainUserRepository.saveAndFlush(trainUser);

        int databaseSizeBeforeUpdate = trainUserRepository.findAll().size();

        // Update the trainUser
        TrainUser updatedTrainUser = trainUserRepository.findById(trainUser.getId()).get();
        // Disconnect from session so that the updates on updatedTrainUser are not directly saved in db
        em.detach(updatedTrainUser);

        restTrainUserMockMvc.perform(put("/api/train-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainUser)))
            .andExpect(status().isOk());

        // Validate the TrainUser in the database
        List<TrainUser> trainUserList = trainUserRepository.findAll();
        assertThat(trainUserList).hasSize(databaseSizeBeforeUpdate);
        TrainUser testTrainUser = trainUserList.get(trainUserList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainUser() throws Exception {
        int databaseSizeBeforeUpdate = trainUserRepository.findAll().size();

        // Create the TrainUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTrainUserMockMvc.perform(put("/api/train-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainUser)))
            .andExpect(status().isBadRequest());

        // Validate the TrainUser in the database
        List<TrainUser> trainUserList = trainUserRepository.findAll();
        assertThat(trainUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrainUser() throws Exception {
        // Initialize the database
        trainUserRepository.saveAndFlush(trainUser);

        int databaseSizeBeforeDelete = trainUserRepository.findAll().size();

        // Get the trainUser
        restTrainUserMockMvc.perform(delete("/api/train-users/{id}", trainUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TrainUser> trainUserList = trainUserRepository.findAll();
        assertThat(trainUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainUser.class);
        TrainUser trainUser1 = new TrainUser();
        trainUser1.setId(1L);
        TrainUser trainUser2 = new TrainUser();
        trainUser2.setId(trainUser1.getId());
        assertThat(trainUser1).isEqualTo(trainUser2);
        trainUser2.setId(2L);
        assertThat(trainUser1).isNotEqualTo(trainUser2);
        trainUser1.setId(null);
        assertThat(trainUser1).isNotEqualTo(trainUser2);
    }
}
