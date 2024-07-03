import React, { useContext, useState } from "react";
import { context } from "../context/ContextProvider";
import { toast } from "react-hot-toast";
import axios from "axios";
import { URL } from "../helper/helper";

const useAddServices = () => {
  const [loadService, setLoadService] = useState(false);
  const { servicedetails } = useContext(context);

  const addServices = async () => {
    try {
      if (
        servicedetails.name &&
        servicedetails.category &&
        servicedetails.subcategory &&
        servicedetails.file &&
        servicedetails.desc
      ) {
        const formData = new FormData();
        setLoadService(true);
        formData.append("name", servicedetails.name);
        formData.append("category", servicedetails.category);
        formData.append("subcategory", servicedetails.subcategory);
        formData.append("file", servicedetails.file);
        formData.append("desc", servicedetails.desc);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const res = await axios.post(`${URL}/add-service`, formData, config);
        setLoadService(false);
        toast.success("Lost & found saved successfully 💥");
      } else {
        toast.error("Please enter all the details");
        setLoadService(false);
      }
    } catch (error) {
      setLoadService(false);
      toast.error(error.message);
    }
  };
  return { addServices, loadService };
};

export default useAddServices;
