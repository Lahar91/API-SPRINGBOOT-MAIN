package io.spring.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import io.spring.api.models.Employee;
import io.spring.api.services.IEmployeeService;

@SpringBootTest
class ApiApplicationTests {
	private IEmployeeService employeeService;

	@Autowired
	public ApiApplicationTests(IEmployeeService employeeService){
		this.employeeService = employeeService;
	}
	
	@Test
	void contextLoads() {
	}

	@Test
	void insert(){
		// Arrange
		Employee employee = new Employee();

		//Act 
		employee.setEmail("androrif20@gmail.com");
		employee.setFullname("Rifki Rahardjo");
		Boolean result = employeeService.Save(employee);
		
		//Assert 
		Assertions.assertThat(result).isEqualTo(true);
	}



	@Test
	void Getbyid(){
		// Arrange
		
		List<Employee> employees = new ArrayList<>();
		//Act

		Boolean result =  employees.add(employeeService.Get(9));

		//Assert
		Assertions.assertThat(result).isEqualTo(true);

	}

	@Test
	void Getall(){
		// Arrange
		List<Employee> employees = employeeService.Get();
		
		//Act
		Boolean result =  employees.isEmpty();

		//Assert
		Assertions.assertThat(result).isEqualTo(false);

	}

	@Test
	void update(){
		// Arrange
		Employee employee = employeeService.Get(5);

		//Act
		String name = "Rifki Rahardjo2";
		employee.setFullname("Rifki Rahardjo2");
		employeeService.Save(employee);

		//Assert
		assertEquals(name, employee.getFullname());
	}

	@Test
	void delete(){
		// Arrange
		Employee employee = employeeService.Get(9);

		//Act
		Boolean result =employeeService.Delete(employee.getId());

		//Assert
		Assertions.assertThat(result).isEqualTo(true);


	}


}
