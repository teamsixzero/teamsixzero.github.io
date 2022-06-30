# teamsixzero.github.io

## Developer Workflow
1. Install ASDF
2. Install required ASDF libraries
3. Install bundler
4. Install yarn (if required)
5. `bundle`
6. `yarn`
7. `yarn develop`

### ASDF

This is a pretty cool tool! It helps keep you sane while using different versions
of things like `node` or `ruby`.

To install it, follow the docs for your operating system. The docs are available
here: https://asdf-vm.com/#/core-manage-asdf?id=install

### ASDF Libraries

Once asdf is working, you'll need to install some plugins. For this project,
we'll need the nodejs plugin and the ruby plugin.

First, to see all of the tools available in asdf, try running this command in
your favourite shell:

```bash
asdf plugin list all
```

This will produce a huge list of plugins. Cool!

To find something specific, like `node` try something like this:

```bash
asdf plugin list all | grep node
```

For this project, we currently use only `ruby` and `nodejs`. To see which asdf plugins
a project requires, take a look at the `.tool-versions` file in the project root directory.

To install those plugins the easy way, run the following commands:

```bash
asdf plugin add nodejs
asdf plugin add ruby
```

For more advanced methods, take a look at the docs here: https://asdf-vm.com/#/core-manage-plugins?id=add

At this point, there may be some errors. Hopefully there aren't, but errors do happen.
If you encounter some errors here, reach out to a friend and, once you solve 'em,
add your discoveries to this README file!

### Install bundler

```bash
gem install bundler
```

### Install yarn

It's possible that you won't need to do this step — pretty sure `node` ships with
a version of yarn built in. If you do need to do install it, then run the following command:

```bash
npm install --global yarn
```

That should do the trick. If it doesn't, consult the yarn documentation online
here: https://classic.yarnpkg.com/en/docs/install

### Format images

All images in the _What We Do_ and _Work_ sections of the site should be added in both `png` and `webp` format, with size variations in order to be served at the most appropriate size on page load/resize.


### Formatting images workflow

In the root folder of this repo, there's a `format-images.sh` bash script. To use this script:
1. Create a folder (outside of the repo) that will house to-be-processed images.
2. Drop a copy of the `format-images.sh` file in that folder.
3. Navigate to that folder in a terminal window (https://terminalcheatsheet.com/guides/navigate-terminal if you need help)
4. Type `sh format-images.sh` to run the script.

The script will create size variants at `1400px`, `1200px`, `800px`, `600px`, and `400px`, and will also create webp versions with the same size variants. The script will then run a compression tool on all `PNGs/JPGs` in the folder.

The images will now be ready to be added to the site. Look at `~/projects/wizebank.html` to see how images are served on the site (lines 39 - 58).

### Troubleshooting

OK, sometimes things don't work as planned. This section is where will will
track installation issues. If you run into an issue while you're installing this project, add a section to this document below this paragraph.

- 06/2022 There is a known issue with `webp` images appearing slightly blurry on Mac browsers (tested in Firefox, Safari, Chrome). Portfolio images are only being served in `png` format, but `webp` files are still being added to the repo for future-proofing.
