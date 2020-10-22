const favicons = require('favicons')
const nodepath = require('path');
const fs = require('fs-extra')

const SOURCE_FILE = '../assets/img/favicon.svg';
const OUTPUT_FOLDER = '../assets/favicons';
const HTML_OUTPUT_FILE = '../_includes/favicons.html';

const APP_NAME = 'Sixzero';
const THEME_COLOR = "#ffffff";
const PUBLIC_FAVICONS_FOLDER_PATH = "/assets/favicons";

const FAVICON_SOURCE = nodepath.resolve(__dirname, SOURCE_FILE);
const FAVICONS_TARGET_DIR = nodepath.resolve(__dirname, OUTPUT_FOLDER);
const FAVICONS_PARTIAL_FILE = nodepath.resolve(__dirname, HTML_OUTPUT_FILE);

// clean favicons dir
fs.ensureDirSync(FAVICONS_TARGET_DIR);
fs.emptyDirSync(FAVICONS_TARGET_DIR);

const APP_DESCRIPTION = "Sixzero helps companies design impactful apps and software.";
const configuration = {
  path: PUBLIC_FAVICONS_FOLDER_PATH,        // Path for overriding default icons path. `string`
  appName: APP_NAME,                        // Your application's name. `string`
  appShortName: APP_NAME,                   // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: APP_DESCRIPTION,          // Your application's description. `string`
  developerName: "Nick Foster, Sixzero",    // Your (or your developer's) name. `string`
  developerURL: "https://sixzero.co/",      // Your (or your developer's) URL. `string`
  dir: "auto",                              // Primary text direction for name, short_name, and description
  lang: "en-US",                            // Primary language for name and short_name
  background: "#fff",                       // Background colour for flattened icons. `string`
  theme_color: THEME_COLOR,                 // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: THEME_COLOR,         // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: "standalone",                    // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: "any",                       // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: "/",                               // set of URLs that the browser considers within your app
  start_url: "/?homescreen=1",              // Start URL when launching the application from a device. `string`
  version: "1.0",                           // Your application's version string. `string`
  logging: false,                           // Print logs to console? `boolean`
  pixel_art: false,                         // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false,       // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //
    android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    coast: true,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    yandex: true                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
  }
}

const callback = function (error, response) {
  if (error) {
    console.log(error.message); // Error description e.g. "An unknown error has occurred"
    return;
  }

  response.images.forEach(image => {
    fs.writeFileSync(nodepath.resolve(__dirname, OUTPUT_FOLDER, image.name), image.contents)
  })

  response.files.forEach(file => {
    fs.writeFileSync(nodepath.resolve(__dirname, OUTPUT_FOLDER, file.name), file.contents)
  })

  // write include file
  response.html.unshift('<!-- THIS FILE IS AUTO-GENERATED USING THE FAVICONS BUILD SCRIPT. DO NOT EDIT DIRECTLY --->')
  fs.writeFileSync(FAVICONS_PARTIAL_FILE, response.html.join('\n'))

  console.log(response.images);
  console.log(response.files);
  console.log(response.html);
};

favicons(FAVICON_SOURCE, configuration, callback);
