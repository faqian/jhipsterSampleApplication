package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.TestPaper;
import io.github.jhipster.application.repository.TestPaperRepository;
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
 * Test class for the TestPaperResource REST controller.
 *
 * @see TestPaperResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TestPaperResourceIntTest {

    @Autowired
    private TestPaperRepository testPaperRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestPaperMockMvc;

    private TestPaper testPaper;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestPaperResource testPaperResource = new TestPaperResource(testPaperRepository);
        this.restTestPaperMockMvc = MockMvcBuilders.standaloneSetup(testPaperResource)
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
    public static TestPaper createEntity(EntityManager em) {
        TestPaper testPaper = new TestPaper();
        return testPaper;
    }

    @Before
    public void initTest() {
        testPaper = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestPaper() throws Exception {
        int databaseSizeBeforeCreate = testPaperRepository.findAll().size();

        // Create the TestPaper
        restTestPaperMockMvc.perform(post("/api/test-papers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPaper)))
            .andExpect(status().isCreated());

        // Validate the TestPaper in the database
        List<TestPaper> testPaperList = testPaperRepository.findAll();
        assertThat(testPaperList).hasSize(databaseSizeBeforeCreate + 1);
        TestPaper testTestPaper = testPaperList.get(testPaperList.size() - 1);
    }

    @Test
    @Transactional
    public void createTestPaperWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testPaperRepository.findAll().size();

        // Create the TestPaper with an existing ID
        testPaper.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestPaperMockMvc.perform(post("/api/test-papers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPaper)))
            .andExpect(status().isBadRequest());

        // Validate the TestPaper in the database
        List<TestPaper> testPaperList = testPaperRepository.findAll();
        assertThat(testPaperList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestPapers() throws Exception {
        // Initialize the database
        testPaperRepository.saveAndFlush(testPaper);

        // Get all the testPaperList
        restTestPaperMockMvc.perform(get("/api/test-papers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testPaper.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getTestPaper() throws Exception {
        // Initialize the database
        testPaperRepository.saveAndFlush(testPaper);

        // Get the testPaper
        restTestPaperMockMvc.perform(get("/api/test-papers/{id}", testPaper.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testPaper.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTestPaper() throws Exception {
        // Get the testPaper
        restTestPaperMockMvc.perform(get("/api/test-papers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestPaper() throws Exception {
        // Initialize the database
        testPaperRepository.saveAndFlush(testPaper);

        int databaseSizeBeforeUpdate = testPaperRepository.findAll().size();

        // Update the testPaper
        TestPaper updatedTestPaper = testPaperRepository.findById(testPaper.getId()).get();
        // Disconnect from session so that the updates on updatedTestPaper are not directly saved in db
        em.detach(updatedTestPaper);

        restTestPaperMockMvc.perform(put("/api/test-papers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestPaper)))
            .andExpect(status().isOk());

        // Validate the TestPaper in the database
        List<TestPaper> testPaperList = testPaperRepository.findAll();
        assertThat(testPaperList).hasSize(databaseSizeBeforeUpdate);
        TestPaper testTestPaper = testPaperList.get(testPaperList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingTestPaper() throws Exception {
        int databaseSizeBeforeUpdate = testPaperRepository.findAll().size();

        // Create the TestPaper

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestPaperMockMvc.perform(put("/api/test-papers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testPaper)))
            .andExpect(status().isBadRequest());

        // Validate the TestPaper in the database
        List<TestPaper> testPaperList = testPaperRepository.findAll();
        assertThat(testPaperList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTestPaper() throws Exception {
        // Initialize the database
        testPaperRepository.saveAndFlush(testPaper);

        int databaseSizeBeforeDelete = testPaperRepository.findAll().size();

        // Get the testPaper
        restTestPaperMockMvc.perform(delete("/api/test-papers/{id}", testPaper.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestPaper> testPaperList = testPaperRepository.findAll();
        assertThat(testPaperList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestPaper.class);
        TestPaper testPaper1 = new TestPaper();
        testPaper1.setId(1L);
        TestPaper testPaper2 = new TestPaper();
        testPaper2.setId(testPaper1.getId());
        assertThat(testPaper1).isEqualTo(testPaper2);
        testPaper2.setId(2L);
        assertThat(testPaper1).isNotEqualTo(testPaper2);
        testPaper1.setId(null);
        assertThat(testPaper1).isNotEqualTo(testPaper2);
    }
}
