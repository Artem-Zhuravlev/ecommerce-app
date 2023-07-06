import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Jumbotron = ({text}) => {
  return (<Typewriter
    words={text}
    loop={true}
    cursor
    cursorStyle='_'
  />)
}
export default Jumbotron
