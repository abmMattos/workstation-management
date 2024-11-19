import { createGlobalStyle } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${theme.COLORS.BACKGROUND};
    color: white;

   font-family: "Overpass Mono", sans-serif;
  }

  span {
    color: ${theme.COLORS.GREEN};
  }

  a {
    text-decoration: none;
  }

  button, a, input {
    cursor: pointer;
    transition: filter 0.2s;
    font-family: "Overpass Mono", sans-serif;
  }
`