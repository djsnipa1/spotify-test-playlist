
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
    const playlistId = params.playlistId;

    try {
        // Call the internal API route
        const apiResponse = await fetch(`/api/spotify/${playlistId}`);

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error(`Error from internal Spotify API: ${apiResponse.status} ${errorData.message}`);
            throw error(apiResponse.status, `Failed to load playlist: ${errorData.message}`);
        }

        const data = await apiResponse.json();
        return {
            tracks: data.tracks
        };

    } catch (e) {
        console.error('Error fetching playlist data from internal API:', e);
        throw error(500, `Could not retrieve playlist data: ${e.message}`);
    }
}
