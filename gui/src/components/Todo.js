import React from 'react';
import { useState , useEffect, useFetch} from 'react';
import './Todo.css';
import axios from 'axios';

export default function Demo(){
    const [work, setWork]=useState('');
    const [todos, setTodos]=useState([]);
    const [num, setNum]=useState(1);
    const [show,setShow]=useState(true);
    const url='https://killsanghyuck.github.io/prography_5th_front/todoDummy.json';
    
    useEffect(()=>{
      axios.get(url)
      .then(res => {
          setTodos(todos.concat(res.data.body)); 
          setNum(res.data.body.length+1);
        }
      )
      .catch(err => console.log(err))

    },[url])

    function newThing(e){
      e.preventDefault();
      setWork(e.target.value);
      console.log('newThing');
    }
    function pushThing(e){
      e.preventDefault();
      if(work==="") return;
      setTodos([...todos,{title:work, id:num, status:'todo'}]);
      //setTodos(todos.concat({title:work, id:num, status:'todo'}));
      setNum(num+1);
      console.log('pushThing');
    }
    function deleteThing(idd){
      setTodos(todos.filter((b) => b.id !== idd));
      console.log('deleteThing');
    }
    function reverse(){
      setShow(!show);
      console.log('reverse');
    }
    function line(idd){
      setTodos(todos.map((c)=>(
        c.id===idd ? ({id:c.id,title:c.title, status:'complete'} ): c
      )
      )
      );
    }
    const list= todos.map( (a) => 
    (
      <div>
      
        {a.status==='todo'? <a className='todolist' href='#' onClick={()=>line(a.id)}> {a.title} </a>:
         <del>{a.title}</del>}
      
        <a className='aa' href='#' onClick={() => deleteThing(a.id)}>X</a>
      </div>
    )
    );
    
    
  return (
    <div className='full'>
      <h1>Todos</h1>
    
      {show ? <button onClick={()=>reverse()}>hide</button> : <button onClick={()=>reverse()}>show</button>}

      <form onSubmit={pushThing}> 
        <input className='ii' placeholder='enter your todo' onChange={newThing}></input> 
        <button className='btn red'>Submit</button>
      </form>
      {show && <div className='dd'>{list}</div> }
      
    </div>
  );
}

