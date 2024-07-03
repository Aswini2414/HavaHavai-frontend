import React,{useEffect,useState,useContext} from 'react'
import { TableBody, TableView, TableHeader, Column, Row, Cell,View,ActionButton,DialogTrigger,Dialog,Heading,Content,ButtonGroup,Button,TextField,Divider,Flex,FileTrigger } from '@adobe/react-spectrum';
import { FaArrowDownLong } from "react-icons/fa6";
import data from "../db";
import Edit from "@spectrum-icons/workflow/Edit";
import Delete from "@spectrum-icons/workflow/Delete";
import { useProvider } from "@adobe/react-spectrum";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast";
import { context } from '../context/ContextProvider';
import useAddData from '../hooks/useAddData';
import useUpdateData from '../hooks/useUpdateData';
import useDeleteData from '../hooks/useDeleteData';
import { URL } from "../helper/helper";



const Airports = () => {
  const [data, setData] = useState();

  const { details, setDetails, airports, setAirports } = useContext(context);
  const { loadsave, addData } = useAddData();
  const { loadUpdate, updateData } = useUpdateData();
  const { loadDelete,deleteId,deleteData } = useDeleteData();

  const navigate = useNavigate();
  
  console.log(deleteId);

    useEffect(() => {
      fetchData();
    }, []);
  
  const fetchData = async() => {
    try {
      const res = await axios.get(`${URL}/`);
      setAirports(res?.data);
      
    } catch (error) {
      toast.error(error.message);
    }
  }

    const handleEdit = (id) => {
      const filtered = airports.filter((data) => data._id == id);
      setDetails(...filtered);
    }

    const handleDelete = async(id) => {
      await deleteData(id);
  }
  
  const handleSave = async(close) => {
    await addData(close);
  }

  const handleUpdate = async (close) => {
    await updateData(close);
  }

    const handleSpecificAirport = (selectedKeys) => {
        console.log(selectedKeys);
        if (selectedKeys.size > 0) {
          const selectedId = Array.from(selectedKeys)[0];
            navigate(`/airports/${selectedId}`, {
                state: {
                  airports
              }
          });
        }
    }

  return (
    <div className="flex flex-col p-4 gap-7 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Airports</h1>
        <DialogTrigger>
          <Button
            variant="primary"
            staticColor="black"
            style="fill"
            UNSAFE_className="cursor-pointer"
          >
            +Add new{" "}
          </Button>
          {(close) => (
            <Dialog UNSAFE_className="px-5 py-4 ">
              <Content UNSAFE_className="flex flex-col">
                <TextField
                  label="Airport Name"
                  name="name"
                  onChange={(value) => {
                    setDetails({ ...details, name: value });
                  }}
                />
                <TextField
                  name="country"
                  label="Country"
                  onChange={(value) => {
                    setDetails({ ...details, country: value });
                  }}
                />
                <TextField
                  label="Code"
                  name="code"
                  onChange={(value) => {
                    setDetails({ ...details, code: value });
                  }}
                />
                <TextField
                  label="Terminals"
                  name="terminals"
                  onChange={(value) => {
                    setDetails({ ...details, terminals: Number(value) });
                  }}
                />
              </Content>
              <ButtonGroup>
                <Flex direction="row" alignItems="center">
                  <Button variant="primary" onPress={close}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onPress={() => handleSave(close)}
                  >
                    {loadsave ? <span className='loading loading-spinner'></span> : "save"}
                  </Button>
                </Flex>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
      </div>
      <div className=" flex w-full">
        <div className="grow w-[80%]">
          <TableView
            aria-label="Example table with static contents"
            selectionMode="multiple"
            onSelectionChange={handleSpecificAirport}
          >
            <TableHeader>
              <Column>All Airports</Column>
              <Column>Country</Column>
              <Column>Code</Column>
              <Column>Terminals</Column>
            </TableHeader>
            <TableBody items={data?.airports}>
              {airports.map((item) => {
                const { _id, name, country, code, terminals } = item;
                return (
                  <Row key={_id}>
                    <Cell>{name}</Cell>
                    <Cell>{country}</Cell>
                    <Cell>{code}</Cell>
                    <Cell>{terminals}</Cell>
                  </Row>
                );
              })}
            </TableBody>
          </TableView>
        </div>
        <div className="flex flex-col w-[20%] ml-0 mt-[3%] h-full">
          {airports.map((item) => {
            return (
              <div
                className="flex items-center justify-around h-10"
                key={item._id}
              >
                <View>
                  <DialogTrigger>
                    <ActionButton
                      onPress={() => handleEdit(item._id)}
                      UNSAFE_style={{
                        marginRight: "20px ",
                        borderWidth: "0px",
                        backgroundColor: "inherit",
                      }}
                    >
                      <Edit />
                    </ActionButton>
                    {(close) => (
                      <Dialog UNSAFE_className="px-5 py-4 ">
                        <Content UNSAFE_className="flex flex-col">
                          <TextField
                            label="Airport Name"
                            value={details.name}
                            name="name"
                            onChange={(value) => {
                              setDetails({ ...details, name: value });
                            }}
                          />
                          <TextField
                            name="country"
                            value={details.country}
                            label="Country"
                            onChange={(value) => {
                              setDetails({ ...details, country: value });
                            }}
                          />
                          <TextField
                            label="Code"
                            name="code"
                            value={details.code}
                            onChange={(value) => {
                              setDetails({ ...details, code: value });
                            }}
                          />
                          <TextField
                            label="Terminals"
                            name="terminals"
                            value={details.terminals}
                            onChange={(value) => {
                              setDetails({ ...details, terminals: Number(value) });
                            }}
                          />
                        </Content>
                        <ButtonGroup>
                          <Flex direction="row" alignItems="center">
                            <Button variant="primary" onPress={close}>
                              Cancel
                            </Button>
                            <Button
                              variant="primary"
                              onPress={() => handleUpdate(close)}
                            >
                              {loadUpdate ? (
                                <span className="loading loading-spinner"></span>
                              ) : (
                                "Update"
                              )}
                            </Button>
                          </Flex>
                        </ButtonGroup>
                      </Dialog>
                    )}
                  </DialogTrigger>
                  <ActionButton
                    onPress={() => handleDelete(item._id)}
                    UNSAFE_style={{
                      borderWidth: "0px",
                      backgroundColor: "inherit",
                    }}
                  >
                    {loadDelete && (deleteId==item._id) ? <span className='loading loading-spinner'></span> : <Delete />}
                  </ActionButton>
                </View>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Airports