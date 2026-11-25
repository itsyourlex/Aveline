# Background music

The website works without any audio file. By default, `audioSrc` in
`src/data/loveContent.ts` is `null`, so the music control plays a gentle,
synthesized ambient pad generated in the browser (no copyrighted music).

To use your own track instead:

1. Put a royalty-free / personally licensed audio file in this folder, e.g.
   `public/audio/our-song.mp3`.
2. Open `src/data/loveContent.ts` and change:
   `audioSrc: null` to `audioSrc: "/audio/our-song.mp3"`.
3. Reload the site. The player will use your file automatically.

Music never starts on its own. It only begins after the visitor clicks the
music control or, if a previous session preference was saved, after their next
explicit interaction with the page.
