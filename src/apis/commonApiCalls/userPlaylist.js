import { configURL } from "../Base/config"
import { getRequestWithInstence, } from "../Base/serviceMethods"

export const getAllPlayLists = async (userId) => {
    await getRequestWithInstence(`${configURL.getAllPlayListsByUser}/${userId}`).then((result) => {
        return result
    }).catch((err) => {
        return err
    });
}