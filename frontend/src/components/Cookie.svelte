<script>
  import '@beyonk/gdpr-cookie-consent-banner/dist/style.css' // optional, you can also define your own styles
  import GdprBanner from '@beyonk/gdpr-cookie-consent-banner'

  function initAnalytics () {
    // do something with segment.io or google analytics etc
  }
</script>

<GdprBanner cookieName="datenschutz" description="Diese Webseite nutzt Cookies, für bessere Funktionalität und Nutzererfahrung" header="DSGVO Bemerkung" on:analytics={initAnalytics} />