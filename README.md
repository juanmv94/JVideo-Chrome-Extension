# JVideo Chrome Extension
A simple Google Chrome extension for video/audio link extraction, download, and speed changing working on most web video providers

## Why JVideo?
Some video providers doesn't allow you to speed up video playback.
Additionally, many web video providers prevent you from watching their videos comfortably due to abusive ads, cryptocurrency during playing, etc.

In most cases they do not allow you to download the videos either.

JVideo solves all these problems:

* It allows you to speed up any video/audio, preserving or not audio pitch
* It allows you to open a new video/audio tab without anything else (ads, iframes,...) by opening the (\*.mp4, \*.mp3,...) media link
* It allows you to download the video/audio file (\*.mp4, \*.mp3,...)
* It allows you to copy video/audio link
* It allows you to send video to a ChromeCast device

## How to use
First, you must go to a web page with an embedded video/audio. Sometimes it will be necessary to start playing it so that the page loads it.

Then, you can press the JVideo extension icon, and if JVideo detects a compatible (\*.mp4, \*.mp3,...) media link, you'll see a green label saying **¡Medio descargable!**, then you can press:

* **Abrir**: To open a new tab with the media from the current tab and anything more
* **Descargar**: To start downloading the media from the current page
* **Copiar**: To copy media link to your clipboard

You can also press the buttons with numbers to change media playback speed, even on uncompatible media. You can also use the following buttons:
* **A+**: To increase pitch with playback speed
* **A=**: To preserve pitch with playback speed (default)
* **Fin**: Skip to the end of the media (useful for skipping ads)
* **C**: Send video to ChromeCast device
* **L**: Reload tab in "Legacy Mode" (see below)

## Limitations and Solutions
If the video provider uses the [MediaSource Web API](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource) for its media (including the well known *Youtube*, and *Vimeo*), then you'll see a red label saying **Medio no descargable** instead. It means it doesn't use simple \*.mp4/\*.mkv/... embedded videos, and JVideo won't be able to get a video link. You can try to force the video provider to not to use MediaSource API using the magic "Legacy Mode": If you press the **L** button, it will reload the current tab without MediaSource API support, and you could be able to download it!

## Tips
Once you opened the video in a new tab wit JVideo, you can go fullscreen with **F11** key, or download the video with **CTRL+S**.

## Legal
You should not use JVideo for downloading illegal content, or at any web where video download is explicitly unallowed.

## Author
@Juanmv94

http://tragicomedy-hellin.blogspot.com