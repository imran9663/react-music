import React, { useEffect } from 'react'
import { Route, Routes, useRouteError } from 'react-router'
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
import SelectLanguage from './pages/SelectLanguage'
import NotFound from './pages/NotFound'

const App = () => {
  useEffect(() => {
  }, [])
  function ErrorBoundary () {
    const error = useRouteError();
    console.error(error);
    return <div>{error.message}</div>;
  }


  return (
    <>

      <Routes >
        <Route errorElement={<ErrorBoundary />} path='*' element={<NotFound />} />
        <Route errorElement={<ErrorBoundary />} path='/' element={<Main />}>
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.home} element={<Home />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.playlist + ':id'} element={<PlayList />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.albums + ':id'} element={<Album />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.search} element={<Search />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.account} element={<Account />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.song + ':id'} element={<Song />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.updateLanguage} element={<SelectLanguage />} />

          <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id'} element={<Artist />} >
            <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id' + RouteStrings.artistDetails} element={<ArtistDetails />} />
            <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id' + RouteStrings.artistSongs} element={<ArtistSongs />} />
            <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id' + RouteStrings.artistAlbums} element={<ArtistAlbums />} />
          </Route>

        </Route>
        <Route errorElement={<ErrorBoundary />} path={RouteStrings.selectLanguage} element={<SelectLanguage />} />
        <Route errorElement={<ErrorBoundary />} path={RouteStrings.noNetwork} element={<NoNetwork />} />
      </Routes>


    </>
  )
}




export default App