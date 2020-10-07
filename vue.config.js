
// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        "extraResources": [
          {
            "from": "./youtube-dl/",
            "to": "youtube-dl",
            "filter": [
              "**/*"
            ]
          }
        ]
      }
    }
  }
}