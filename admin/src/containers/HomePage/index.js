import React, { memo, useState, useEffect, useRef } from "react";

import { Button, Padded, Text } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { LoadingBar } from "@buffetjs/styles";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext, request } from "strapi-helper-plugin";

import pluginId from "../../pluginId";

const POLL_INTERVAL = 10000;

const HomePage = () => {
  const { formatMessage } = useGlobalContext();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let timeout;
    const checkBusy = async () => {
      const { busy } = await request(`/${pluginId}/check`, { method: "GET" });

      setBusy(busy);
      setReady(true);

      timeout = setTimeout(checkBusy, POLL_INTERVAL);
    };

    checkBusy();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const triggerPublish = async () => {
    setBusy(true);

    await request(`/${pluginId}/publish`, { method: "GET" });
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({ id: "do-publish.home.prompt.confirm" })
    );
    if (ok) triggerPublish();
  };

  return (
    <Padded size="md" top left bottom right>
      <Header
        title={{ label: formatMessage({ id: "do-publish.home.title" }) }}
        content={formatMessage({ id: "do-publish.home.description" })}
      />
      {ready ? (
        busy ? (
          <>
            <LoadingBar />
            <Text>{formatMessage({ id: "do-publish.home.busy" })}</Text>
          </>
        ) : (
          <>
            <Padded size="md" bottom>
              <Text>{formatMessage({ id: "do-publish.home.prompt" })}</Text>
            </Padded>
            <Button
              color="primary"
              icon={<FontAwesomeIcon icon={faUpload} />}
              onClick={handleClick}
            >
              {formatMessage({ id: "do-publish.home.button.publish" })}
            </Button>
          </>
        )
      ) : (
        <>
          <LoadingBar />
          <Text>{formatMessage({ id: "do-publish.home.notready" })}</Text>
        </>
      )}
    </Padded>
  );
};

export default memo(HomePage);
