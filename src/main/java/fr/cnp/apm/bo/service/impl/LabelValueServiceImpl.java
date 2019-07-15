package fr.cnp.apm.bo.service.impl;

import fr.cnp.apm.bo.service.LabelValueService;
import fr.cnp.apm.bo.domain.LabelValue;
import fr.cnp.apm.bo.repository.LabelValueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link LabelValue}.
 */
@Service
@Transactional
public class LabelValueServiceImpl implements LabelValueService {

    private final Logger log = LoggerFactory.getLogger(LabelValueServiceImpl.class);

    private final LabelValueRepository labelValueRepository;

    public LabelValueServiceImpl(LabelValueRepository labelValueRepository) {
        this.labelValueRepository = labelValueRepository;
    }

    /**
     * Save a labelValue.
     *
     * @param labelValue the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LabelValue save(LabelValue labelValue) {
        log.debug("Request to save LabelValue : {}", labelValue);
        return labelValueRepository.save(labelValue);
    }

    /**
     * Get all the labelValues.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LabelValue> findAll() {
        log.debug("Request to get all LabelValues");
        return labelValueRepository.findAll();
    }


    /**
     * Get one labelValue by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LabelValue> findOne(Long id) {
        log.debug("Request to get LabelValue : {}", id);
        return labelValueRepository.findById(id);
    }

    /**
     * Delete the labelValue by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LabelValue : {}", id);
        labelValueRepository.deleteById(id);
    }
}
