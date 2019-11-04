import React, { useState } from 'react'
import firebase from '../../firebase'
import { useObject } from 'react-firebase-hooks/database'
import Styles from './Terminal.styles'
// import data from '../../data.json'

const Terminal = ({ theme }) => {
  const [value, error] = useObject(firebase.ref('bookmarks'))
  const [selection, setSelection] = useState([0, 0, 0])
  const [searchVal, setSearchVal] = useState()
  const [curLevel, setCurLevel] = useState(0)
  // const [bookmarks, setBookmarks] = useState()

  const {
    TerminalWrapper,
    Pane,
    Link,
    InfoLine,
    Input,
    Console,
    Time,
  } = Styles(theme)

  const selectEl = (el, url, level) => {
    let newArr = [...selection]
    if (level === 0) {
      newArr = [el, 0, 0]
    } else {
      newArr[level] = parseInt(el)
    }
    if (url) {
      window.location.href = url
    }
    setSelection(newArr)
  }

  const typing = e => {
    let el
    switch (e.key) {
      case 'Enter':
        window.location.href = `https://google.com/search?q=${searchVal}`
        break
      case 'ArrowDown':
        el = selection[curLevel] + 1
        selectEl(el, '', curLevel)
        break
      case 'ArrowUp':
        el =
          selection[curLevel] === 0
            ? selection[curLevel]
            : selection[curLevel] - 1
        selectEl(el, '', curLevel)
        break
      case 'ArrowRight':
        setCurLevel(curLevel === 2 ? curLevel : curLevel + 1)
        break
      case 'ArrowLeft':
        setCurLevel(curLevel === 0 ? curLevel : curLevel - 1)
        break

      default:
        break
    }
    // setBookmarks(originalData.filter(x => regexp.test(x.title)))
    // console.log(originalData.filter(x => x.title.includes(searchVal)));
    // originalData.map((element) => {
    //   return {...element, subElements: element.subElements.filter((subElement) => subElement.surname === 1)}
    // })
  }

  const Column = ({ data, level = 0 }) => {
    if (!data) {
      return []
    }
    return (
      <Pane>
        {data.map((item, i) => {
          const title = item.title
          const url = item.url ? item.url : false
          return (
            <Link
              key={title}
              selected={selection[level] === parseInt(i)}
              onClick={() => selectEl(i, url, level)}
              folder={!url}
            >
              {/* {!url && level !== 0 ? '+ ' : ''} */}
              {title}
            </Link>
          )
        })}
      </Pane>
    )
  }

  return (
    <TerminalWrapper>
      {value && (
        <>
          <Column data={value.val()} />
          <Column data={value.val()[selection[0]].children} level="1" />
          <Column
            data={value.val()[selection[0]].children[selection[1]].children}
            level="2"
          />
        </>
      )}
      <InfoLine>
        <Console>
          >{' '}
          <Input
            value={searchVal}
            autoFocus
            onKeyDown={e => typing(e)}
            onChange={e => setSearchVal(e.target.value)}
          />
        </Console>
        <Time>{new Date().toLocaleString()}</Time>
      </InfoLine>
    </TerminalWrapper>
  )
}

export default Terminal
