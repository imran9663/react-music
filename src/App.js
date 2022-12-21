import React from 'react'
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

const App = () => {
  return (
    <>

      <Routes>
        <Route exact path='/song' element={<Song />} />
        <Route path='/' element={<Main />}>
          {/* <Route path={'/'} element={<Home />} /> */}
          <Route path={RouteStrings.home} element={<Home />} />
          <Route path={RouteStrings.playlist + ':id'} element={<PlayList />} />
          <Route path={RouteStrings.search} element={<Search />} />
          <Route path={RouteStrings.account} element={<Account />} />
        </Route>
      </Routes>


    </>
  )
}




export default App