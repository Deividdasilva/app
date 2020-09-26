import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Button, Container, Form } from  'react-bootstrap' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formulario, Title } from "../styles";



const Registration = (props) => {

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
      <>
      

      <Formulario>
     
          <Form onSubmit={handleSubmit}>

              <Title>
                Cadastro
              </Title>

            <Form.Group controlId="formBasicName" >
              <Form.Label>Nome:</Form.Label>
              <Form.Control 
                    type="text"
                    className="form-control"
                    placeholder="name"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name} 
              />
            </Form.Group>

    

            <Form.Group controlId="formBasicIdade">
              <Form.Label>Idade:</Form.Label>
              <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="idade"
                  name="idade"
                  onChange={handleInputChange}
                  value={values.idade}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control 
                type="text"
                className="form-control"
                placeholder="estadocivil"
                name="estadocivil"
                onChange={handleInputChange}
                value={values.estadocivil}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>CPF:</Form.Label>
              <Form.Control 
                type="text"
                className="form-control"
                placeholder="cpf"
                name="cpf"
                onChange={handleInputChange}
                value={values.cpf}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Estado:</Form.Label>
              <Form.Control 
                  type="text"
                  className="form-control"
                  placeholder="estado"
                  name="estado"
                  onChange={handleInputChange}
                  value={values.estado}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Cidade:</Form.Label>
              <Form.Control 
                  type="text"
                  className="form-control"
                  placeholder="cidade"
                  name="cidade"
                  onChange={handleInputChange}
                  value={values.cidade}
              />
            </Form.Group>

            
            <Button variant="primary" type="submit">
                {props.currentId === '' ? 'salvar' : 'Atualizar'}
            </Button>
        </Form> 
     
      </Formulario>
     </> 
    );
}


export default Registration;