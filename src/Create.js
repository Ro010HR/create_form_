import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending]= useState(false); 
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), firstName: '', lastName: '' },
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
        setInputFields([...inputFields, { id: uuidv4(),  firstName: '', lastName: '' }])
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
            <textarea
              name="firstName"
              label="First Name"
              variant="filled"
              value={inputField.firstName}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <textarea
              name="lastName"
              label="Last Name"
              variant="filled"
              value={inputField.lastName}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <button disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
             Delete question
            </button>
            <button
              onClick={handleAddFields}
            >
              Add question
            </button>
          </div>
        )) }
        <button
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}
        >Send</button>

            <label>Title:</label>
            <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <label>Body:</label>
            <textarea required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            >

            </textarea>
            <label>Author:</label>
            <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            >
                <option value="Mario">Mario</option>
                <option value="Yoshi">Yoshi</option>
            </select>
            {!isPending && <button>Add Survey</button>}
            {isPending && <button disabled>Adding Survey...</button>}
        </form>
        <button onSubmit={handleAddFields}>Add Question</button>
    </div>     
    );
}
 
export default Create;