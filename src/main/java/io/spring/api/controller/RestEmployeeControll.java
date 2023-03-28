package io.spring.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.spring.api.dto.Response;
import io.spring.api.dto.ResponseHandler;
import io.spring.api.models.Employee;
import io.spring.api.services.IEmployeeService;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("api")
public class RestEmployeeControll {
    private IEmployeeService employeeService;

    public RestEmployeeControll(IEmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("employee")
    public ResponseEntity<Object> Get() {
        List<Employee> employee = employeeService.Get();
        return ResponseHandler.generateResponse("data ditemukan", HttpStatus.OK, employee);
    }

    @GetMapping("employee/{id}")
    public ResponseEntity<Object> Get(@PathVariable(required = true) Integer id) {
        Employee employee = employeeService.Get(id);
        return ResponseHandler.generateResponse("data ditemukan", HttpStatus.OK, employee);
    }

    @PostMapping("employee")
    public ResponseEntity<Object> Save(@RequestBody Employee addemployee) {
        Employee employee = new Employee();
        employee.setFullname(addemployee.getFullname());
        employee.setEmail(addemployee.getEmail());

        Boolean result = employeeService.Save(employee);
        if (result) {
            return Response.generateResponse("data berhasil tersimpan", HttpStatus.OK);
        }
        return Response.generateResponse("data gagal tersimpan", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("employee/{id}")
    public ResponseEntity<Object> Save(@RequestBody Employee addemployee, @PathVariable(required = true) Integer id) {
        Employee employee = employeeService.Get(id);
        employee.setEmail(addemployee.getEmail());
        employee.setFullname(addemployee.getFullname());
        Boolean result = employeeService.Save(employee);

        if (result) {
            return Response.generateResponse("data berhasil terupdate", HttpStatus.OK);
        }
        return Response.generateResponse("data gagal terupdate", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("employee/delete/{id}")
    public ResponseEntity<Object> Delete(@PathVariable(required = true) Integer id) {
        Boolean result = employeeService.Delete(id);
        if (result) {
            return Response.generateResponse("data berhasil terhapus", HttpStatus.OK);
        }
        return Response.generateResponse("data gagal terhapus", HttpStatus.BAD_REQUEST);
    }

}
