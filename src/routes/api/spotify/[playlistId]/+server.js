
import { json, error } from '@sveltejs/kit';
import SpotifyWebApi from 'spotify-web-api-node';
import { env } from '$env/dynamic/private';
import { PUBLIC_SPOTIFY_TRACK_LIMIT } from '$env/static/public';

const consoleDebugIntro = `[Spotify API Server Debug]`;

const spotifyApi = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
});

console.log(`${consoleDebugIntro} MAX_TRACKS_TO_MATCH: ${PUBLIC_SPOTIFY_TRACK_LIMIT}`);

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const playlistId = params.playlistId;
    const MAX_TRACKS_TO_FETCH = PUBLIC_SPOTIFY_TRACK_LIMIT; // Limit to the first NUMBER tracks as requested
    // const MAX_TRACKS_TO_FETCH = 2000;
    const LIMIT_PER_REQUEST = 100; // Spotify's max limit per request

    console.log(`${consoleDebugIntro}  Request received for playlistId: ${playlistId}`);

    if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET) {
        console.error('Spotify API client ID and/or secret not set in environment variables.');
        throw error(500, 'Spotify API credentials not configured.');
    }

    try {
        // Step 1: Get Access Token
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);

        console.log(`${consoleDebugIntro}  Access Token obtained. Length: ${data.body['access_token'].length}`);

        let playlistName = null;
        let playlistImage = null;
        let allTracks = [];
        let offset = 0;
        let itemsFetchedInCurrentBatch = -1; // Initialize to -1 to ensure loop runs at least once
        let totalTracksInPlaylist = null

        // Step 2a: Get Playlist Details (including image)
        try {
            const playlistDetailsResponse = await spotifyApi.getPlaylist(playlistId);
            if (playlistDetailsResponse.body.images && playlistDetailsResponse.body.images.length > 0) {
                // Get the largest image available (or first one if sizes aren't perfect)
                playlistImage = playlistDetailsResponse.body.images[0].url;
                playlistName = playlistDetailsResponse.body.name;
                console.log(`${consoleDebugIntro}  Playlist Image URL fetched: ${playlistImage}`);
            } else {
                console.log(`${consoleDebugIntro}  No images found for playlist ${playlistId}`);
            }
        } catch (err) {
            console.error('${consoleDebugIntro}  Error fetching playlist details (image):', err);
            // Do not throw error here, continue trying to get tracks even if image fails
        }

        // Step 2b: Get Playlist Tracks with direct pagination loop
        while (allTracks.length < MAX_TRACKS_TO_FETCH && itemsFetchedInCurrentBatch !== 0) {
            console.log(`${consoleDebugIntro}  Fetching batch with offset: ${offset}, current total: ${allTracks.length}`);
            let currentBatchResponse;
            try {
                currentBatchResponse = await spotifyApi.getPlaylistTracks(playlistId, {
                    limit: LIMIT_PER_REQUEST,
                    offset: offset
                });
            } catch (err) {
                console.error(`${consoleDebugIntro}  Error fetching tracks for offset ${offset}:`, err);
                throw error(err.statusCode || 500, `Failed to retrieve playlist tracks for offset ${offset}: ${err.message || 'Unknown error'}`);
            }
            
            totalTracksInPlaylist = currentBatchResponse.body.total;

            const items = currentBatchResponse.body.items || [];
            itemsFetchedInCurrentBatch = items.length; // How many items were in this response

            console.log(`${consoleDebugIntro}  Received ${itemsFetchedInCurrentBatch} items in this batch. Total from Spotify (if available): ${currentBatchResponse.body.total}`);

            const validItems = items.filter(item => item && item.track);

            allTracks = allTracks.concat(validItems);
            console.log(`${consoleDebugIntro}  Current total tracks collected: ${allTracks.length}`);

            offset += LIMIT_PER_REQUEST;
        }
        
        const tracksToReturn = allTracks.slice(0, MAX_TRACKS_TO_FETCH).map(item => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists[0]?.name || 'Unknown Artist',
            album: item.track.album.name,
            thumbnail: item.track.album.images[0]?.url || null, // Add thumbnail here
            preview_url: item.track.preview_url,
        }));

        console.log(`${consoleDebugIntro}  Final tracks to return: ${tracksToReturn.length}`);

        // Return both tracks and playlist image
        return json({
            tracks: tracksToReturn,
            playlistName: playlistName,
            playlistImage: playlistImage,
            totalTracksInPlaylist: totalTracksInPlaylist
        });

    } catch (e) {
        console.error('Error fetching Spotify data:', e);
        throw error(e.statusCode || 500, `Could not retrieve playlist data: ${e.message || 'Unknown error'}`);
    }
}
