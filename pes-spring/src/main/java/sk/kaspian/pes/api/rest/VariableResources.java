package sk.kaspian.pes.api.rest;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import sk.kaspian.pes.model.Campaigne;
import sk.kaspian.pes.model.Coworker;
import sk.kaspian.pes.model.Event;
import sk.kaspian.pes.model.Institution;
import sk.kaspian.pes.model.Method;
import sk.kaspian.pes.model.Program;
import io.swagger.annotations.ApiResponse;

@Api(value = "variable",  description = "Variable API")
public interface VariableResources {
	
	Logger log = LoggerFactory.getLogger(VariableResources.class);

    default Optional<ObjectMapper> getObjectMapper() {
        return Optional.empty();
    }

    default Optional<HttpServletRequest> getRequest() {
        return Optional.empty();
    }

    default Optional<String> getAcceptHeader() {
        return getRequest().map(r -> r.getHeader("Accept"));
    }

    
    @ApiOperation(value = "Get campaignes", nickname = "getCampaignes", response = String.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Successfully returned campaignes", response = String.class),
        })
    @GetMapping(value = "/api/campaignes", produces = MediaType.APPLICATION_JSON_VALUE )
    default ResponseEntity<List<Campaigne>> getCampaignes() {
        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {

        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default CampaignesApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    
    @ApiOperation(value = "Get coworkers", nickname = "getCoworkers", response = String.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Successfully returned coworkers", response = String.class),
        })
    @GetMapping(value = "/api/coworkers", produces = MediaType.APPLICATION_JSON_VALUE )
    default ResponseEntity<List<Coworker>> getCoworkers() {
        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {

        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default VariableApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    
    @ApiOperation(value = "Get events", nickname = "getEvents", response = String.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Successfully returned events", response = String.class),
        })
    @GetMapping(value = "/api/events", produces = MediaType.APPLICATION_JSON_VALUE )
    default ResponseEntity<List<Event>> getEvents() {
        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {

        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default VariableApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    
    @ApiOperation(value = "Get institutions", nickname = "getInstitutions", response = String.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Successfully returned institutions", response = String.class),
        })
    @GetMapping(value = "/api/institutions", produces = MediaType.APPLICATION_JSON_VALUE )
    default ResponseEntity<List<Institution>> getInstitutions() {
        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {

        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default VariableApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    
    @ApiOperation(value = "Get methods", nickname = "getMethods", response = String.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Successfully returned methods", response = String.class),
        })
    @GetMapping(value = "/api/methods", produces = MediaType.APPLICATION_JSON_VALUE )
    default ResponseEntity<List<Method>> getMethods() {
        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {

        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default VariableApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
    
    @ApiOperation(value = "Get programs", nickname = "getPrograms", response = String.class)
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Successfully returned programs", response = String.class),
        })
    @GetMapping(value = "/api/programs", produces = MediaType.APPLICATION_JSON_VALUE )
    default ResponseEntity<List<Program>> getPrograms() {
        if(getObjectMapper().isPresent() && getAcceptHeader().isPresent()) {

        } else {
            log.warn("ObjectMapper or HttpServletRequest not configured in default VariableApi interface so no example is generated");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

}
