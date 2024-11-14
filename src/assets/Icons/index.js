
import React from "react"
import defualtImage from "./defualtImage.svg";
import mello from "./mello.svg";
import nointernet from "./no_internet.svg";
import notFound from "./not_found.svg";
import moremusic from "./moremusic.svg";
import ComposeMusic from "./ComposeMusic.svg";
import teamFun from "./teamFun.svg";
import mailbox from "./mailbox.svg";
import ForgotPassword from "./forgot_password.svg";
import SadSitting from "./sadSitting.svg";
const AiFillCrown = React.lazy(() => import("./AiFillCrown.svg").then(module => ({ default: module.ReactComponent })))
const AiOutlineCloseCircle = React.lazy(() => import("./AiOutlineCloseCircle.svg").then(module => ({ default: module.ReactComponent })))
const AiOutlineUser = React.lazy(() => import("./AiOutlineUser.svg").then(module => ({ default: module.ReactComponent })))
const AiFillRightCircle = React.lazy(() => import("./AiFillRightCircle.svg").then(module => ({ default: module.ReactComponent })))
const BiArrowBack = React.lazy(() => import("./BiArrowBack.svg").then(module => ({ default: module.ReactComponent })))
const BiAddToQueue = React.lazy(() => import("./BiAddToQueue.svg").then(module => ({ default: module.ReactComponent })))
const BiAlbum = React.lazy(() => import("./BiAlbum.svg").then(module => ({ default: module.ReactComponent })))
const BiUserCircle = React.lazy(() => import("./BiUserCircle.svg").then(module => ({ default: module.ReactComponent })))
const BsChevronDoubleDown = React.lazy(() => import("./BsChevronDoubleDown.svg").then(module => ({ default: module.ReactComponent })))
const BsChevronDoubleUp = React.lazy(() => import("./BsChevronDoubleUp.svg").then(module => ({ default: module.ReactComponent })))
const BsVolumeMute = React.lazy(() => import("./BsVolumeMute.svg").then(module => ({ default: module.ReactComponent })))
const BsVolumeUp = React.lazy(() => import("./BsVolumeUp.svg").then(module => ({ default: module.ReactComponent })))
const BsVolumeDown = React.lazy(() => import("./BsVolumeDown.svg").then(module => ({ default: module.ReactComponent })))
const BsHeart = React.lazy(() => import("./BsHeart.svg").then(module => ({ default: module.ReactComponent })))
const BsHeartFill = React.lazy(() => import("./BsHeartFill.svg").then(module => ({ default: module.ReactComponent })))
const BsArrowRepeat = React.lazy(() => import("./BsArrowRepeat.svg").then(module => ({ default: module.ReactComponent })))
const BsShuffle = React.lazy(() => import("./BsShuffle.svg").then(module => ({ default: module.ReactComponent })))
const BsPlayFill = React.lazy(() => import("./BsPlayFill.svg").then(module => ({ default: module.ReactComponent })))
const BsPauseFill = React.lazy(() => import("./BsPauseFill.svg").then(module => ({ default: module.ReactComponent })))
const BsChevronBarLeft = React.lazy(() => import("./BsChevronBarLeft.svg").then(module => ({ default: module.ReactComponent })))
const BsChevronBarRight = React.lazy(() => import("./BsChevronBarRight.svg").then(module => ({ default: module.ReactComponent })))
const BsHeadphones = React.lazy(() => import("./BsHeadphones.svg").then(module => ({ default: module.ReactComponent })))
const BsArrowLeft = React.lazy(() => import("./BsArrowLeft.svg").then(module => ({ default: module.ReactComponent })))
const BsThreeDotsVertical = React.lazy(() => import("./BsThreeDotsVertical.svg").then(module => ({ default: module.ReactComponent })))
const BsCloudDownloadFill = React.lazy(() => import("./BsCloudDownloadFill.svg").then(module => ({ default: module.ReactComponent })))
const BsMusicNote = React.lazy(() => import("./BsMusicNote.svg").then(module => ({ default: module.ReactComponent })))
const BsArrowRight = React.lazy(() => import("./BsArrowRight.svg").then(module => ({ default: module.ReactComponent })))
const FiHome = React.lazy(() => import("./FiHome.svg").then(module => ({ default: module.ReactComponent })))
const FiSearch = React.lazy(() => import("./FiSearch.svg").then(module => ({ default: module.ReactComponent })))
const FaFacebookF = React.lazy(() => import("./FaFacebookF.svg").then(module => ({ default: module.ReactComponent })))
const FaTwitter = React.lazy(() => import("./FaTwitter.svg").then(module => ({ default: module.ReactComponent })))
const FaWikipediaW = React.lazy(() => import("./FaWikipediaW.svg").then(module => ({ default: module.ReactComponent })))
const GoVerified = React.lazy(() => import("./GoVerified.svg").then(module => ({ default: module.ReactComponent })))
const HiLanguage = React.lazy(() => import("./HiLanguage.svg").then(module => ({ default: module.ReactComponent })))
const RxDot = React.lazy(() => import("./RxDot.svg").then(module => ({ default: module.ReactComponent })))
const RxDragHandleDots2 = React.lazy(() => import("./RxDragHandleDots2.svg").then(module => ({ default: module.ReactComponent })))
const SiReact = React.lazy(() => import("./SiReact.svg").then(module => ({ default: module.ReactComponent })))
const SlPlaylist = React.lazy(() => import("./SlPlaylist.svg").then(module => ({ default: module.ReactComponent })))
const TfiLoop = React.lazy(() => import("./TfiLoop.svg").then(module => ({ default: module.ReactComponent })))
const IoPlaySkipForward = React.lazy(() => import("./IoPlaySkipForward.svg").then(module => ({ default: module.ReactComponent })))
const BsTrashCan = React.lazy(() => import("./BsTrashCan.svg").then(module => ({ default: module.ReactComponent })))
const BsEyeFill = React.lazy(() => import("./BsEyeFill.svg").then(module => ({ default: module.ReactComponent })))
const BsEyeSlashFill = React.lazy(() => import("./BsEyeSlashFIll.svg").then(module => ({ default: module.ReactComponent })))
const BsRadioPin = React.lazy(() => import("./BsRadioPin.svg").then(module => ({ default: module.ReactComponent })))
const BsDownload = React.lazy(() => import("./BsDownload.svg").then(module => ({ default: module.ReactComponent })))
const BsShare = React.lazy(() => import("./BsShare.svg").then(module => ({ default: module.ReactComponent })))
const BsListPlus = React.lazy(() => import("./BsListPlus.svg").then(module => ({ default: module.ReactComponent })))
const BsListPlay = React.lazy(() => import("./BsListPlay.svg").then(module => ({ default: module.ReactComponent })))
const BsPlusCircle = React.lazy(() => import("./BsPlusCircle.svg").then(module => ({ default: module.ReactComponent })))
const BsNoMusic = React.lazy(() => import("./BsNoMusic.svg").then(module => ({ default: module.ReactComponent })))
const BsLyricsNote = React.lazy(() => import("./BsLyricsNote.svg").then(module => ({ default: module.ReactComponent })))





export const Icons = {
    notFound: notFound,
    nointernet: nointernet,
    moremusic: moremusic,
    mello: mello,
    defualtImage: defualtImage,
    ComposeMusic: ComposeMusic,
    teamFun: teamFun,
    mailbox: mailbox,
    ForgotPassword: ForgotPassword,
    SadSitting: SadSitting,

    home: FiHome,
    home: FiHome,
    search: FiSearch,
    BsChevronDoubleDown: BsChevronDoubleDown,
    BsChevronDoubleUp: BsChevronDoubleUp,
    SlPlaylist: SlPlaylist,
    BsVolumeMute: BsVolumeMute,
    BsVolumeUp: BsVolumeUp,
    BsVolumeDown: BsVolumeDown,
    BsHeart: BsHeart,
    BsHeartFill: BsHeartFill,
    BsArrowRepeat: BsArrowRepeat,
    BsShuffle: BsShuffle,
    TfiLoop: TfiLoop,
    BsPlayFill: BsPlayFill,
    BsPauseFill: BsPauseFill,
    BsChevronBarLeft: BsChevronBarLeft,
    BsChevronBarRight: BsChevronBarRight,
    BsHeadphones: BsHeadphones,
    BsArrowLeft: BsArrowLeft,
    BsArrowRight: BsArrowRight,
    BsThreeDotsVertical: BsThreeDotsVertical,
    BiAlbum: BiAlbum,
    HiLanguage: HiLanguage,
    RxDot: RxDot,
    BsCloudDownloadFill: BsCloudDownloadFill,
    BsMusicNote: BsMusicNote,
    SiReact: SiReact,
    AiOutlineCloseCircle: AiOutlineCloseCircle,
    AiOutlineUser: AiOutlineUser,
    RxDragHandleDots2: RxDragHandleDots2,
    BiUserCircle: BiUserCircle,
    GoVerified: GoVerified,
    AiFillCrown: AiFillCrown,
    FaFacebookF: FaFacebookF,
    FaTwitter: FaTwitter,
    FaWikipediaW: FaWikipediaW,
    BiArrowBack: BiArrowBack,
    AiFillRightCircle: AiFillRightCircle,
    BiAddToQueue: BiAddToQueue,
    IoPlaySkipForward: IoPlaySkipForward,
    BsTrashCan: BsTrashCan,
    BsEyeFill: BsEyeFill,
    BsEyeSlashFill: BsEyeSlashFill,
    BsRadioPin: BsRadioPin,
    BsDownload: BsDownload,
    BsShare: BsShare,
    BsListPlus: BsListPlus,
    BsListPlay: BsListPlay,
    BsPlusCircle: BsPlusCircle,
    BsNoMusic: BsNoMusic,
    BsLyricsNote: BsLyricsNote,
};
