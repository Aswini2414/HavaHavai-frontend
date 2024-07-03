import React,{useState,useContext} from "react";
import {
  View,
  Heading,
  Form,
  TextField,
  Picker,
  Switch,
  Button,
    Item,
    Flex,
  FileTrigger
} from "@adobe/react-spectrum";
import { MdDeleteOutline } from "react-icons/md";
import { context } from "../context/ContextProvider";
import { FaArrowTrendUp, FaTruckFieldUn } from "react-icons/fa6";
import useAddServices from "../hooks/useAddServices";

const Services = () => {
  const [lost, setLost] = useState(true);
  const { servicedetails, setServiceDetails } = useContext(context);
  const { addServices,loadService } = useAddServices();

  const handleSave = async () => {
    await addServices();
  }

  return (
    <View>
      <Heading level={3}>Services</Heading>
      <View
        borderBottomWidth="thin"
        borderColor="gray-400"
        paddingBottom="size-100"
        marginTop="size-200"
        marginBottom="size-200"
      >
        <Flex direction="row" justifyContent="space-between">
          <button level={3} onClick={() => setLost(true)}>
            Lost & found
          </button>
          <MdDeleteOutline
            className="text-2xl cursor-pointer"
            onClick={() => setLost(false)}
          />
        </Flex>
      </View>
      {lost && (
        <Form>
          <Flex direction="row">
            <Flex
              direction="column"
              justifyContent="space-around"
              gap="size-200"
            >
              <Flex direction="row" alignItems="center" gap="size-200">
                <TextField
                  label="Service Name"
                  defaultValue="Lost & found"
                  onChange={(value) =>
                    setServiceDetails({ ...servicedetails, name: value })
                  }
                />
                <Picker
                  label="Category"
                  items={[
                    { name: "Money" },
                    { name: "Valuables" },
                    { name: "Other" },
                  ]}
                  onSelectionChange={(selected) =>
                    setServiceDetails({ ...servicedetails, category: selected })
                  }
                >
                  {(item) => <Item key={item.name}>{item.name}</Item>}
                </Picker>
                <Picker
                  label="Sub Category"
                  items={[{ name: "Expensive" }, { name: "Not expensive" }]}
                  onSelectionChange={(selected) =>
                    setServiceDetails({
                      ...servicedetails,
                      subcategory: selected,
                    })
                  }
                >
                  {(item) => <Item key={item.name}>{item.name}</Item>}
                </Picker>
                <FileTrigger
                  allowsMultiple
                  onSelect={(e) =>
                    setServiceDetails({ ...servicedetails, file: e[0] })
                  }
                >
                  <Button variant="primary">Upload your files</Button>
                </FileTrigger>
                <Switch>Show image</Switch>
              </Flex>
              <Flex>
                <TextField
                  label="Description"
                  defaultValue="type here"
                  onChange={(value) =>
                    setServiceDetails({ ...servicedetails, desc: value })
                  }
                />
              </Flex>
            </Flex>
            <Button
              variant="primary"
              staticColor="black"
              style="fill"
              marginStart="auto" onPress ={()=>handleSave()}
            >
              { loadService ? <span className="loading loading-spinner"></span>:"Save"}
            </Button>
          </Flex>
        </Form>
      )}

      <View
        borderBottomWidth="thin"
        borderColor="gray-400"
        paddingBottom="size-100"
        marginTop="size-400"
        marginBottom="size-200"
      >
        <Flex direction="row" justifyContent="space-between">
          <button level={3}>Lounge</button>
          <MdDeleteOutline className="text-2xl cursor-pointer" />
        </Flex>
      </View>
      <View
        borderBottomWidth="thin"
        borderColor="gray-400"
        paddingBottom="size-100"
        marginTop="size-200"
        marginBottom="size-200"
      >
        <Flex direction="row" justifyContent="space-between">
          <button level={3}>Money Exchange</button>
          <MdDeleteOutline className="text-2xl cursor-pointer" />
        </Flex>
      </View>
    </View>
  );
};

export default Services;
