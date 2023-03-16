package io.spring.api.respositories;

import org.springframework.stereotype.Repository;

import io.spring.api.models.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface IEmployeerepository extends JpaRepository<Employee, Integer>{
    
}
