import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import NotoSansKRBoldOTF from "../assets/NotoSansKR-Black.otf";
import NotoSansKRBoldWOFF from "../assets/NotoSansKR-Bold.woff";
import NotoSansKRBoldWOFF2 from "../assets/NotoSansKR-Bold.woff2";
import NotoSansKRLightOTF from "../assets/NotoSansKR-Light.otf";
import NotoSansKRLightWOFF from "../assets/NotoSansKR-Light.woff";
import NotoSansKRLightWOFF2 from "../assets/NotoSansKR-Light.woff2";
import NotoSansKRRegularOTF from "../assets/NotoSansKR-Regular.otf";
import NotoSansKRRegularWOFF from "../assets/NotoSansKR-Regular.woff";
import NotoSansKRRegularWOFF2 from "../assets/NotoSansKR-Regular.woff2";

const GlobalStyle = createGlobalStyle`
${reset}
  html,
  body{
    background: #FFF;
     ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
}
span, p {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
  a {
        text-decoration: none;
        color: inherit;
    }
  * {
      box-sizing: border-box;
  }
  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  @font-face {
    font-family: 'NotoSansKRBold';
    src: url(${NotoSansKRBoldWOFF2}) format('woff2'),
    url(${NotoSansKRBoldWOFF}) format('woff'),
    url(${NotoSansKRBoldOTF}) format('otf'),
  }
  @font-face {
    font-family: 'NotoSansKRLight';
    src: url(${NotoSansKRLightWOFF2}) format('woff2'),
    url(${NotoSansKRLightWOFF}) format('woff'),
    url(${NotoSansKRLightOTF}) format('otf'),
  }
  @font-face {
    font-family: 'NotoSansKRRegular';
    src: url(${NotoSansKRRegularWOFF2}) format('woff2'),
    url(${NotoSansKRRegularWOFF}) format('woff'),
    url(${NotoSansKRRegularOTF}) format('otf'),
  }

  * {
    box-sizing: border-box;
    font-family: 'NotoSansKRRegular';
  }

  a, a:hover {
    text-decoration: none;
  }
`;

export default GlobalStyle;
