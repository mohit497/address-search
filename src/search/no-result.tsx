import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { appState } from "../state/state";

// show no results found when the results are empty
export function NoResultFound() {
  const state = useReactiveVar(appState);

  return (
    <Container
      hidden={state?.results?.length !== 0 || state.searchString.length === 0}
    >
      <Row className="p-5 mx-md-5">
        <Col xs={12}>No Results Found</Col>
      </Row>
    </Container>
  );
}
