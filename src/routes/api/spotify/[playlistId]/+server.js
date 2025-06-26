
import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
});

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const playlistId = params.playlistId;
    const MAX_TRACKS_TO_FETCH = 500; // Limit to the first 300 tracks as requested
    const LIMIT_PER_REQUEST = 100; // Spotify's max limit per request

    if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET) {
        console.error('Spotify API client ID and/or secret not set in environment variables.');
        throw error(500, 'Spotify API credentials not configured.');
    }

    try {
        // Step 1: Get Access Token
        const data = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(data.body['access_token']);

        let allTracks = [];
        let offset = 0;
        let itemsFetchedInCurrentBatch = -1; // Initialize to -1 to ensure loop runs at least once

        // Step 2: Get Playlist Tracks with direct pagination loop
        // Loop continues as long as we haven't hit MAX_TRACKS_TO_FETCH 
        // AND the previous batch returned items (i.e., not an empty response)
        while (allTracks.length < MAX_TRACKS_TO_FETCH && itemsFetchedInCurrentBatch !== 0) {
            let currentBatchResponse;
            try {
                currentBatchResponse = await spotifyApi.getPlaylistTracks(playlistId, {
                    limit: LIMIT_PER_REQUEST,
                    offset: offset
                });
            } catch (err) {
                console.error(`Error fetching tracks for offset ${offset}:`, err);
                throw error(err.statusCode || 500, `Failed to retrieve playlist tracks for offset ${offset}: ${err.message || 'Unknown error'}`);
            }
            
            const items = currentBatchResponse.body.items || [];
            itemsFetchedInCurrentBatch = items.length; // How many items were in this response

            // Filter out any null tracks (sometimes API returns null items)
            const validItems = items.filter(item => item && item.track);

            allTracks = allTracks.concat(validItems);

            // Increment offset for the next potential request
            offset += LIMIT_PER_REQUEST;
        }
        
        // Trim tracks to exactly MAX_TRACKS_TO_FETCH if more were fetched in the last batch
        const tracksToReturn = allTracks.slice(0, MAX_TRACKS_TO_FETCH);

        // Return the tracks as JSON
        return json({ tracks: tracksToReturn });

    } catch (e) {
        console.error('Error fetching Spotify data:', e);
        throw error(e.statusCode || 500, `Could not retrieve playlist data: ${e.message || 'Unknown error'}`);
    }
}
