/* Usage:

Input song name into parameter field
Output comes in form of {'title': (titlename), 'artist': (artistname), 'lyrics': (lyrics)"}
    or a return statement as a string for 404 error

Note: The MusixMatch API search seems to be very finicky. 
      It randomly won't have lyrics to big name songs, so use accordingly.
      
Working input (tested):
    songname = Ghost, Gangnam Style (comes in turkish lol), Butter
*/

async function getChuck2() {
    let response = await fetch('https://api.chucknorris.io/jokes/random', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
    // you can check for response.ok here, and literally just throw an error if you want
    return await response.json();
}

async function getSongLyrics2 (songname) {

    let searchForId = await fetch("http://api.musixmatch.com/ws/1.1/track.search?apikey=0c22b03c1186444f868a38e08871de00&q_track= " + songname,
    {
        method: 'GET',
    });

    var idJSON = await searchForId.text();
    console.log("ID JSON IS: " + JSON.stringify(idJSON));

    var data = JSON.parse(idJSON);
    var tracklist = data.message;
    console.log("TRACKLIST: " + JSON.stringify(tracklist));

    var tracklist = data.message.body.track_list;
    console.log(tracklist);
    var foundTrackId = '';
    var foundArtist = '';
    var foundTitle = '';

    for(var i = 0; i < tracklist.length; i++) {
        var obj = tracklist[i];

        if(obj.track.has_lyrics) {
            foundTrackId = obj.track.track_id;
            foundArtist = obj.track.artist_name;
            foundTitle = obj.track.track_name;
        }
    }

    console.log(foundTitle);

    let lyricsForId = await fetch("http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=0c22b03c1186444f868a38e08871de00&track_id=" + foundTrackId,
    {
        method: 'GET',
    });

    var lyricsJSON = await lyricsForId.text();
    data = JSON.parse(lyricsJSON);

    console.log(data.message.body.lyrics.lyrics_body);
    foundLyrics = data.message.body.lyrics.lyrics_body;
    let songWithLyricsResult = {
        'title': foundTitle,
        'artist': foundArtist,
        'lyrics': foundLyrics
    };

    console.log("lyricsService result: " + JSON.stringify(songWithLyricsResult));

    return songWithLyricsResult;


}

async function getSongLyrics (songname) {
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
                            console.log("lyricsService result: " + JSON.stringify(songWithLyricsResult));
                            return 1; //songWithLyricsResult;
                        })
                        .catch(err => console.log(err));
                }
            }
            return "404: The MusixMatch API could not find a song with that title."
        });

    
  
}

async function testAsync() {

    var x = 1;
    return x;
}