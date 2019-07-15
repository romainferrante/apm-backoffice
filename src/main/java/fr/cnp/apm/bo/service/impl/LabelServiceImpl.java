package fr.cnp.apm.bo.service.impl;

import fr.cnp.apm.bo.service.LabelService;
import fr.cnp.apm.bo.domain.Label;
import fr.cnp.apm.bo.repository.LabelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Label}.
 */
@Service
@Transactional
public class LabelServiceImpl implements LabelService {

    private final Logger log = LoggerFactory.getLogger(LabelServiceImpl.class);

    private final LabelRepository labelRepository;

    public LabelServiceImpl(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    /**
     * Save a label.
     *
     * @param label the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Label save(Label label) {
        log.debug("Request to save Label : {}", label);
        return labelRepository.save(label);
    }

    /**
     * Get all the labels.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Label> findAll() {
        log.debug("Request to get all Labels");
        return labelRepository.findAll();
    }


    /**
     * Get one label by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Label> findOne(Long id) {
        log.debug("Request to get Label : {}", id);
        return labelRepository.findById(id);
    }

    /**
     * Delete the label by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Label : {}", id);
        labelRepository.deleteById(id);
    }
}
