package fr.cnp.apm.bo.web.rest;

import fr.cnp.apm.bo.ApmBackOfficeApp;
import fr.cnp.apm.bo.domain.LabelValue;
import fr.cnp.apm.bo.repository.LabelValueRepository;
import fr.cnp.apm.bo.service.LabelValueService;
import fr.cnp.apm.bo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static fr.cnp.apm.bo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link LabelValueResource} REST controller.
 */
@SpringBootTest(classes = ApmBackOfficeApp.class)
public class LabelValueResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_LANG = "AAAAAAAAAA";
    private static final String UPDATED_LANG = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATE_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LabelValueRepository labelValueRepository;

    @Autowired
    private LabelValueService labelValueService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restLabelValueMockMvc;

    private LabelValue labelValue;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LabelValueResource labelValueResource = new LabelValueResource(labelValueService);
        this.restLabelValueMockMvc = MockMvcBuilders.standaloneSetup(labelValueResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LabelValue createEntity(EntityManager em) {
        LabelValue labelValue = new LabelValue()
            .value(DEFAULT_VALUE)
            .lang(DEFAULT_LANG)
            .country(DEFAULT_COUNTRY)
            .creationDate(DEFAULT_CREATION_DATE)
            .updateDate(DEFAULT_UPDATE_DATE);
        return labelValue;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LabelValue createUpdatedEntity(EntityManager em) {
        LabelValue labelValue = new LabelValue()
            .value(UPDATED_VALUE)
            .lang(UPDATED_LANG)
            .country(UPDATED_COUNTRY)
            .creationDate(UPDATED_CREATION_DATE)
            .updateDate(UPDATED_UPDATE_DATE);
        return labelValue;
    }

    @BeforeEach
    public void initTest() {
        labelValue = createEntity(em);
    }

    @Test
    @Transactional
    public void createLabelValue() throws Exception {
        int databaseSizeBeforeCreate = labelValueRepository.findAll().size();

        // Create the LabelValue
        restLabelValueMockMvc.perform(post("/api/label-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(labelValue)))
            .andExpect(status().isCreated());

        // Validate the LabelValue in the database
        List<LabelValue> labelValueList = labelValueRepository.findAll();
        assertThat(labelValueList).hasSize(databaseSizeBeforeCreate + 1);
        LabelValue testLabelValue = labelValueList.get(labelValueList.size() - 1);
        assertThat(testLabelValue.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testLabelValue.getLang()).isEqualTo(DEFAULT_LANG);
        assertThat(testLabelValue.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testLabelValue.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testLabelValue.getUpdateDate()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createLabelValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = labelValueRepository.findAll().size();

        // Create the LabelValue with an existing ID
        labelValue.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLabelValueMockMvc.perform(post("/api/label-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(labelValue)))
            .andExpect(status().isBadRequest());

        // Validate the LabelValue in the database
        List<LabelValue> labelValueList = labelValueRepository.findAll();
        assertThat(labelValueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLabelValues() throws Exception {
        // Initialize the database
        labelValueRepository.saveAndFlush(labelValue);

        // Get all the labelValueList
        restLabelValueMockMvc.perform(get("/api/label-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(labelValue.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].lang").value(hasItem(DEFAULT_LANG.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].updateDate").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getLabelValue() throws Exception {
        // Initialize the database
        labelValueRepository.saveAndFlush(labelValue);

        // Get the labelValue
        restLabelValueMockMvc.perform(get("/api/label-values/{id}", labelValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(labelValue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.lang").value(DEFAULT_LANG.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.updateDate").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLabelValue() throws Exception {
        // Get the labelValue
        restLabelValueMockMvc.perform(get("/api/label-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLabelValue() throws Exception {
        // Initialize the database
        labelValueService.save(labelValue);

        int databaseSizeBeforeUpdate = labelValueRepository.findAll().size();

        // Update the labelValue
        LabelValue updatedLabelValue = labelValueRepository.findById(labelValue.getId()).get();
        // Disconnect from session so that the updates on updatedLabelValue are not directly saved in db
        em.detach(updatedLabelValue);
        updatedLabelValue
            .value(UPDATED_VALUE)
            .lang(UPDATED_LANG)
            .country(UPDATED_COUNTRY)
            .creationDate(UPDATED_CREATION_DATE)
            .updateDate(UPDATED_UPDATE_DATE);

        restLabelValueMockMvc.perform(put("/api/label-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLabelValue)))
            .andExpect(status().isOk());

        // Validate the LabelValue in the database
        List<LabelValue> labelValueList = labelValueRepository.findAll();
        assertThat(labelValueList).hasSize(databaseSizeBeforeUpdate);
        LabelValue testLabelValue = labelValueList.get(labelValueList.size() - 1);
        assertThat(testLabelValue.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testLabelValue.getLang()).isEqualTo(UPDATED_LANG);
        assertThat(testLabelValue.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testLabelValue.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testLabelValue.getUpdateDate()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingLabelValue() throws Exception {
        int databaseSizeBeforeUpdate = labelValueRepository.findAll().size();

        // Create the LabelValue

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLabelValueMockMvc.perform(put("/api/label-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(labelValue)))
            .andExpect(status().isBadRequest());

        // Validate the LabelValue in the database
        List<LabelValue> labelValueList = labelValueRepository.findAll();
        assertThat(labelValueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLabelValue() throws Exception {
        // Initialize the database
        labelValueService.save(labelValue);

        int databaseSizeBeforeDelete = labelValueRepository.findAll().size();

        // Delete the labelValue
        restLabelValueMockMvc.perform(delete("/api/label-values/{id}", labelValue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LabelValue> labelValueList = labelValueRepository.findAll();
        assertThat(labelValueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LabelValue.class);
        LabelValue labelValue1 = new LabelValue();
        labelValue1.setId(1L);
        LabelValue labelValue2 = new LabelValue();
        labelValue2.setId(labelValue1.getId());
        assertThat(labelValue1).isEqualTo(labelValue2);
        labelValue2.setId(2L);
        assertThat(labelValue1).isNotEqualTo(labelValue2);
        labelValue1.setId(null);
        assertThat(labelValue1).isNotEqualTo(labelValue2);
    }
}
