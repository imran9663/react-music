import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.scss'
import BottomBar from './components/BottomBar'
import Home from './pages/Home'
import Main from './pages/Main'
import PlayList from './pages/Playlist'
import Song from './pages/Song'
import RouteStrings from './utils/RouteStrings'
import Search from './pages/Search'
import Account from './pages/Account'
import Album from './pages/Album'
import Landing from './components/Landing'

const App = () => {
  const [showLanding, setshowLanding] = useState(true)
  useEffect(() => {
    routeTomain()
  }, [])
  const routeTomain = () => {
    setTimeout(() => {
      setshowLanding(false)
    }, 1000);
  }
  return (
    <>
      {showLanding ? <Landing /> :
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path={RouteStrings.home} element={<Home />} />
            <Route path={RouteStrings.playlist + ':id'} element={<PlayList />} />
            <Route path={RouteStrings.albums + ':id'} element={<Album />} />
            <Route path={RouteStrings.search} element={<Search />} />
            <Route path={RouteStrings.account} element={<Account />} />
            <Route path={RouteStrings.song + ':id'} element={<Song />} />
          </Route>
        </Routes>}


    </>
  )
}




export default App