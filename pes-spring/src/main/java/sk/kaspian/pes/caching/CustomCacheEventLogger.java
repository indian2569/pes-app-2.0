package sk.kaspian.pes.caching;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.stereotype.Component;
import org.ehcache.event.CacheEvent;
import org.ehcache.event.CacheEventListener;

@Component
public class CustomCacheEventLogger implements CacheEventListener<Object, Object>  {


    @Override
    public void onEvent(CacheEvent<?, ?> cacheEvent) {
        System.out.println(String.format("Cache event = %s, Key = %s, Old value = %s, New value = %s",
                cacheEvent.getType(),
                cacheEvent.getKey(),
                cacheEvent.getOldValue(),
                cacheEvent.getNewValue()));
    }
}
