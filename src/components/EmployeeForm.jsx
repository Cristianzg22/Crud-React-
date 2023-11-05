import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById, getListEmployees } from '../service/localstorage';
import { useForm } from './../hooks/useForm';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import { editEmployee } from './../service/localstorage';

export const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showAlert, setshowAlert] = useState(false);
    const { inputValues, handleInputChange, resetForm, setForm } = useForm({
        Nombre: '',
        email: '',
        Direccion: '',
        Telefono: ''
    });

    useEffect(() => {
        if (id) {
            const employee = getEmployeeById(id);
            setForm(employee);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValues.Nombre || !inputValues.email) {
            alert('Por favor, completa el nombre y el email');
            return;
        }

        const existingEmployee = getListEmployees().find(employee => employee.email === inputValues.email);
        if (existingEmployee) {
            alert('Este email ya ha sido registrado');
            return;
        }

        id ? editEmployee(id, inputValues) : addEmployee({ id: uuid(), ...inputValues });
        resetForm();
        setshowAlert(true);
        setTimeout(() => {
            setshowAlert(false);
        }, 2000);
    };

    return (
        <div>
            <div className="d-flex my-5 justify-content-between">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/")}>Atrás</button>
                <h1 className="text-center">{id ? "Editar" : "Agregar"} Usuario</h1>
                <div />
            </div>

            <div className="card border-primary p-5 m-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Nombre</label>
                        <input
                            name="Nombre"
                            type="text"
                            value={inputValues.Nombre}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={inputValues.email}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Direccion</label>
                        <input
                            type="text"
                            name="Direccion"
                            value={inputValues.Direccion}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Telefono</label>
                        <input
                            name="Telefono"
                            type="text"
                            value={inputValues.Telefono}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-outline-primary btn-block">{id ? "Editar" : "Agregar"} Usuario</button>
                    </div>
                </form>
            </div>

            {showAlert && (
                <div className="px-5">
                    <div className="alert alert-success">
                        <strong>¡Bien hecho!</strong> {id ? "Editar" : "Añadido"} Usuario.
                    </div>
                </div>
            )}
        </div>
    );
};
