import React, { Suspense, useEffect } from "react";
import "./App.scss";
import { Route, Routes, useRouteError } from "react-router";
import RouteStrings from "./utils/RouteStrings";
import ComponentLoader from "./ComponentLoader";
// const ProductList = React.lazy(() => ComponentLoader(() => import("./path/to/productlist")));

const SpotLoader = React.lazy(() => ComponentLoader(() => import("./components/Loader/SpotLoader")));

const Account = React.lazy(() => ComponentLoader(() => import("./pages/Account")));
const Album = React.lazy(() => ComponentLoader(() => import("./pages/Album")));
const Home = React.lazy(() => ComponentLoader(() => import("./pages/Home")));
const Main = React.lazy(() => ComponentLoader(() => import("./pages/Main")));
const NoNetwork = React.lazy(() => ComponentLoader(() => import("./pages/NoNetwork")));
const PlayList = React.lazy(() => ComponentLoader(() => import("./pages/Playlist")));
const Search = React.lazy(() => ComponentLoader(() => import("./pages/Search")));
const Song = React.lazy(() => ComponentLoader(() => import("./pages/Song")));
const Artist = React.lazy(() => ComponentLoader(() => import("./pages/Artist")));
const ArtistDetails = React.lazy(() => ComponentLoader(() => import("./pages/Artist/ArtistDetails")));
const ArtistSongs = React.lazy(() => ComponentLoader(() => import("./pages/Artist/ArtistSongs")));
const ArtistAlbums = React.lazy(() => ComponentLoader(() => import("./pages/Artist/ArtistAlbums")));
const SelectLanguage = React.lazy(() => ComponentLoader(() => import("./pages/SelectLanguage")));
const NotFound = React.lazy(() => ComponentLoader(() => import("./pages/NotFound")));

const App = () => {
  useEffect(() => { }, []);
  function ErrorBoundary () {
    const error = useRouteError();
    console.error(error);
    return <div>{error.message}</div>;
  }

  return (
    <>
      {/* <Suspense fallback={<SpotLoader />}> */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<SpotLoader />}>
              <Main />
            </Suspense>
          }
        >
          <Route
            path={RouteStrings.home}
            element={
              <Suspense fallback={<SpotLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.playlist + ":id"}
            element={
              <Suspense fallback={<SpotLoader />}>
                <PlayList />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.albums + ":id"}
            element={
              <Suspense fallback={<SpotLoader />}>
                <Album />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.search}
            element={
              <Suspense fallback={<SpotLoader />}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.account}
            element={
              <Suspense fallback={<SpotLoader />}>
                <Account />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.song + ":id"}
            element={
              <Suspense fallback={<SpotLoader />}>
                <Song />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.updateLanguage}
            element={
              <Suspense fallback={<SpotLoader />}>
                <SelectLanguage />
              </Suspense>
            }
          />
          <Route
            path={RouteStrings.artist + ":id"}
            element={
              <Suspense fallback={<SpotLoader />}>
                <Artist />
              </Suspense>
            }
          >
            <Route
              path={RouteStrings.artist + ":id" + RouteStrings.artistDetails}
              element={
                <Suspense fallback={<SpotLoader />}>
                  <ArtistDetails />
                </Suspense>
              }
            />
            <Route
              path={RouteStrings.artist + ":id" + RouteStrings.artistSongs}
              element={
                <Suspense fallback={<SpotLoader />}>
                  <ArtistSongs />
                </Suspense>
              }
            />
            <Route
              path={RouteStrings.artist + ":id" + RouteStrings.artistAlbums}
              element={
                <Suspense fallback={<SpotLoader />}>
                  <ArtistAlbums />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route
          path={RouteStrings.selectLanguage}
          element={
            <Suspense fallback={<SpotLoader />}>
              <SelectLanguage />
            </Suspense>
          }
        />
        <Route
          path={RouteStrings.noNetwork}
          element={
            <Suspense fallback={<SpotLoader />}>
              <NoNetwork />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<SpotLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      {/* </Suspense> */}
    </>
  );
};

export default App;
