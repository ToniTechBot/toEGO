export default function () {
  return {
    accent2: "#14157a",
    whitesmoke: "#f5f5f5",
    dark: "1d1d1d",
    lowOpacity: "30",
    mediumOpacity: "a6",
    backgrounds: [
      "https://64.media.tumblr.com/45baec53191971ec08c830217b64a3f0/tumblr_inline_mncitwVLMw1qz4rgp.gif",
      "https://64.media.tumblr.com/73966b6acfd978cc2ae90639bd803d73/tumblr_inline_mydbkloJQm1qak244.gif",
      "https://64.media.tumblr.com/1f53852736e2f58f84d1c06f4fa4d17d/tumblr_inline_mkjlph6wcQ1qz4rgp.png",
      "https://64.media.tumblr.com/42e248b655ff41e98e501f2bc475214b/tumblr_inline_nateoe8C4C1qak244.gif",
      "https://64.media.tumblr.com/9c181a9f3f01baa1cdbf45e4f9a279e5/tumblr_inline_natenvWAWX1qak244.gif",
      "https://64.media.tumblr.com/8b250bb0b90cbb3667071d88f3555c70/tumblr_inline_n9qgx3Si4l1qak244.png",
    ],
    dialogWidth: "width: 300px;",
    headlineStyle: {
      "text-decoration": "underline",
      color: "white",
      "text-decoration-style": "solid",
      "text-decoration-color": "var(--q-accent)",
      "text-shadow": "var(--q-info) 2px 2px 2px",
    },
    buttonFlatStyleTransparent: {
      "box-shadow": "none",
      "background-color": "transparent",
    },
    sFontColor: "black",
    // button fixed size, just icon
    buttonFlatOnlyIcon: {
      "background-color": "transparent",
      "border-style": "unset",
      "box-shadow": "none",
      "min-width": "20px",
      "max-width": "20px",
      "min-height": "20px",
    },
    // button flat color; no borders
    buttonFlatStyle: {
      "min-width": "83px",
      "max-width": "83px",
      "min-height": "23px",
      "box-shadow": "none",
      "background-color": "var(--q-secondary)",
    },
    // button flat color for accent buttons; no borders
    buttonFlatStyleAccentColor: {
      "min-width": "83px",
      "max-width": "83px",
      "min-height": "23px",
      "box-shadow": "none",
      "background-color": "var(--q-accent)",
    },
    sTextBasicShadowBlackFont: {
      "text-shadow": "var(--q-secondary) 2px 2px 2px",
      color: "black !important",
    },
    sTextBasicShadowDarkWhiteFont: {
      "text-shadow": "2px 2px #000000",
      "text-shadow": "rgb(0 0 0) 2px 2px 2px",
      color: "white !important",
    },
    sTextAccentShadow: {
      color: "var(--q-accent)",
      //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
      "text-shadow": "var(--q-info) 2px 2px 2px",
    },
    sTextTitleBar: {
      color: "white",
      //"text-shadow": "0 0 3px var(--q-secondary), 0 0 5px var(--q-secondary)",
      "text-shadow": "var(--q-info) 2px 2px 2px",
    },
  };
}