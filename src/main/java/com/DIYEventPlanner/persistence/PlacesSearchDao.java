package com.DIYEventPlanner.persistence;

import com.DIYEventPlanner.util.PropertiesLoader;
import com.google.maps.GeoApiContext;
import com.google.maps.PlaceAutocompleteRequest;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AutocompletePrediction;
import com.google.maps.model.ComponentFilter;
import com.google.maps.model.PlaceAutocompleteType;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;

import java.io.IOException;
import java.util.*;

@Getter
@Setter
public class PlacesSearchDao implements PropertiesLoader {

	private final Logger logger = (Logger) LogManager.getLogger(this.getClass());
	private Properties properties;
	private String input;
	private PlaceAutocompleteRequest.SessionToken token;
	private GeoApiContext context;
	private List<AutocompletePrediction> predictions;

	public PlacesSearchDao() {
	}

	public PlacesSearchDao(String input) {
		this.input = input;
		this.properties = new Properties(loadProperties("/google.api.properties"));
		this.token = new PlaceAutocompleteRequest.SessionToken();
		this.context = new GeoApiContext.Builder().apiKey(properties.getProperty("api.key")).build();
		this.predictions = Collections.synchronizedList(new ArrayList<>());
	}


	public AutocompletePrediction[] placeAutocompleteRequest(String input) {
		try {
			AutocompletePrediction[] fetchedPredictions = PlacesApi.placeAutocomplete(context, input, token)
					.types(PlaceAutocompleteType.ESTABLISHMENT)
					.components(ComponentFilter.country("US"))
					.offset(input.length())
					.await();
			synchronized (predictions) {
				predictions.addAll(Arrays.asList(fetchedPredictions));
			}
		} catch (ApiException | InterruptedException | IOException e) {
			logger.error("Error occurred while fetching place autocomplete predictions", e);
			throw new RuntimeException(e);
		}
		return predictions.toArray(new AutocompletePrediction[0]);
	}
}