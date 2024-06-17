package com.DIYEventPlanner.persistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;

public class Crud<T> extends GenericDao<T> {
    private final Class<T> type;
    private final ObjectMapper mapper;
    private final Logger logger = LogManager.getLogger(this.getClass());

    public Crud(Class<T> type) {
        super(type);
        this.type = type;
        this.mapper = new ObjectMapper();
    }

    /**
     * Convert an entity to JSON string
     *
     * @param entity the entity to be converted
     * @return JSON string representation of the entity
     */
    public String toJson(T entity) {
        try {
            return mapper.writeValueAsString(entity);
        } catch (JsonProcessingException e) {
            logger.error("Error converting entity to JSON", e);
            return null;
        }
    }

    /**
     * Convert a list of entities to JSON string
     *
     * @param entities the list of entities to be converted
     * @return JSON string representation of the list of entities
     */
    public String toJson(List<T> entities) {
        try {
            return mapper.writeValueAsString(entities);
        } catch (JsonProcessingException e) {
            logger.error("Error converting list of entities to JSON", e);
            return null;
        }
    }

    /**
     * Convert JSON string to entity
     *
     * @param json the JSON string to be converted
     * @return entity object
     */
    public T fromJson(String json) {
        try {
            return mapper.readValue(json, type);
        } catch (JsonMappingException e) {
            logger.error("Error mapping JSON to entity", e);
            return null;
        } catch (JsonProcessingException e) {
            logger.error("Error processing JSON", e);
            return null;
        }
    }
}
