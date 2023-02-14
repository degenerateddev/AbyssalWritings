<script lang="ts">
    import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar class="w-full py-0 px-2 border-t-2 border-t-primary">
    <svelte:fragment slot="lead">
        <div class="btn-group-vertical variant-ghost-surface mr-5">
            <a class="btn btn-sm" href="https://www.tim-arnold.tech" target="_blank" rel="noreferrer">Portfolio</a>
            <a class="btn btn-sm" href="https://www.instagram.com/degenerateddeveloper/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <div class="btn-group-vertical variant-ghost-surface">
            <a class="btn btn-sm" href="https://www.linkedin.com/in/tim-arnold-22a035254/?original_referer=https%3A%2F%2Ftim-arnold.tech%2F" target="_blank" rel="noreferrer">LinkedIn</a>
            <a class="btn btn-sm" href="https://de.fiverr.com/degenerateddev" target="_blank" rel="noreferrer">Fiverr</a>
        </div>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <ul class="list-nav">
            <li>
                <a href="/impressum">Impressum</a>
            </li>
            <li>
                <a href="/datenschutz">Datenschutz</a>
            </li>
            <li>
                <a href="/kontakt">Kontakt</a>
            </li>
        </ul>
    </svelte:fragment>
</AppBar>
