import React,{useContext,useState} from 'react'
import { context } from '../context/ContextProvider'
import { toast } from "react-hot-toast";
import axios from "axios";
import { URL } from "../helper/helper";

const useAddTerminal = () => {
    const [loadUpload, setLoadUpload] = useState(false);
    const {
      terminal,
      setTerminal,
      file,
      setFile,
      totalterminals,
      setTotalTerminals,
    } = useContext(context);

    const uploadData = async (close) => {
        try {
            setLoadUpload(true);
            const formData = new FormData();
            formData.append("title", terminal.title);
            formData.append("desc", terminal.description);
            formData.append("file", file);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };

            const res = await axios.post(`${URL}/add-terminal`, formData, config);
            setLoadUpload(false);
            setFile("");
            toast.success("Terminal created successfully 🥳");
            close();
            setTotalTerminals(res.data);
        } catch (error) {
            setLoadUpload(false);
          toast.error(error.message);
        }
    }
  return {uploadData,loadUpload}
}

export default useAddTerminal;