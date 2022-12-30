import React from 'react'
import { Route, Routes } from 'react-router'
import './App.scss'
import Account from './pages/Account'
import Album from './pages/Album'
import Home from './pages/Home'
import Main from './pages/Main'
import NoNetwork from './pages/NoNetwork'
import PlayList from './pages/Playlist'
import Search from './pages/Search'
import Song from './pages/Song'
import RouteStrings from './utils/RouteStrings'
import Artist from './pages/Artist'
import ArtistDetails from './pages/Artist/ArtistDetails'
import ArtistSongs from './pages/Artist/ArtistSongs'
import ArtistAlbums from './pages/Artist/ArtistAlbums'

const App = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Main />}>
          <Route path={RouteStrings.home} element={<Home />} />
          <Route path={RouteStrings.playlist + ':id'} element={<PlayList />} />
          <Route path={RouteStrings.albums + ':id'} element={<Album />} />
          <Route path={RouteStrings.search} element={<Search />} />
          <Route path={RouteStrings.account} element={<Account />} />
          <Route path={RouteStrings.song + ':id'} element={<Song />} />
          <Route path={RouteStrings.artist} element={<Artist />} >
            <Route path={RouteStrings.artistDetails} element={<ArtistDetails />} />
            <Route path={RouteStrings.artistSongs} element={<ArtistSongs />} />
            <Route path={RouteStrings.artistAlbums} element={<ArtistAlbums />} />
          </Route>
        </Route>
        <Route path={RouteStrings.noNetwork} element={<NoNetwork />} />
      </Routes>


    </>
  )
}




export default App