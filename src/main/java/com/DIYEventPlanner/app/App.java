package com.DIYEventPlanner.app;

import com.DIYEventPlanner.util.PropertiesLoader;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/app")
public class App extends Application implements PropertiesLoader {


    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(CustomCorsFilter.class);
        classes.add(AutocompleteResource.class);
        classes.add(Events.class);
        classes.add(NotebookCRUD.class);
        classes.add(LocationCRUD.class);
        classes.add(EventCRUD.class);
        classes.add(DetailsCRUD.class);
        classes.add(ArtistCRUD.class);
        return classes;
    }
}

