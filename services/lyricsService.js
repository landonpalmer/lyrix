/* Usage:

Input song name into parameter field
Output comes in form of {'title': (titlename), 'artist': (artistname), 'lyrics': (lyrics)"}
    or a return statement as a string for 404 error

Note: The MusixMatch API search seems to be very finicky. 
      It randomly won't have lyrics to big name songs, so use accordingly.
      
Working input (tested):
    songname = Ghost, Gangnam Style (comes in turkish lol), Butter
*/

const getSongLyrics = async (songname) => {
    console.log("this works!");
    
    console.log(songname);
    var foundTrackId = "";
    var foundArtist = "";
    var foundTitle = "";
    var foundLyrics = "";

    fetch("http://api.musixmatch.com/ws/1.1/track.search?apikey=0c22b03c1186444f868a38e08871de00&q_track= " + songname,
    {
        method: 'GET',
    })
        .then(response => response.text())
        .then((response) => {
            var data = JSON.parse(response);
            var tracklist = data.message.body.track_list;
            console.log(tracklist);
            for(var i = 0; i < tracklist.length; i++) {
                var obj = tracklist[i];

                if(obj.track.has_lyrics) {
                    foundTrackId = obj.track.track_id;
                    foundArtist = obj.track.artist_name;
                    foundTitle = obj.track.track_name;

                    fetch("http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=0c22b03c1186444f868a38e08871de00&track_id=" + foundTrackId,
                    {
                        method: 'GET',
                       
                     })
                        .then(response => response.text())
                        .then((response) => {
                            var data = JSON.parse(response);
                            console.log(data.message.body.lyrics.lyrics_body);
                            foundLyrics = data.message.body.lyrics.lyrics_body;
                            let songWithLyricsResult = {
                                'title': foundTitle,
                                'artist': foundArtist,
                                'lyrics': foundLyrics
                            };
                            console.log(songWithLyricsResult);
                            return songWithLyricsResult;
                        })
                        .catch(err => console.log(err));
                }
            }
            return "404: The MusixMatch API could not find a song with that title."
        });

    
  
}