package io.spring.api.services;

import java.util.List;

import io.spring.api.models.Employee;

public interface IEmployeeService {
    public List<Employee> Get();
    public Employee Get(Integer id);
    public Boolean Save(Employee employee);
    public Boolean Delete(Integer id);
}
