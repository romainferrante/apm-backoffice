package fr.cnp.apm.bo.service;

import fr.cnp.apm.bo.domain.Label;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Label}.
 */
public interface LabelService {

    /**
     * Save a label.
     *
     * @param label the entity to save.
     * @return the persisted entity.
     */
    Label save(Label label);

    /**
     * Get all the labels.
     *
     * @return the list of entities.
     */
    List<Label> findAll();


    /**
     * Get the "id" label.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Label> findOne(Long id);

    /**
     * Delete the "id" label.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
