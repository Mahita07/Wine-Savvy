import axios from 'axios';
import React, { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const CreateWineReview = () =>{
    const[wine,setWine] = useState({
        name:"",
        type:"",
        region:"",
        grapeVarieties:[],
        tastingNotes:"",
        imageUrl:"",
        contributor:window.localStorage.getItem("userID")
    }); 
    const capitaliseText = (str) =>{
      str = str.charAt(0).toUpperCase()+str.slice(1);
      return str;
    }
    const [grapeType,setNewGrapeType] = useState();
    const ref = useRef(null);
    const handleChange = (event) =>{
        const {name,value} = event.target;
        const capitalizedValue = capitaliseText(value);
        setWine((prevWine) => ({ ...prevWine, [name]: capitalizedValue }));
    }
    
    const addGrapeVariety = (event) =>{
        if(grapeType)
        {
          if(grapeType.trim() !==''){
            var capgrapeType=capitaliseText(grapeType);
            setWine({...wine,grapeVarieties:[...wine.grapeVarieties,capgrapeType]});
            console.log(wine.grapeVarieties);
            setNewGrapeType('');
            ref.current.value = "";
          }
        }
        else{
          alert('Enter atleast one grape variety.')
          return;
        }

        
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        if( wine.grapeVarieties.length === 0 ){
          alert("Please add atleast one grape variety.")
          return;
        }
        if (
          !wine.name ||
          !wine.type ||
          !wine.region ||
          !wine.imageUrl || 
          !wine.tastingNotes
        ) {
          alert("Please fill in all the required fields.");
          return;
        }
        try{
          console.log(wine);
            await axios.post("http://localhost:3001/wines/createwine",wine);
            window.location.reload();
            alert("Wine variety added successfully !");
        }
        catch(err){
            console.error(err);
        }
    }
   
    return(
        <>
        <div className='createWine' style={{padding:"20px", display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            <h2>Create Wine</h2>
        <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3"  style={{display:"flex",flexDirection:"row"}}>
        <div>
        <Form.Label>Name</Form.Label>
        <Form.Control name="name"  id="name" onChange={handleChange} placeholder="Enter name" style={{width:"300px",margin:"5px"}}/>
        </div>
        <div>
        <Form.Label>Type of Wine</Form.Label>
        <Form.Control name="type" type="text" id="type" onChange={handleChange} placeholder="Type" style={{width:"300px",margin:"5px"}}/>
        </div> 
      </Form.Group>
      <Form.Group className="mb-3"  style={{display:"flex",flexDirection:"row"}}>
        <div>
        <Form.Label>Region</Form.Label>
        <Form.Control name="region"  type="text" id="region" onChange={handleChange} placeholder="Region" style={{width:"300px",margin:"5px"}}/>
       </div>
        <div>
        <Form.Label>Image URL</Form.Label>
        <Form.Control name="imageUrl" type="text" id="imageUrl" onChange={handleChange} placeholder="Image URL" style={{width:"300px",margin:"5px"}}/>
        </div> 
      </Form.Group>
      <Form.Group className="mb-3"  style={{display:"flex",flexDirection:"row"}}>
        <div>
        <Form.Label>Tasting Notes</Form.Label>
        <Form.Control name="tastingNotes" type="text" as="textarea" id="tastingNotes" onChange={handleChange} placeholder="Enter Tasting Notes" style={{width:"300px",height:"90px",margin:"5px"}}/>
        </div>
        <div>
        <Form.Label>Grape Varieties</Form.Label>
        <Form.Control  ref={ref} name="grapeVarieties" type="text" id="grapeVarieties" onChange={(event) => {console.log(event.target.value);setNewGrapeType(event.target.value)}} placeholder="Add Grape Variety" style={{width:"300px",margin:"5px"}}/>
        <Button variant="light" name="addGrape" onClick={addGrapeVariety} type="button" style={{margin:"10px"}}>
        Add Grape Variety
        </Button>
        </div> 
      </Form.Group>
      {/*<Form.Group>
         <ul>
        {grapesList?grapesList.map((item, index) => (<li key={index}>{item}</li>)):null}
      </ul>
      </Form.Group>*/}
      <Button variant="light" type="submit">
        Submit
      </Button>
    </Form>
        </div>
        </>

    );
}