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

### The rest of 'em...

They're pretty straight-forward! Just run commands specified in the list above in
your terminal.


### Troubleshooting

OK, sometimes things don't work as planned. This section is where will will
track installation issues. If you run into an issue while you're installing this project,
add a section to this document below this paragraph, and reach out to a friend for
some help! Once y'all sort it out, make sure to capture what you discovered here.

- **Why isn't my troubleshooting question listed here?**
  - Because you haven't added it here yet! Add your question, figure out how to solve it, and then tell us what you discovered!
