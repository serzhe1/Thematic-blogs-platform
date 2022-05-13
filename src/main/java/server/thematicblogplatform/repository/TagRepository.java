package server.thematicblogplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import server.thematicblogplatform.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

}
