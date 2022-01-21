import { eventNames } from "process";
import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle, css } from "styled-components";
import Router from "./Router";
import reset from "styled-reset";
import { ReactQueryDevtools } from "react-query/devtools";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto Condensed', sans-serif;
    background: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a{
    transition: 0.2s;
    text-decoration: none;
    color:inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
