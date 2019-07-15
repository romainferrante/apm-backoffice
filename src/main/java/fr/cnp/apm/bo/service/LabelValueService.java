package fr.cnp.apm.bo.service;

import fr.cnp.apm.bo.domain.LabelValue;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link LabelValue}.
 */
public interface LabelValueService {

    /**
     * Save a labelValue.
     *
     * @param labelValue the entity to save.
     * @return the persisted entity.
     */
    LabelValue save(LabelValue labelValue);

    /**
     * Get all the labelValues.
     *
     * @return the list of entities.
     */
    List<LabelValue> findAll();


    /**
     * Get the "id" labelValue.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LabelValue> findOne(Long id);

    /**
     * Delete the "id" labelValue.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
