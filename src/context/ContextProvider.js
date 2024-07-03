import React,{createContext,useState} from 'react'


export const context = createContext(null);

const ContextProvider = ({ children }) => {
    const [details, setDetails] = useState({
      name: "",
      country: "",
      code: "",
      terminals: 0,
    });
    const [airports, setAirports] = useState([]);
    const [terminal, setTerminal] = useState({
        title: "",
        description: "",
    })
  const [file, setFile] = useState("");
  const [totalterminals, setTotalTerminals] = useState([]);
  const [servicedetails, setServiceDetails] = useState({
    name: "",
    category: "",
    subcategory: "",
    file: "",
    desc:""
  })

  return (
    <context.Provider
      value={{
        details,
        setDetails,
        airports,
        setAirports,
        terminal,
        setTerminal,
        file,
        setFile,
        totalterminals,
        setTotalTerminals,
        servicedetails,
        setServiceDetails,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default ContextProvider