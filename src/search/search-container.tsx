// inteligent container to do all the data interation like a controller

import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_FAVOURITES, GET_REPO_NAME } from "../queries/queries";
import { appState } from "../state/state";
import { GoogleMap } from "./map";
import "./search.scss";
import { NoResultFound } from "./no-result";
import { AddressComponent } from "./address";
import { SearchExample } from "./search-input";
import { Notification } from "../shared/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { searchAddress } from "./effects/search-address";
import { handleShowFav } from "./effects/handle-fav";

export function SearchContainer(props: any) {
  const state = useReactiveVar(appState);

  const { loading, error, data, refetch } = useQuery(GET_REPO_NAME, {
    fetchPolicy: "network-only",
  });

  //  track the change of address search
  useEffect(() => {
    let isSubscribed = true;
    if (!!state.searchString) {
      searchAddress(appState(), isSubscribed);
    }
    return () => {
      isSubscribed = false;
    };
  }, [state?.searchString]);

  // save to local storage
  useEffect(() => {
    if (state?.favourites?.length >=1) {
      localStorage.setItem(
        "favourites",
        JSON.stringify(state.favourites.filter((a) => a.isFav))
      );
      // appState({
      //   ...state,
      //   favourites: state.favourites.filter((a) => a.isFav),
      // });
    }
  }, [state?.favourites?.length, state.notification]);

  useEffect(() => {
    if (state.favourites?.length === 0) {
      const savedList = data?.launchesPast[0]?.favourites;
      if (!!savedList && savedList?.length > 0) {
        appState({ ...appState(), favourites: savedList });
      }
    }
  });

  if (loading) return <Spinner animation="border" />;

  if (error) return <p> error</p>;

  return (
    <Fragment>
      <Container>
        <Row>
          <Col
            className="d-flex mt-4  flex-column justify-content-center"
            xs={3}
          >
            <Button
              variant="dark"
              size="sm"
              onClick={() => handleShowFav(refetch)}
            >
              {state?.favourites?.length} <FontAwesomeIcon icon={faStar} />{" "}
              Favourites
            </Button>
          </Col>
          <Col xs={9}>
            <SearchExample />
          </Col>
        </Row>
        <Notification />
        <Row>
          <Col xs={12} md={6} hidden={state?.results?.length === 0}>
            <Row className="mt-2 mb-5">
              {state.results.map((item, index) => {
                return (
                  <AddressComponent key={item.id} {...item} />
                );
              })}
            </Row>
          </Col>
          <Col className="mt-2">
            <GoogleMap address="your location" />
          </Col>
        </Row>
        <NoResultFound />
      </Container>
    </Fragment>
  );
}
