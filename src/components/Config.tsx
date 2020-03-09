import { Config } from "../Types"
import { version } from "../Version"

const initialConfig : Config = (() => {
    let arr_ori_flag = Array(24).fill(0)
    arr_ori_flag[0] = 1
    return {
        cmllSelector: {
            names: ["o", "s", "as", "t", "l", "u", "pi", "h"],
            flags: [1, 1, 1, 1, 1, 1, 1, 1],
            kind: "cmll",
        },
        cmllAufSelector: {
            names: ["None", "U", "U'", "U2"],
            flags: [1, 1, 1, 1],
            kind: "u_auf"
        },
        triggerSelector: {
            names: ["RUR'", "RU'R'", "R'U'R", "R'UR"],
            flags: [1,1,1,1],
            kind: "trigger"
        },
        orientationSelector: {
            names: [
                "WG", "WB", "WO", "WR",
                "YG", "YB", "YO", "YR",
                "BW", "BY", "BO", "BR",
                "GW", "GY", "GO", "GR",
                "OW", "OY", "OB", "OG",
                "RW", "RY", "RB", "RG",
            ],
            flags: arr_ori_flag,
            kind: "orientation"
        },
        fbdrSelector: {
            names: ["FP at front", "FP at back(unavailable yet)", "Both"],
            flags: [1, 0, 0],
            kind: "fbdr"
        }
    }
})()

let configManager = function() {
    const key = "config"
    const versionKey = "version"
    let cache : Config | null = null

    let getConfig = () => {
        if (cache) {
            return cache
        }
        const item = window.localStorage.getItem(key);
        const vers = window.localStorage.getItem(versionKey)
        if ( (vers === null) || (vers === undefined) || (vers !== version)) {
            window.localStorage.setItem(versionKey, version)
            window.localStorage.setItem(key, JSON.stringify(initialConfig));
            return initialConfig
        }
        const item1 : Config = item ? JSON.parse(item) : initialConfig
        if ( (item1 === null) || (item1 === undefined) || Object.keys(item1).length === 0) {
            window.localStorage.setItem(key, JSON.stringify(initialConfig));
            return initialConfig
        }
        return item1
    }

    let setConfig = (partial: Partial<Config>) => {
        let newConfig : Config = Object.assign(getConfig(), partial)
        window.localStorage.setItem(key, JSON.stringify(newConfig));
        cache = newConfig
    }

    return {
        getConfig,
        setConfig
    }
}()

let getConfig = configManager.getConfig
let setConfig = configManager.setConfig

export {
    getConfig, setConfig
}
