import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import { socket } from "../services/socket";

function PollPage() {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);

  useEffect(() => {
    fetchPoll();

    socket.emit("joinPoll", id);

    socket.on("pollUpdated", (updatedPoll) => {
      setPoll(updatedPoll);
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, []);

  const fetchPoll = async () => {
    try {
      const response = await api.get(`/polls/${id}`);

      setPoll(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const vote = async (optionIndex) => {
    let voterId =
      localStorage.getItem("voterId");

    if (!voterId) {
      voterId = crypto.randomUUID();

      localStorage.setItem(
        "voterId",
        voterId
      );
    }

    try {
      await api.post(
        `/polls/${id}/vote`,
        {
          optionIndex,
          voterId,
        }
      );
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Vote failed"
      );
    }
  };

  if (!poll) {
    return <h2>Loading...</h2>;
  }

  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <h1>{poll.question}</h1>

      <button
        onClick={() => {
          navigator.clipboard.writeText(
            window.location.href
          );

          alert("Link copied");
        }}
      >
        Copy Poll Link
      </button>

      <br />
      <br />

      {poll.options.map(
        (option, index) => {
          const percentage =
            totalVotes === 0
              ? 0
              : (
                  (option.votes /
                    totalVotes) *
                  100
                ).toFixed(1);

          return (
            <div
              key={index}
              style={{
                marginBottom: "20px",
              }}
            >
              <button
                onClick={() =>
                  vote(index)
                }
              >
                Vote
              </button>

              <strong>
                {" "}
                {option.text}
              </strong>

              <p>
                {option.votes} votes (
                {percentage}%)
              </p>

              <div
                style={{
                  width: "100%",
                  height: "20px",
                  background:
                    "#ddd",
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background:
                      "green",
                  }}
                />
              </div>
            </div>
          );
        }
      )}

      <h3>
        Total Votes: {totalVotes}
      </h3>
    </div>
  );
}

export default PollPage;