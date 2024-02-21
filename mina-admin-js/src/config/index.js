let config = {}

const setConfig = (cfg) => {
  config = Object.assign(config, cfg)
}
const getConfig = (key) => {
  if (typeof key === "string") {
    const arr = key.split(".")
    if (arr && arr.length) {
      let data = config
      arr.forEach(v => {
        if (data && typeof data[v] !== "undefined") {
          data = data[v]
        } else {
          data = null
        }
      })
      return data
    }
  }
  return config
}

export {getConfig, setConfig}
