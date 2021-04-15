import React from "react";
import { Form, Col } from "react-bootstrap";
import { useReactiveVar } from "@apollo/client";
import { appState } from "../state/state";

export function SearchExample() {
  const state = useReactiveVar(appState);

  const onSearchAddress = (e: any) => {
    appState({ ...appState(), searchString: e.target.value });
  };

  return (
    <Col className="m-2" xs={12}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Address</Form.Label>
          <Form.Control
            value={state.searchString}
            onChange={onSearchAddress}
            size="lg"
            type="email"
            placeholder="Enter Address"
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Form>
    </Col>
  );
}
