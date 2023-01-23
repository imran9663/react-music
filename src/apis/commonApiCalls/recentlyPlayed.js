import { configURL } from "../Base/config"
import { postRequestWithInstence } from "../Base/serviceMethods"

export const addtoRecentlyPlayedApi = async (data) => {
    await postRequestWithInstence(configURL.recentlyPlayed, { "data": data }).then(res => {
        return res
    }).catch(err => {
        return err
    })
}