import { EmployeeItem } from './EmployeeItem';
import { useEffect, useState } from 'react';
import { getListEmployees } from './../service/localstorage';

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setEmployees(getListEmployees());
    }, []);

    return (
        <div>
            <h1 className="my-5 text-center">Usuarios</h1>

            {
                employees.length > 0 ? (
                    <div className="card bg-secondary p-3">
                        <table className="table table-hover"table class="table table-hover col-xs-6 col-md-4 col-sm-12">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Direccion</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Opción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map(employee => <EmployeeItem employee={employee} key={employee.id} setEmployees={setEmployees} />)
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-center">No Hay Usuarios</h3>
                )
            }

        </div>
    )
}
