export const configURL = {}

configURL.homePage = '/modules?language='
configURL.playlist = '/playlists?id='
configURL.albums = '/albums?id='
configURL.song = '/songs?id='
configURL.searchAll = '/search/all/'
configURL.artist = '/artists'
configURL.lyrics = '/lyrics?id='

configURL.register = '/auth/register'
configURL.login = '/auth/login'
configURL.verifyotp = '/auth/verifyOtp'
configURL.changepassword = '/auth/changePassword'
configURL.forgotpassword = '/auth/forgotpassword'

configURL.setLanguages = '/music/setLanguages'
configURL.favorite = '/music/favorites'
configURL.recentlyPlayed = '/music/recentlyPlayed'
configURL.getAllPlayListsByUser = '/music/getAllPlayListsByUser'
configURL.createPlayListByUser = '/music/createPlayListByUser'
configURL.addTrackToThePlayListById = '/music/addTrackToThePlayListById'
configURL.deletePlayListByPlayListId = '/music/deletePlayListByPlayListId'
configURL.removeTrackFromPlaylistByTrackId = '/music/removeTrackFromPlaylistByTrackId'



// router.post("/register", registerUser);
// router.post("/login", signinUser);
// router.post("/verifyOtp", verifyOtp);
// router.post("/changePassword", changePassword);
// router.post("/forgotpassword", ForgotPassword);
