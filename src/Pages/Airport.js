import React, { useEffect, useState,useContext } from "react";
import { useParams, useLocation,Link } from "react-router-dom";
import { Breadcrumbs, Item, Text, Heading,View,Tabs,TabList, TabPanels } from "@adobe/react-spectrum";
import Terminal from "../Components/Terminal";
import Services from "../Components/Services";
import { context } from "../context/ContextProvider";

const Airport = () => {
  const [airport, setAirport] = useState("");
  const { id } = useParams();
  const { airports,totalterminals } = useContext(context);
  useEffect(() => {
    fetchAirport();
  }, [id]);

  const fetchAirport = () => {
    const filtered = airports.filter((air) => air._id == id);
    setAirport(filtered);
  };

  console.log(airport);
  return (
    <View>
      <Breadcrumbs>
        <Item href="/airports">Airports</Item>
        <Item key="name">{airport?.[0]?.name}</Item>
      </Breadcrumbs>
      <h1 className="mt-6 font-bold text-3xl">
        {airport?.[0]?.name}
      </h1>
      <View padding="size-200">
        <Tabs aria-label="Airport Tabs">
          <TabList>
            <Item key="terminals">Terminals</Item>
            <Item key="transport">Transport</Item>
            <Item key="contact">Contact</Item>
          </TabList>
          <TabPanels>
            <Item key="terminals">
              <Terminal />
            </Item>
            <Item key="transport">
              <View padding="size-200">Transport</View>
            </Item>
            <Item key="contact">
              <View padding="size-200">Contact</View>
            </Item>
          </TabPanels>
        </Tabs>
        <View marginTop="size-300">
          <Services/>
        </View>
      </View>
    </View>
  );
};

export default Airport;
