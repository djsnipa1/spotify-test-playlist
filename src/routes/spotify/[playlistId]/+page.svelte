<script>
    export let data;

    // Access the tracks from the data loaded by +page.server.js
    const tracks = data.tracks;
</script>

<style>
    .playlist-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1.5rem;
        background-color: #1a1a1a;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        color: #e0e0e0;
    }

    h1 {
        color: #1DB954; /* Spotify Green */
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .track-list {
        list-style: none;
        padding: 0;
    }

    .track-item {
        display: flex;
        align-items: center;
        padding: 0.8rem 0;
        border-bottom: 1px solid #333;
    }

    .track-item:last-child {
        border-bottom: none;
    }

    .track-info {
        flex-grow: 1;
        margin-left: 1rem;
    }

    .track-number {
        font-weight: bold;
        color: #1DB954; /* Spotify Green */
        margin-right: 0.5rem;
        width: 30px; /* Give it a fixed width for alignment */
        text-align: right;
    }

    .track-name {
        font-weight: bold;
        color: #fff;
    }

    .artist-name {
        color: #b3b3b3;
        font-size: 0.9em;
    }

    .error-message {
        color: #ff4d4d;
        text-align: center;
        margin-top: 2rem;
    }
</style>

<div class="playlist-container">
    <h1>Playlist Tracks</h1>

    {#if tracks && tracks.length > 0}
        <p>Displaying {tracks.length} tracks.</p> <!-- Added track count here -->
        <ul class="track-list">
            {#each tracks as item, i}
                <li class="track-item">
                    <div class="track-number">{i + 1}.</div> <!-- Added track number -->
                    <div class="track-info">
                        <div class="track-name">{item.track.name}</div>
                        <div class="artist-name">{item.track.artists.map(a => a.name).join(', ')}</div>
                    </div>
                </li>
            {/each}
        </ul>
    {:else if tracks}
        <p class="error-message">No tracks found for this playlist.</p>
    {:else}
        <p class="error-message">Could not load playlist tracks. Please check the playlist ID and your API credentials.</p>
    {/if}
</div>
