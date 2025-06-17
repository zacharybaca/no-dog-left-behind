import { useContext } from "react";
import { DogSearchContext } from "../contexts/DogSearch/DogSearchContext";

export const useDogSearch = () => useContext(DogSearchContext);
