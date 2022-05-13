package server.thematicblogplatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.thematicblogplatform.dto.TagDto;
import server.thematicblogplatform.model.Tag;
import server.thematicblogplatform.repository.TagRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private MappingUtils mappingUtils;

    public List<TagDto> findAll() {
        return tagRepository.findAll().stream().map(e -> mappingUtils.mapToTagDto(e)).collect(Collectors.toList());
    }

    public List<TagDto> findByIds(List<Long> ids) {
        return tagRepository.findAllById(ids).stream().map(e -> mappingUtils.mapToTagDto(e)).collect(Collectors.toList());
    }
}
