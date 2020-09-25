import React, { useState, useEffect } from 'react';
import { db } from '../firebase';


const Form = (props) => {

    const initialStateValues = {
        name: '',
        idade: '',
        estadocivil: '',
        cpf: '',
        cidade: '',
        estado: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const {name, value } = e.target;
        setValues({...values, [name]: value});
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditList(values);
        setValues({...initialStateValues})
    };

    const getListById = async (id) => {
        const doc = await db.collection('lists').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({...initialStateValues});
        }else{
            getListById(props.currentId);
        }
    }, [props.currentId]);
    return (

        <div className="row">
        
        <h3>Cadastro</h3>
        <form onSubmit={handleSubmit} name="formulario" id="formulario">
          <div className="form-group col-md-8">
            <label>Nome:</label>
            <input
              type="text"
                    className="form-control"
                    placeholder="name"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
            ></input>
          </div>

          <div className="form-group col-md-8">
            <label>Idade:</label>
            <input
              type="text"
                    className="form-control"
                    placeholder="idade"
                    name="idade"
                    onChange={handleInputChange}
                    value={values.idade}
            ></input>
          </div>

          <div className="form-group col-md-8">
            <label>Estado Civil:</label>
            <input
              type="text"
                    className="form-control"
                    placeholder="estadocivil"
                    name="estadocivil"
                    onChange={handleInputChange}
                    value={values.estadocivil}
            ></input>
          </div>

          <div className="form-group col-md-8">
            <label>CPF:</label>
            <input
              type="text"
                    className="form-control"
                    placeholder="cpf"
                    name="cpf"
                    onChange={handleInputChange}
                    value={values.cpf}
            ></input>
          </div>

          <div className="form-group col-md-8">
            <label>Estado</label>
            <input
                    type="text"
                    className="form-control"
                    placeholder="estado"
                    name="estado"
                    onChange={handleInputChange}
                    value={values.estado}
            ></input>
          </div>

          <div className="form-group col-md-8">
            <label>Cidade</label>
            <input
              type="text"
                    className="form-control"
                    placeholder="cidade"
                    name="cidade"
                    onChange={handleInputChange}
                    value={values.cidade}
            ></input>
          </div>
            <div className="form-group col-md-8">
                <button className="btn btn-primary btn-block">
                    {props.currentId === '' ? 'salvar' : 'Atualizar'}
                </button>
            </div>
         

        </form>
      </div>
        
        
    );
}


export default Form;