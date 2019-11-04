import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const TerminalWrapper = styled.div`
  background-color: #282a36;
  padding: 2.3rem 2rem 1.3rem;
  color: #f4f4f4;
  border-radius: 3px;
  box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;

  ${breakpoint('tablet')`
    width: 55vw;
    height: auto;
    min-height: 50vh;
  `}
`
const Pane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${theme => theme.Cyan};
`
const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  width: 100%;
`
const Input = styled.input`
  background-color: transparent;
  color: ${p => p.theme.Green};
  font-family: Hack, monospace;
  font-size: 0.9rem;
  font-weight: normal;
  width: 80%;
  border: none;
  outline: none;
`

const Link = styled.a`
  text-decoration: none;
  color: ${p =>
    p.selected
      ? p.theme.Background
      : p.folder
      ? p.theme.Pink
      : p.theme.Foreground};
  background-color: ${p => (p.selected ? p.theme.Purple : 'transparent')};
  padding: 0.2rem 1rem;
  margin: 0.1rem 0;
  cursor: pointer;
`

const Console = styled.div`
  flex: 1;
  color: ${p => p.theme.Green};
`
const Time = styled.div`
  background-color: ${p => p.theme.Comment};
  color: ${p => p.theme.Background};
  font-size: 0.8rem;
  position: relative;
  padding: 0 0.3rem;
  line-height: 1.2rem;
  &:before {
    content: '';
    border-style: solid;
    border-width: 9px 11px 9px 0;
    border-color: transparent ${p => p.theme.Comment} transparent transparent;
    position: absolute;
    left: -11px;
  }
`

const Styles = theme => {
  return {
    TerminalWrapper: TerminalWrapper,
    Pane: Pane,
    InfoLine: InfoLine,
    Input: Input,
    Time: Time,
    Console: Console,
    Link: Link,
  }
}

export default Styles
