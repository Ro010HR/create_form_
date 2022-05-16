import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');

    const [closedQ, setClosedQ] = useState(false);

    const [isPending, setIsPending]= useState(false); 
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), question: '', answer: '' },
      ]);
    const navigate = useNavigate ();

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
          if(id === i.id) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setInputFields(newInputFields);
      }

    const handleSubmit = (e) => {
        //Prevent refresh onSubmit
        e.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(blog)
            }).then(() => {
                console.log('New blog added');
                setIsPending(false);
                navigate("/");
            })
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(),  question: '', answer: '' }])
      }

    const handleChangeFields = ()=> {
 
        setClosedQ(false);
    }
    
      const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
      }

    return ( 
    <div className="create">
        <h2>Add a new Survey</h2>
        <form onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <label>Question</label>
            <input
              name="question"
              label="Question"
              variant="filled"
              value={inputField.question}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <label>Answer</label>
            { <input name="answer"blabel="Answer" variant="filled" value={inputField.answer}       
              onChange={event => handleChangeInput(inputField.id, event)}
            /> }
           
            <button disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
             Delete question
            </button>
            <button
              onClick={handleAddFields}
            >
              Add Open Question
            </button>
            <button
              onClick={handleChangeFields}
            >
              Add Star Question
            </button>
          </div>
        )) }
        <button
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}
        >Send</button>

            
        </form>
        
    </div>     
    );
}
 
export default Create;