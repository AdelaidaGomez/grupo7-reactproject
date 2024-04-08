import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from 'react';

//Mock Data CHANGE TO REAL DATA!!!
//import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Services = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [services, setServices] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
        {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "detailURL",
      headerName: "URL",
      flex: 1,
    }
  
  ];

  useEffect( () => {
    console.log('Afuera del fectdata')
    const fetchData = async () => {
      console.log('Adentro del fectdata')
      try {
        const response = await fetch(`http://localhost:3050/api/services`);
        const data = await response.json();
        console.log('datos usuarios');
        console.log(data.data.services);
        setServices(data.data.services);
      } catch (error) {
        console.log("Error: ", error)
      }
    };
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Services"
        subtitle="List of the services"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={services}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Services;