import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCopy, FiZap } from "react-icons/fi";

import api from "../services/api";
import { socket } from "../services/socket";


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

      alert(
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


      <div className="poll-card">


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


            alert(
              "Copied!"
            );

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


                  <div

                    className="bar-fill"

                    style={{

                      width:
                      `${percentage}%`

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



      </div>



    </div>


  );


}



export default PollPage;