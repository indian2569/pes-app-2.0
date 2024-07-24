package sk.kaspian.pes.pes;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class PesApplicationTests {

	@Test
	void contextLoads() {
		assertEquals("test", new String("test"));
	}

}
