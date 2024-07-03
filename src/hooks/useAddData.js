import React, { useContext,useState } from 'react';
import { context } from '../context/ContextProvider';
import { toast } from "react-hot-toast";
import axios from "axios";
import {URL} from "../helper/helper"

const useAddData = () => {
    const [loadsave, setLoadSave] = useState(false);

    const { details, setDetails, airports, setAirports } = useContext(context);
    
    const addData = async (close) => {
    try {
      if (
        details.name &&
        details.country &&
        details.code &&
        details.terminals
      ) {
          if (typeof details.terminals == "number") {
              setLoadSave(true);
              const res = await axios.post(`${URL}/save`, details);
              setLoadSave(false);
          toast.success("Airport added successfully 🥳");
          setAirports(res?.data);
          close();
          } else {
              setLoadSave(false);
          toast.error("Terminals must be a number");
        }
      } else {
          setLoadSave(false);
        toast.error("Please add all the details");
      }
    } catch (error) {
        setLoadSave(false);
      toast.error(error.message);
    }
}

  return {loadsave,addData}
}

export default useAddData;