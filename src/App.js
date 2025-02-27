import React, { Suspense, useEffect } from "react";
import "./App.scss";
import { Route, Routes, useRouteError } from "react-router";
import RouteStrings from "./utils/RouteStrings";
import ComponentLoader from "./ComponentLoader";
// const ProductList = React.lazy(() => ComponentLoader(() => import("./path/to/productlist")));
import Account from "./pages/Account";
import Album from "./pages/Album";
import Home from "./pages/Home";
import Main from "./pages/Main";
import NoNetwork from "./pages/NoNetwork";
import PlayList from "./pages/Playlist";
import Search from "./pages/Search";
import Song from "./pages/Song";
import Artist from "./pages/Artist";
import ArtistDetails from "./pages/Artist/ArtistDetails";
import ArtistSongs from "./pages/Artist/ArtistSongs";
import ArtistAlbums from "./pages/Artist/ArtistAlbums";
import SelectLanguage from "./pages/SelectLanguage";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth/Index";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import OtpVerification from "./pages/Auth/OtpVerification";
import ChangePassword from "./pages/Auth/ChangePassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import MyMusic from "./pages/MyMusic";
import RecentlyPlayed from "./pages/MyMusic/RecentlyPlayed";
import Favorites from "./pages/MyMusic/Favorites";
import Dummy from "./Dummy";
import UserPlayList from "./pages/UserPlayList";
import MyPlayLists from "./pages/MyMusic/MyPlayLists";

// const Account = React.lazy(() => ComponentLoader(() => import("./pages/Account")));
// const Album = React.lazy(() => ComponentLoader(() => import("./pages/Album")));
// const Home = React.lazy(() => ComponentLoader(() => import("./pages/Home")));
// const Main = React.lazy(() => ComponentLoader(() => import("./pages/Main")));
// const NoNetwork = React.lazy(() => ComponentLoader(() => import("./pages/NoNetwork")));
// const PlayList = React.lazy(() => ComponentLoader(() => import("./pages/Playlist")));
// const Search = React.lazy(() => ComponentLoader(() => import("./pages/Search")));
// const Song = React.lazy(() => ComponentLoader(() => import("./pages/Song")));
// const Artist = React.lazy(() => ComponentLoader(() => import("./pages/Artist")));
// const ArtistDetails = React.lazy(() => ComponentLoader(() => import("./pages/Artist/ArtistDetails")));
// const ArtistSongs = React.lazy(() => ComponentLoader(() => import("./pages/Artist/ArtistSongs")));
// const ArtistAlbums = React.lazy(() => ComponentLoader(() => import("./pages/Artist/ArtistAlbums")));
// const SelectLanguage = React.lazy(() => ComponentLoader(() => import("./pages/SelectLanguage")));
// const NotFound = React.lazy(() => ComponentLoader(() => import("./pages/NotFound")));

const App = () => {
  function ErrorBoundary () {
    const error = useRouteError();
    console.error("ErrorBoundary error ==>", error);
    return <div>{error.message}</div>;
  }

  return (
    <>
      {/* <Suspense fallback={<SpotLoader />}> */}
      <Routes>
        <Route errorElement={<ErrorBoundary />} path="/auth" element={<Auth />}>
          <Route path={RouteStrings.otp} element={<OtpVerification />} />
          <Route path={RouteStrings.changePassword} element={<ChangePassword />} />
          <Route path={RouteStrings.register} element={<Register />} />
          <Route path={RouteStrings.login} element={<Login />} />
          <Route path={RouteStrings.forgotPassword} element={<ForgotPassword />} />
        </Route>
        <Route errorElement={<ErrorBoundary />} path='/' element={<Main />}>
          <Route errorElement={<ErrorBoundary />} path='*' element={<NotFound />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.home} element={<Home />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.test} element={<Dummy />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.playlist + ':id'} element={<PlayList />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.userPlaylist + ':id'} element={<UserPlayList />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.albums + ':id'} element={<Album />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.search} element={<Search />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.account} element={<Account />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.myMusic} element={<MyMusic />} >
            <Route exact errorElement={<ErrorBoundary />} path={RouteStrings.recentlyPlayed} element={<RecentlyPlayed />} />
            <Route exact errorElement={<ErrorBoundary />} path={RouteStrings.myfavorites} element={<Favorites />} />
            <Route exact errorElement={<ErrorBoundary />} path={RouteStrings.myPlayLists} element={<MyPlayLists />} />
          </Route>
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.song + ':id'} element={<Song />} />
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id'} element={<Artist />} >
            <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id' + RouteStrings.artistSongs} element={<ArtistSongs />} />
            <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id' + RouteStrings.artistAlbums} element={<ArtistAlbums />} />
            <Route errorElement={<ErrorBoundary />} path={RouteStrings.artist + ':id' + RouteStrings.artistDetails} element={<ArtistDetails />} />
          </Route>
          <Route errorElement={<ErrorBoundary />} path={RouteStrings.updateLanguage} element={<SelectLanguage />} />
        </Route>
        <Route errorElement={<ErrorBoundary />} path={RouteStrings.noNetwork} element={<NoNetwork />} />
        {/* */}
      </Routes>
    </>
  );
};

export default App;
