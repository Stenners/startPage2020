import styled, { createGlobalStyle } from 'styled-components'

export const Wrapper = styled.div`
  background: rgb(189, 195, 199);
  background: radial-gradient(
    circle,
    rgba(189, 195, 199, 1) 0%,
    rgba(44, 62, 80, 1) 100%
  );
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Global = createGlobalStyle`
  body {
    font-family: Hack, monospace;
    font-size: 0.9rem;
    margin: 0;
  }
`
