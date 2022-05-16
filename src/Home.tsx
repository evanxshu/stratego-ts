import React from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../backend/config";
import { set, ref, push } from "firebase/database";
import createDummyGame from "../helper-functions/createDummyGame";

interface HomeProps {
  userId: string | undefined;
}

const Home: React.FC<HomeProps> = ({ userId }) => {
  const navigate = useNavigate();
  const allGamesRef = ref(database, "games");
  const newGameRef = push(allGamesRef);
  const dummyGame = createDummyGame();
  const createGame = () => {
    set(newGameRef, {
      hostId: userId,
      opponent: null,
      whoseTurn: "red",
      gameState: dummyGame,
      activeSquare: {
        rank: null,
        position: -1,
        color: "transparent",
        highlighted: false,
      },
    });
  };

  return (
    <>
      <button
        onClick={() => {
          createGame();
          navigate(`/games/${newGameRef.key}`);
        }}
      >
        {" "}
        Create Game{" "}
      </button>
    </>
  );
};

export default Home;
