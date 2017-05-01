# Moody Tunes

Moody Tunes is an interactive data visualizer that plots the sentiment of your current Spotify track over time.

## Installation

Once the repo is cloned, run `npm install` to install the app and its dependencies.

You will not need an external database, but you will need to serve the app to fetch lyrics. To do this, run `npm start`.

## Add your own API keys

IMPORTANT: This app interfaces with the Spotify and Google Natural Language APIs. To use it, set up your own developer accounts with these services. Then make a file in the top level of your project called secrets.js and format it like so:

```js
module.exports = {
  spotifyClientId: 'YOUR CLIENT ID GOES HERE',
  spotifyClientSecret: 'YOUR CLIENT SECRET GOES HERE',
  spotifyRedirectURI: 'YOUR REDIRECT URI GOES HERE',
  googleKey: 'YOUR GOOGLE KEY GOES HERE'
}
```

This will allow the app to communicate with the Spotify and Google APIs under your developer keys.

## To-dos:

Future versions of this hackathon project will:

- Authenticate with OAuth, or another more secure protocol
- Pull Spotify audio features (metrics like danceability, valence, mood) and visualize this data as separate cards
- Add a third dimension to the sentimentagram to incorporate the magnitude of each data point
- Allow users to track sentimentagrams over multiple songs, to visualize the sentiment arc of a playlist, for instance
- Style more completely


Built on Chris Rizzo's [Fullstack Boilerplate](https://github.com/Crizzooo/react-redux-express-boilerplate.git). Made with <3 by [@emtseng](https://www.twitter.com/emtseng) at [Fullstack Academy](https://www.fullstackacademy.com).
