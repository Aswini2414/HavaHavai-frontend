import React,{useState,useContext,useEffect} from 'react'
import { View, Flex, Heading, Button, Grid, ActionButton, Text, DialogTrigger, Dialog,TextField,FileTrigger,Divider,Content,ButtonGroup } from '@adobe/react-spectrum';
import TerminalCard from './TerminalCard';
import {context} from "../context/ContextProvider"
import { FaAutoprefixer } from 'react-icons/fa6';
import useAddTerminal from '../hooks/useAddTerminal';
import axios from "axios";
import { URL } from "../helper/helper";


const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { terminal,
    setTerminal,
    file,
    setFile,totalterminals,setTotalTerminals } = useContext(context);
  
  const { uploadData,loadUpload } = useAddTerminal();

  const handleUpload = async (close) => {
    await uploadData(close);
  }

  useEffect(() => {
    fetchTerminals();
  },[])

  const fetchTerminals = async () => {
    try {
      const res = await axios.get(`${URL}/all-terminals`);
      setTotalTerminals(res.data);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <View marginTop="size-300">
      <Flex gap="size-200" wrap alignItems="center">
        {totalterminals.map((terminal) => {
          const { title, desc, image } = terminal;
          return (
            <div key={terminal._id}>
              <TerminalCard title={title} description={desc} image={image} />
            </div>
          );
        })}
        <DialogTrigger>
          <Button variant="primary">+Add Terminal</Button>
          {(close) => (
            <Dialog UNSAFE_className="px-5 py-4 ">
              <Heading>
                <TextField
                  defaultValue="Terminal title"
                  UNSAFE_className="custom-input"
                  aria-label="Terminal title"
                  onChange={(value) =>
                    setTerminal({ ...terminal, title: value })
                  }
                />
                <Divider />
              </Heading>
              <Content>
                <TextField
                  defaultValue="Description"
                  UNSAFE_className="custom-input"
                  aria-label="Description"
                  onChange={(value) =>
                    setTerminal({ ...terminal, description: value })
                  }
                />
              </Content>
              <ButtonGroup UNSAFE_className="flex w-full justify-between">
                <Flex direction="row" alignItems="center" flexGrow={1}>
                  <FileTrigger
                    allowsMultiple
                    UNSAFE_className="upload-btn mr-10"
                    onSelect={(e) => setFile(e[0])}
                  >
                    <Button variant="primary">Upload Image</Button>
                    {file && file.name}
                  </FileTrigger>
                </Flex>
                <Flex direction="row" alignItems="center" gap="size-100">
                  <Button variant="primary" onPress={close}>
                    Cancel
                  </Button>
                  <Button variant="primary" onPress={() => handleUpload(close)}>
                    {loadUpload ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </Flex>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
      </Flex>
    </View>
  );
}

export default Terminal