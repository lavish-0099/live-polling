import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiZap, FiTrash } from "react-icons/fi";

import api from "../services/api";
import { motion } from "framer-motion";
function CreatePoll() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [topic, setTopic] = useState("");

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

  const generateSuggestions = async () => {
    try {
      const res = await api.post(
        "/ai/generate-options",
        {
          topic,
        }
      );

      setOptions(res.data.options);
    } catch (error) {
      console.log(error);
    }
  };

  const createPoll = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <motion.div
  className="poll-card"
  initial={{
    opacity: 0,
    y: 30,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.5,
  }}
>

        <h1>
          Create a <span>Poll</span>
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
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <div className="ai-card">

            <h3>
              ⚡ Smart Suggestions
            </h3>

            <p>
              Enter a topic and generate poll options
            </p>

            <input
              className="input"
              placeholder="Best Programming Languages"
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
            />

            <button
              type="button"
              className="outline-btn"
              onClick={generateSuggestions}
            >
              Generate Suggestions
            </button>

          </div>

          <label>Options</label>

          {options.map((option, index) => (

            <div
              className="option-row"
              key={index}
            >

              <input
                className="input"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) =>
                  updateOption(
                    index,
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="icon-btn"
                onClick={() =>
                  removeOption(index)
                }
              >
                <FiTrash />
              </button>

            </div>

          ))}

          <button
            type="button"
            className="outline-btn"
            onClick={addOption}
          >
            <FiPlus />
            Add Option
          </button>

          <button
            className="primary-btn"
            type="submit"
          >
            <FiZap />
            Create Poll
          </button>

        </form>

      </motion.div>
    </div>
  );
}

export default CreatePoll;