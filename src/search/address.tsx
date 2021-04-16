import { useReactiveVar } from "@apollo/client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Address } from "../state/address";
import { appState } from "../state/state";
import { calculateDistance } from "./effects/calculate-distance";
import { cords } from "./map";

export function AddressComponent(props: Address) {
  const state = useReactiveVar(appState);
  const [distance, setdistance] = useState<any>(null);



  const getDistance =()=>{
    calculateDistance(
      {
        id: "melbourne",
        name: "melbourne",
        location: cords.center,
        isFav: false,
      },
      state.results[0]
    ).then((res) => {
      setdistance(res.data.rows[0]?.elements[0]?.distance?.text)
      appState({
        ...appState(),
        selectedAddress: { ...props, distFromMelbourne: res.data.rows[0]?.elements[0]?.distance?.text },
      });
    })

  }

  const handleClick = () => {
    getDistance();
  };

  // aut select on single result and calculate distance
  useEffect(() => {
    if (
      state?.results[0]?.id === props.id ||
      props.id === state?.selectedAddress?.id
    ) {
      getDistance()
    }
  },[state.results]);


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
            <Row className="text-cener">
              <Col>
                {state?.selectedAddress?.id === props.id && !!distance
                  ? `${distance} from Melbourne`
                  : ""}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Col>
  );
}
