import React from 'react'
import { removeEmployee } from '../service/localstorage';
import { getListEmployees } from '../service/localstorage';
import { useNavigate } from 'react-router-dom';

export const EmployeeItem = ({ employee, setEmployees }) => {
    const { id, Nombre, email, Direccion, Telefono } = employee;
    const navigate = useNavigate();

    const deleteEmployee = () => {
        removeEmployee(id);
        setEmployees(getListEmployees());
    }

    return (
        <tr className="table-primasry">
            <th>{Nombre}</th>
            <td>{email}</td>
            <td>{Direccion}</td>
            <td>{Telefono}</td>
            <td>
                <div className="d-flex gap-3">
                    <span type="button" className="badge bg-success" onClick={() => navigate(`/edit-employee/${id}`)}>Editar</span>
                    <span type="button" className="badge bg-danger" onClick={() => deleteEmployee()}>Eliminar</span>
                </div>
            </td>
        </tr>
    )
}
