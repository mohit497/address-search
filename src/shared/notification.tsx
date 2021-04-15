import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { AppState, appState } from "../state/state";

export function Notification() {
  const state: AppState = useReactiveVar(appState);

  useEffect(() => {
    setTimeout(() => {
      appState({ ...appState(), notification: null });
    }, 1000);
  }, [state?.notification]);

  return (
    <Row className="notification" hidden={state?.notification === null}>
      <Col xs={12}>
        <Alert variant="primary">{state?.notification}</Alert>
      </Col>
    </Row>
  );
}
