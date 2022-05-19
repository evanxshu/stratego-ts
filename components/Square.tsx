import Piece from "../helper-functions/Piece";
import { Center, GridItem } from "@chakra-ui/react";
import { BiBomb, BiWater, BiFlag } from "react-icons/bi";
interface SquareProps {
  piece: Piece;
  isPieceDisplayed: boolean;
  handleClick?: () => void;
}

const Square: React.FC<SquareProps> = ({
  piece,
  isPieceDisplayed,
  handleClick,
}) => {
  const { rank, color, highlighted } = piece;

  let newColor: Piece["color"] = color;
  if (highlighted == true) {
    newColor = "yellow";
  }

  let renderedColor;
  switch (newColor) {
    case "red":
      renderedColor = "#E53E3E";
      break;
    case "blue":
      renderedColor = "#3182CE";
      break;
    case "transparent":
      renderedColor = "transparent";
      break;
    case "yellow":
      renderedColor = "#FEFCBF";
  }

  if (isPieceDisplayed && rank === 99) {
    return (
      <Center
        border="1px"
        borderColor="gray.300"
        w="50px"
        bg={renderedColor}
        color="white"
      >
        <BiBomb size="25px" />
      </Center>
    );
  }

  if (isPieceDisplayed && rank == -1) {
    return (
      <Center
        border="1px"
        borderColor="gray.300"
        w="50px"
        bg="#C4F1F9"
        color="white"
      >
        <BiWater size="25px" />
      </Center>
    );
  }

  if (isPieceDisplayed && rank == 0) {
    return (
      <Center
        border="1px"
        borderColor="gray.300"
        w="50px"
        bg={renderedColor}
        color="white"
      >
        <BiFlag size="25px" />
      </Center>
    );
  }
  return (
    <Center
      _hover={{ opacity: 0.5 }}
      onClick={handleClick}
      bg={renderedColor}
      color="white"
      border="1px"
      borderColor="gray.300"
    >
      <GridItem fontSize="lg" fontWeight="bold">
        {isPieceDisplayed ? rank : ""}
      </GridItem>
    </Center>
  );
};

export default Square;
