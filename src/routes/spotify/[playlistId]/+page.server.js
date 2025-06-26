
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
    const playlistId = params.playlistId;

    console.log(`[Page Server Debug] Request received for playlistId: ${playlistId}`);

    try {
        // Call the internal API route
        const apiResponse = await fetch(`/api/spotify/${playlistId}`);

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error(`[Page Server Debug] Error from internal Spotify API: ${apiResponse.status} ${errorData.message}`);
            throw error(apiResponse.status, `Failed to load playlist: ${errorData.message}`);
        }

        const data = await apiResponse.json();
        console.log(`[Page Server Debug] Received data from internal API. Playlist Image: ${data.playlistImage ? data.playlistImage : 'Not found'}, Tracks count: ${data.tracks ? data.tracks.length : '0'}`);

        return {
            tracks: data.tracks,
            playlistName: data.playlistName,
            playlistImage: data.playlistImage // Pass the playlist image from the API response
        };

    } catch (e) {
        console.error('[Page Server Debug] Error fetching playlist data from internal API:', e);
        throw error(500, `Could not retrieve playlist data: ${e.message}`);
    }
}
