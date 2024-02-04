import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../../NotFound/NotFound';
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider';
import axios from 'axios';
import { axiosInstance } from '../../../network/AxiosInstance';
import Loader from '../../../Components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { isLoader } from '../../../store/Action/ProductAction/ProductAction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function TodoList() {
  const [Todos , setTodos] = useState([]); //empty 
  const load = useSelector((state)=> state.count.isloading)  
  const dispatch = useDispatch() ;
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);


  const[title,setTitle] = useState('');
  const[description,setDescription] = useState('');
  const[IsFinished,setIsFinished] = useState(false);

// this for bootstarp model for editing(update) situation
const[editId,setEditId] = useState('');
const[edittitle,setEditTitle] = useState('');

// this for bootstarp model for Adding situation
  const[editdescription,setEditDescription] = useState('');
  const[editIsFinished,setEditIsFinished] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowAdd = () => setAdd(true);
  const handleCloseAdd = () => setAdd(false);


  

  

  useEffect(()=>{
    axiosInstance.get('/Todo')
    .then((res) => {
      setTodos(res.data)
      dispatch(isLoader(false))
      // console.log(res.data)
    })
    .catch((err) => console.log(err))

  },[]); // component did Mount 

  const DropData = () =>{

  }

  const handleEdit = (id) =>{
    // alert(id);
    handleShow();
    axiosInstance.get(`Todo/id:int?id=${id}`)
    .then((res)=>{
      setEditDescription(res.data.description);
      setEditTitle(res.data.title);
      setEditIsFinished(res.data.isFinished);
      setEditId(id);
    })
  }

  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete this Todo")==true){
      axiosInstance.delete(`Todo/${id}`)
      .then((res)=>{
        window.location.reload();
      })
      .catch((err) => console.log(err))
    }
  }
  const handleAdd = () =>{
    handleShowAdd();
  }
  const handleSave = ()=>{
    const todos = {
      "title": title,
      "description": description, 
      "isFinished": IsFinished
    }
    axiosInstance.post('/Todo',todos)
    .then((res)=>{
      window.location.reload();
    })
    .catch((err) => console.log(err))
  }

  const handleUpdate = () =>{
    const url = `/Todo/${editId}`;
    const todos = {
      "todoId":editId,
      "title": edittitle,
      "description": editdescription, 
      "isFinished": editIsFinished
    }
    axiosInstance.put(url,todos)
    .then((res)=> {
      window.location.reload();
    })
    .catch((error)=>{console.log(error)});
  }

  const handleActiveChange = (e) =>{
    if(e.target.checked){
      setIsFinished(true);
    }
    else{
      setIsFinished(false);
    }
  }

  const handleEditActiveChange = (e) =>{
    if(e.target.checked){
      setEditIsFinished(true);
    }
    else{
      setEditIsFinished(false);
    }
  }

  return (
      <section className="gradient-custom" >
        <div className="container py-5" >
          <div className="row d-flex justify-content-center align-items-center" >
            <div className="col col-xl-10" >
              <div className="card" >
                <div className="card-body p-5">
                  <div className="m-auto text-center">
                    <a className="btn btn-outline-secondary" onClick={()=>handleAdd()}>Add Task</a>
                  </div>
                  { load ?  <Loader /> :   
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                      aria-labelledby="ex1-tab-1">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Title</th>
                              <th scope="col">Description</th>
                              <th scope="col">is Done</th>
                              <th scope='col' className='text-center'>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                          {Todos.map((item,index) => (
                            <tr key={item.todoId}>
                            <th scope="row">{index+1}</th>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.isFinished ? 'Yes' : 'No'}</td>
                            <td colSpan={2} className='text-center'>
                              <button className='btn btn-primary' onClick={()=>handleEdit(item.todoId)}>Edit</button> | 
                              <button className='btn btn-danger' onClick={()=>handleDelete(item.todoId)}>Delete</button> 
                            </td>
                          </tr>
                          ))}
                          </tbody>
                        </table>              
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Models */}
        {/* Updating Models */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row className='py-2'>
          <Col>
            <input type='text' className='form-control' placeholder='Enter Name' value={edittitle} onChange={(e)=>setEditTitle(e.target.value)}/>
          </Col>
        </Row>
        <Row className='py-2'>
          <Col>
            <input type='text' className='form-control' placeholder='Enter Description' value={editdescription} onChange={(e)=>setEditDescription(e.target.value)}/>
          </Col>
        </Row>
        <Row className='py-2'>
          <Col>
            <label className='pe-2'>Is Done?</label>
            <input type='checkbox' checked={editIsFinished==true} onChange={(e)=>handleEditActiveChange(e)} value={editIsFinished} />
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        {/* Adding Models */}
      <Modal show={add} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col className='py-2'>
            <input type='text' className='form-control' placeholder='Enter Name' value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </Col>
        </Row>
        <Row className='py-2'>
          <Col>
            <input type='text' className='form-control' placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
          </Col>
        </Row>
        <Row className='py-2'>
          <Col>
            <label for="activity" className='pe-2'>Is Done?</label>
            <input id="activity" type='checkbox' checked={IsFinished==true} onChange={(e)=>handleActiveChange(e)} value={IsFinished} />
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    
  )
}
