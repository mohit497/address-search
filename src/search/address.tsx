import { useReactiveVar } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Address } from "../state/address";
import { appState } from "../state/state";

export function AddressComponent(props: Address) {
  const state = useReactiveVar(appState);
  const handleClick = () => {
    appState({ ...appState(), selectedAddress: props });
  };

  const handleFav = () => {
    if (props.isFav) {
      appState({
        ...appState(),
        favourites: state.favourites.filter((a) => a.id === props.id),
        results: appState().results.map((a) => {
          if (a.id === props.id) {
            return { ...a, isFav: false };
          }
          return a;
        }),
        notification: "Removed from favourites",
      });
    } else {
      appState({
        ...appState(),
        favourites: [...state.favourites, { ...props, isFav: true }],
        results: appState().results.map((a) => {
          if (a.id === props.id) {
            return { ...a, isFav: true };
          }
          return a;
        }),
        notification: "Added to favourites",
      });
    }
  };

  return (
    <Col onClick={handleClick} xs={12}>
      <Row>
        <Card
          className={
            !!props &&
            props.location.lat === state?.selectedAddress?.location.lat
              ? "selected address border pt-3 pb-3"
              : "address border  "
          }
        >
          <Card.Body>
            <Card.Title>{props.id}</Card.Title>
            <Card.Text>{props.name}</Card.Text>
            <p
              onClick={handleFav}
              className={props.isFav ? "fav-icon is-fav" : "fav-icon"}
            >
              <FontAwesomeIcon icon={faStar} />
            </p>
            <Row>
              <span>
                <b>Lat :</b>
                {props?.location.lat}
              </span>
              ,
              <span>
                <b>Lng :</b>
                {props?.location.lat}
              </span>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
}
