import React, { useState } from "react";
import "./Game.css";
import Piece from "../helper-functions/Piece";
import Square from "../components/Square";
import createDummyGame from "../helper-functions/createDummyGame";
import getAvailableMoves from "../helper-functions/getAvailableMoves";
import captureSquare from "../helper-functions/captureSquare";

let dummyGame = createDummyGame();

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<Piece[]>(dummyGame);
  const [whoseTurn, setWhoseTurn] = useState<Piece["color"]>("red");
  const [activeSquare, setActiveSquare] = useState<Piece>({
    rank: null,
    position: -1,
    color: undefined,
    highlighted: false,
  });

  const clickPiece = (piece: Piece) => {
    const { rank, position, color, highlighted } = piece;
    let newGameState = [...gameState];
    setActiveSquare(newGameState[position]);

    if (highlighted === true) {
      newGameState = captureSquare(
        activeSquare["position"],
        position,
        gameState
      );
      for (let i = 0; i < newGameState.length; i++) {
        newGameState[i].highlighted = false;
      }
      setWhoseTurn(whoseTurn == "red" ? "blue" : "red");
    } else {
      for (let i = 0; i < newGameState.length; i++) {
        newGameState[i].highlighted = false;
      }

      if (color !== whoseTurn) {
        return;
      }

      const availableMoves = getAvailableMoves(
        rank,
        position,
        color,
        gameState
      );
      for (const i of availableMoves) {
        newGameState[i].highlighted = true;
      }
    }

    setGameState(newGameState);
  };

  return (
    <>
      <div className="Game">
        {gameState.map((piece: Piece) => {
          return (
            <Square
              key={piece.position}
              piece={piece}
              handleClick={() => clickPiece(piece)}
            />
          );
        })}
      </div>
      <button id="createGameButton">Create Game</button>
    </>
  );
};

export default Game;