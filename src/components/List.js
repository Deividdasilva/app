import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Form from './Form';

const List = () => {

    const [list, setList] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditList = async (listObject) => {
        try {
            if (currentId === "") {
                await db.collection('lists').doc().set(listObject);
            } else {
                await db.collection('lists').doc(currentId).update(listObject);
                setCurrentId('');
            }
        } catch (error) {
            console.error(error);
        }
        
    };

    const onDeleteList = async (id) => {
        if (window.confirm("are you sure you to delete this list?")){
            await db.collection('lists').doc(id).delete();
        }
    };

    const getList = async () => {
            db.collection("lists").onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
            });
            setList(docs);
      
        });
    };

    useEffect(() => {
       getList();    
    }, []);

    return ( 
        <div className="row">
             <div className="col-sm-1"></div>
             <div className="col-sm-10"></div>
             
            <div className="col-md-8 p-2">
                <Form {...{addOrEditList, currentId, list}} />
            </div>
            
            <table class="table table-striped">
            
                <thead>
                                <tr>
                                    <th>Nome:</th>
                                    <th>Idade</th>
                                    <th>Estado Civil</th>
                                    <th>CPF:</th>
                                    <th>Estado</th>
                                    <th>Cidade</th>
                                    <th  colSpan="2">Acões:</th>
                                 
                                </tr>
                                </thead>

                    <tbody>
                    
                {list.map(list => (
                                <tr key={list.id}>
                                    <td>{list.name}</td>
                                    <td>{list.idade}</td>
                                    <td>{list.estadocivil}</td>
                                    <td>{list.cpf}</td>
                                    <td>{list.estado}</td>
                                    <td>{list.cidade}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => setCurrentId(list.id)}
                                        >
                                            Editar
                                        </button>
                                    </td>

                                    <td>
                                        <button 
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => onDeleteList(list.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                        
                                    
                                </tr>
                              
                              ))}
                                </tbody>
                            </table>
                           </div>
                      
                   
                
            
        
    );    
    
}


export default List;