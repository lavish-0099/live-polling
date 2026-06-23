import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCopy, FiZap } from "react-icons/fi";

import api from "../services/api";
import { socket } from "../services/socket";
import toast from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PollPage() {

  const { id } = useParams();

  const [poll,setPoll] = useState(null);


  useEffect(()=>{

    loadPoll();


    socket.emit(
      "joinPoll",
      id
    );


    socket.on(
      "pollUpdated",
      (data)=>{
        setPoll(data);
      }
    );
    const chartData =
  poll.options.map(option => ({
    name: option.text,
    value: option.votes,
  }));


    return ()=>{

      socket.off(
        "pollUpdated"
      );

    };


  },[]);



  const loadPoll = async()=>{

    const res =
      await api.get(
        `/polls/${id}`
      );


    setPoll(
      res.data
    );

  };



  const vote = async(index)=>{


    let voterId =
      localStorage.getItem(
        "voterId"
      );


    if(!voterId){

      voterId =
        crypto.randomUUID();


      localStorage.setItem(
        "voterId",
        voterId
      );

    }



    try{


      await api.post(
        `/polls/${id}/vote`,
        {
          optionIndex:index,
          voterId
        }
      );


    }
    catch(err){

   toast.error(
  err.response?.data?.message
);

    }


  };



  if(!poll){

    return(
      <div className="page">
        Loading...
      </div>
    );

  }



  const totalVotes =
    poll.options.reduce(
      (a,b)=>
        a+b.votes,
      0
    );




  return(

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


        <div className="live">

          <FiZap/>

          Live Poll

        </div>


        <h1>
          {poll.question}
        </h1>



        <button

          className="outline-btn"

          onClick={()=>{

            navigator
            .clipboard
            .writeText(
              window.location.href
            );


toast.success("Link copied!");
          }}

        >

          <FiCopy/>

          Copy Link


        </button>



        {


        poll.options.map(
          (option,index)=>{


            const percentage =
            totalVotes===0
            ?
            0
            :
            (
            option.votes/
            totalVotes*
            100
            )
            .toFixed(1);



            return(


              <div
                className="result-card"
                key={index}
              >


                <div className="result-top">


                  <button

                    className="vote-btn"

                    onClick={()=>
                      vote(index)
                    }

                  >

                    Vote

                  </button>



                  <h3>
                    {option.text}
                  </h3>


                  <span>

                    {percentage}%

                  </span>



                </div>




                <div className="bar">


  <motion.div
  className="bar-fill"
  initial={{
    width: 0
  }}
  animate={{
    width: `${percentage}%`
  }}
  transition={{
    duration: 0.6
  }}
/>


                </div>



                <p>

                  {
                    option.votes
                  }

                  {" "}
                  votes

                </p>




              </div>


            );

          }
        )

        }



        <h2>

          Total Votes:
          {" "}
          {totalVotes}

        </h2>

<div
  style={{
    width: "100%",
    height: 300,
    marginTop: 20,
  }}
>
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        {chartData.map(
          (_, index) => (
            <Cell
              key={index}
            />
          )
        )}
      </Pie>

      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>

      </motion.div>



    </div>


  );


}



export default PollPage;