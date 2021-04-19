"use strict";

const axios = require("axios");

const pluginId = require("../admin/src/pluginId");

module.exports = {
  //https://developers.digitalocean.com/documentation/v2/#list-app-deployments
  
  check: async (ctx) => {
    const { app_id, token } = strapi.plugins[
      pluginId
    ].config;

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };

    const url = `https://api.digitalocean.com/v2/apps/${app_id}/deployments`;
    const { data: deployment_list } = await axios.get(
      `https://api.digitalocean.com/v2/apps/${app_id}/deployments`,
      {
        headers,
      }
    );
    const { data: queuedData } = await axios.get(`${url}`, {
      headers,
    });
    const phase = deployment_list.deployments[0].phase
    var busy = false;
    if (["PENDING_BUILD", "BUILDING", "PENDING_DEPLOY", "DEPLOYING"].indexOf(phase) > -1){
      busy = true;
    }

    ctx.send({ busy });
  },

  publish: async (ctx) => {
    const { app_id, token } = strapi.plugins[
      pluginId
    ].config;

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };

    const data = { "force_build": true };

    const url = `https://api.digitalocean.com/v2/apps/${app_id}/deployments`;
    const { status } = await axios.post(url, data, { headers });
    const success = status === 200;

    ctx.send({ success });
  },
};
