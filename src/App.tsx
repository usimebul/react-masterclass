import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import ContextPath from "./context";
import { lightTheme, darkTheme } from "./theme";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;


const ToggleBtnWrapper = styled.div<{ toggled: boolean }>`
  position: fixed;
  top: 2vh;
  right: 0vh;
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  h6 {
    color: ${(props) => props.toggled ? "#EFF2F5" : "#404346"};
    text-transform: uppercase;
    padding: 8px 12px;
    min-width: 32px;
    text-align: center;
    color: ${(props) => props.toggled ? "#b9bdc1" : "#5b5e62"};
	  transition: color 200ms ease-in-out;    
  }

  .label-dark {
    letter-spacing: -0.15px;
    pointer-events: ${(props) => props.toggled ? "none" : "inherit"};
    &:hover {
      color: #404346;
    }
    &:active {      
      color: #010101;
    }
  }

  .label-light{
    letter-spacing: -0.031px;
    &:hover {
      color: ${(props) => props.toggled ? "#fcfefe" : "inherit"};
    }
    &:active {      
      color: ${(props) => props.toggled ? "#cdd1d5" : "inherit"};
    }
  }

  .toggle-switch{
    margin: 0;
    padding: 0;
    width: 48px;
    height: 28px;
    border: none;
    outline: none;
    overflow: hidden;
    position: relative;
    border-radius: 14px;
    display: inline-block;
    transition:all 200ms ease-in-out;
	  background: ${(props) => props.toggled ? "#dce0e3" : "#404346"};

    &::before, &::after {
      transition:all 200ms ease-in-out;
    }

    &::before {
      top: 4px;
      left: ${(props) => props.toggled ? "4px" : "24px"};
      content: "";
      width: 20px;
      height: 20px;
      display: block;
      position: absolute;
      border-radius: 12px;
      background:  ${(props) => props.toggled ? "#2d2f31" : "#dce0e3"};
    }
    
    &::after{
      content: "";
      top: ${(props) => props.toggled ? "-2px" : "14px"};
      right: ${(props) => props.toggled ? "2px" : "2px"};
      width: ${(props) => props.toggled ? "32px" : "1px"};
      height: ${(props) => props.toggled ? "32px" : "1px"};
      display: block;
      position: absolute;
      border-radius: ${(props) => props.toggled ? "16px" : "0.5px"};
      background: ${(props) => props.toggled ? "#dce0e3" : "#404346"};
    }
    &:hover, &:hover::after{
      background: ${(props) => props.toggled ? "#fcfefe" : "#2d2f31"};
    }
    &:focus, &:active, &:active::after{
      background: ${(props) => props.toggled ? "#cdd1d5" : "#141516"};
    }
  }
`

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const [toggled, setToggled] = useState(true);
  const onClick = () => {
    setTheme(toggled ? lightTheme : darkTheme);
    setToggled(prev => !prev);
  };

  return (
    <ContextPath.Provider value="react-masterclass">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
        <ToggleBtnWrapper toggled={toggled} >
          <h6 className="label-dark">Dark</h6>
          <button onClick={onClick} className="toggle-switch" title="Go light"></button>
          <h6 className="label-Light">Light</h6>
        </ToggleBtnWrapper>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </ContextPath.Provider>
  );
}

export default App;
