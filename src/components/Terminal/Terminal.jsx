import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import Styles from './Terminal.styles'
import BookmarkService from './bookmark.service'

const Terminal = ({ theme }) => {
  let error
  const storage = localStorage.getItem('startpage-bookmarks')
  const [value, setValue] = useState()
  const [selection, setSelection] = useState([0, 0, 0])
  const [searchVal, setSearchVal] = useState()
  const [curLevel, setCurLevel] = useState(0)
  const {
    TerminalWrapper,
    Pane,
    Link,
    InfoLine,
    Input,
    Console,
    Time,
    Position,
  } = Styles(theme)

  useEffect(() => {
    if (storage) {
      setValue(JSON.parse(storage))
      getFirebaseData()
    } else {
      getFirebaseData()
    }
  }, [storage])

  const getFirebaseData = () => {
    firebase
      .ref('bookmarks')
      .once('value')
      .then(snapshot => {
        setValue(snapshot.val())
        localStorage.setItem(
          'startpage-bookmarks',
          JSON.stringify(snapshot.val())
        )
      })
  }

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
        if (searchVal.startsWith('new b ')) {
          const inputs = searchVal.replace('new b ', '').split(' ');
          console.log(`new bookmark => ${inputs}`)
          console.log(selection, curLevel);
          // BookmarkService('new b', inputs, parent)
        } else if (searchVal.startsWith('new f')) {
          const inputs = searchVal.replace('new f ', '');
          console.log(`new folder => ${inputs}`)
          BookmarkService('new f', inputs)
        } else {
          window.location.href = `https://google.com/search?q=${searchVal}`
        }
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
          const archived = item.archived;
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
    <>
      <TerminalWrapper>
        {error && <code>{error}</code>}
        {value && (
          <>
            <Column data={value} />
            <Column data={value[selection[0]].children} level="1" />
            <Column
              data={value[selection[0]].children[selection[1]].children}
              level="2"
            />
          </>
        )}
        <InfoLine>
          <Console>
            <strong>~ </strong>
            <Input
              value={searchVal}
              autoFocus
              onKeyDown={e => typing(e)}
              onChange={e => setSearchVal(e.target.value)}
            />
          </Console>
          <Position>
            [{selection[0]}.{selection[1]}.{selection[2]}]
          </Position>
          <Time>{new Date().toLocaleString('en-AU')}</Time>
        </InfoLine>
      </TerminalWrapper>
    </>
  )
}

export default Terminal
