package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.TestPaperUser;
import io.github.jhipster.application.repository.TestPaperUserRepository;
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
 * Test class for the TestPaperUserResource REST controller.
 *
 * @see TestPaperUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TestPaperUserResourceIntTest {

    @Autowired
    private TestPaperUserRepository testPaperUserRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestPaperUserMockMvc;

    private TestPaperUser testPaperUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestPaperUserResource testPaperUserResource = new TestPaperUserResource(testPaperUserRepository);
        this.restTestPaperUserMockMvc = MockMvcBuilders.standaloneSetup(testPaperUserResource)
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
    public static TestPaperUser createEntity(EntityManager em) {
        TestPaperUser testPaperUser = new TestPaperUser();
        return testPaperUser;
    }

    @Before
    public void initTest() {
        testPaperUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestPaperUser() throws Exception {
        int databaseSizeBeforeCreate = testPaperUserRepository.findAll().size();

        // Create the TestPaperUser
        restTestPaperUserMockMvc.perform(post("/api/test-paper-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPaperUser)))
            .andExpect(status().isCreated());

        // Validate the TestPaperUser in the database
        List<TestPaperUser> testPaperUserList = testPaperUserRepository.findAll();
        assertThat(testPaperUserList).hasSize(databaseSizeBeforeCreate + 1);
        TestPaperUser testTestPaperUser = testPaperUserList.get(testPaperUserList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestPaperUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testPaperUserRepository.findAll().size();

        // Create the TestPaperUser with an existing ID
        testPaperUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestPaperUserMockMvc.perform(post("/api/test-paper-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPaperUser)))
            .andExpect(status().isBadRequest());

        // Validate the TestPaperUser in the database
        List<TestPaperUser> testPaperUserList = testPaperUserRepository.findAll();
        assertThat(testPaperUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestPaperUsers() throws Exception {
        // Initialize the database
        testPaperUserRepository.saveAndFlush(testPaperUser);

        // Get all the testPaperUserList
        restTestPaperUserMockMvc.perform(get("/api/test-paper-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPaperUser.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getTestPaperUser() throws Exception {
        // Initialize the database
        testPaperUserRepository.saveAndFlush(testPaperUser);

        // Get the testPaperUser
        restTestPaperUserMockMvc.perform(get("/api/test-paper-users/{id}", testPaperUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testPaperUser.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTestPaperUser() throws Exception {
        // Get the testPaperUser
        restTestPaperUserMockMvc.perform(get("/api/test-paper-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestPaperUser() throws Exception {
        // Initialize the database
        testPaperUserRepository.saveAndFlush(testPaperUser);

        int databaseSizeBeforeUpdate = testPaperUserRepository.findAll().size();

        // Update the testPaperUser
        TestPaperUser updatedTestPaperUser = testPaperUserRepository.findById(testPaperUser.getId()).get();
        // Disconnect from session so that the updates on updatedTestPaperUser are not directly saved in db
        em.detach(updatedTestPaperUser);

        restTestPaperUserMockMvc.perform(put("/api/test-paper-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestPaperUser)))
            .andExpect(status().isOk());

        // Validate the TestPaperUser in the database
        List<TestPaperUser> testPaperUserList = testPaperUserRepository.findAll();
        assertThat(testPaperUserList).hasSize(databaseSizeBeforeUpdate);
        TestPaperUser testTestPaperUser = testPaperUserList.get(testPaperUserList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestPaperUser() throws Exception {
        int databaseSizeBeforeUpdate = testPaperUserRepository.findAll().size();

        // Create the TestPaperUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestPaperUserMockMvc.perform(put("/api/test-paper-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPaperUser)))
            .andExpect(status().isBadRequest());

        // Validate the TestPaperUser in the database
        List<TestPaperUser> testPaperUserList = testPaperUserRepository.findAll();
        assertThat(testPaperUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestPaperUser() throws Exception {
        // Initialize the database
        testPaperUserRepository.saveAndFlush(testPaperUser);

        int databaseSizeBeforeDelete = testPaperUserRepository.findAll().size();

        // Get the testPaperUser
        restTestPaperUserMockMvc.perform(delete("/api/test-paper-users/{id}", testPaperUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestPaperUser> testPaperUserList = testPaperUserRepository.findAll();
        assertThat(testPaperUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestPaperUser.class);
        TestPaperUser testPaperUser1 = new TestPaperUser();
        testPaperUser1.setId(1L);
        TestPaperUser testPaperUser2 = new TestPaperUser();
        testPaperUser2.setId(testPaperUser1.getId());
        assertThat(testPaperUser1).isEqualTo(testPaperUser2);
        testPaperUser2.setId(2L);
        assertThat(testPaperUser1).isNotEqualTo(testPaperUser2);
        testPaperUser1.setId(null);
        assertThat(testPaperUser1).isNotEqualTo(testPaperUser2);
    }
}
