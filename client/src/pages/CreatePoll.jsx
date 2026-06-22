import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiZap, FiTrash } from "react-icons/fi";

import api from "../services/api";

function CreatePoll() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(
        options.filter((_, i) => i !== index)
      );
    }
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };


  const createPoll = async (e) => {
    e.preventDefault();

    const res = await api.post(
      "/polls",
      {
        question,
        options,
      }
    );

    navigate(
      `/poll/${res.data._id}`
    );
  };


  return (
    <div className="page">

      <div className="poll-card">

        <h1>
          Create a 
          <span> Poll</span>
        </h1>

        <p className="subtitle">
          Ask anything. Get realtime answers.
        </p>


        <form onSubmit={createPoll}>


          <label>Question</label>

          <input
            className="input"
            placeholder="What do you want to ask?"
            value={question}
            onChange={(e)=>
              setQuestion(e.target.value)
            }
          />


          <label>Options</label>


          {options.map((option,index)=>(

            <div 
              className="option-row"
              key={index}
            >

              <input

                className="input"

                placeholder={
                  `Option ${index+1}`
                }

                value={option}

                onChange={(e)=>
                  updateOption(
                    index,
                    e.target.value
                  )
                }
              />


              <button
                type="button"
                className="icon-btn"
                onClick={()=>
                  removeOption(index)
                }
              >

                <FiTrash/>

              </button>


            </div>

          ))}



          <button
            type="button"
            className="outline-btn"
            onClick={addOption}
          >

            <FiPlus/>
            Add Option

          </button>


          <button
            className="primary-btn"
          >

            <FiZap/>
            Create Poll

          </button>


        </form>


      </div>

    </div>
  );
}


export default CreatePoll;