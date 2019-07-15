package fr.cnp.apm.bo.repository;

import fr.cnp.apm.bo.domain.LabelValue;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LabelValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LabelValueRepository extends JpaRepository<LabelValue, Long> {

}
