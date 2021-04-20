# Strapi plugin do-publish

This is a plugin for [Strapi](https://github.com/strapi/strapi) headless CMS. It lets you trigger a Digital Ocean App Platform Deployment when the site is ready to be published. Thanks to [digitaljohn](https://github.com/digitaljohn) @ phantomstudios for the initial github pages version.

## Introduction

![Screenshot](./docs/screenshot.png "Plugin Screenshot")

When using Strapi as a headless CMS for a statically built website you need a way to trigger the site to rebuild when content has been updated. The typical approach is to setup a Strapi managed webhook to trigger a CI/CD pipeline whenever content changes. This approach has it's issues. For example when making many changes to content, builds are triggered multiple times and deployments can fail due to the site being deployed concurrently. 

This plugin tackles the publishing flow a different way. The site administrators can take their time and make many changes and once the content update is complete they can trigger a single build.

This plugin also checks to see if an `in_progress` build is active or if anything is in the `queue` and won't allow the user to trigger another. Also, when a build has been triggered the user can wait on the plugin page to see when the build and deployment has completed.

## Installation

Install this plugin with npm or yarn.

With npm:

```bash
npm install strapi-plugin-do-publish
```

With yarn:

```bash
yarn add strapi-plugin-do-publish
```

## Configuration

Generate a config file at `config/plugins.js` or `config/development/plugins.js` etc...

```javascript
module.exports = ({ env }) => ({
    "do-publish": {
      app_id: env("app_id"), // The ID of the Digital ocean app you'd like to rebuild
      api_token: env("api_token"), // a Digital ocean api token with access to create deployments.
    },
  });
```
## Use the Plugin

When the plugin has been installed correctly just click on `Digital Ocean Publishing` in the sidebar under plugins then click "Publish".
