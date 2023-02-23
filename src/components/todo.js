import React from 'react';
const getLocalData=()=>{
    const list=localStorage.getItem("mylist");
    if(list){
    return JSON.parse(list);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputItem,setInputItem]=React.useState("")
    const[items,setItems]=React.useState(getLocalData());
    const [editItem,setEditItem]=React.useState("");
    const [toggleButton,setToggleButton]=React.useState(false);
    const object={
        id:new Date().getTime().toString(),
        name:inputItem,
    };

const editFun=(id)=>{
    const editItem=items.find((curr)=>{
        return curr.id===id;


    })
   setInputItem(editItem.name)
   setEditItem(id)
   setToggleButton(true);
    

    

}
 const deleteItem=(element)=>{
    const updateItem=items.filter((data)=>{
            return data.id!==element
        })
        setItems(updateItem)

        

    }
    
    const removeAll=()=>{
        setItems([])
    }

    const addItem=()=>{
        if(inputItem!=='' && toggleButton!==true){
            
            setItems([...items,object]);
            setInputItem("")
        
        }
        else if(toggleButton){
            setItems(
                items.map((e)=>{
                    if(e.id===editItem){
                        return {...e,name:inputItem};

                    }
                    return e;

                })
            )
            setToggleButton(false);
            setInputItem('');

        }
        else{
            alert("Please Write Something.⚠️")

        }
         
    }
    React.useEffect(()=>{
        localStorage.setItem('mylist',JSON.stringify(items))

    },[items]);


  return (
 <section>
    <div className="main">
        <div className="child">
            <figure>
                <img src="3.png" alt="todologo" />
                <figcaption>Add Your List Here 📝</figcaption>
            </figure>
            <div className="secMain">
                <input type ="text" name="" id="input" placeholder='✍🏻 Add Item' value={inputItem} onChange={(event)=>setInputItem(event.target.value)} />
               {
                toggleButton?<i className="fa-solid fa-pen-to-square" id="plus" onClick={addItem}></i>:<i className="fa-solid fa-plus" id="plus" onClick={addItem}></i>

               }
                
            
            </div>
            <div className="show">
    
               {
            items.map((data,index)=>{
                return(
<>

<div className='item' key={index}>
    <h1 className='itemData' >{data.name}</h1>
    <div className="icon">
    <i className="fa-solid fa-pen-to-square" id="edit" onClick={()=>editFun(data.id)}></i>
    <i class="fa-solid fa-trash" id="trash" onClick={()=>deleteItem(data.id)}></i>
    </div>
</div>

</>

                )
            })
               } 


       
          


    
</div>
            <button id='btn' onMouseEnter={()=>document.getElementById('btn').innerHTML='Remove All'} onMouseLeave={()=>document.getElementById('btn').innerHTML='Check List'} onClick={removeAll}>Check List</button>
        </div>


    </div>

 </section>
  )
}

export default Todo;
