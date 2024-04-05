import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react"
//Mock Data CHANGE TO REAL DATA!!!
//import { mockDataContacts } from "../../data/mockData";

import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Profession = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [profession, setProfession] = useState({});
  //const [profession, setProfession] = useState('basedatos'); // Valor inicial de profession


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
      headerAlign: "left",
      align: "left",
    },
    {
      field: "users_id",
      headerName: "Users ID",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
    },
  ];

  useEffect( () => {
    if (Object.keys(profession).length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3050/api/services/${profession}`);
          console.log(profession);
          const data = await response.json();
          console.log("Fetched data: ", data);
          // Asignamos una propiedad 'id' única a cada fila
        const rowsWithIds = data.data.data.profession.map((row, index) => ({
          ...row,
          id: index + 1, // Usamos un identificador único adecuado aquí
        }));
          setProfession(rowsWithIds);
        } catch (error) {
          console.log("Error: ", error)
        }
      };
      fetchData();
    };
  }, [profession]); // Dependencia en profession para que se ejecute cuando cambie

  // Función para cambiar el valor de profession
  const handleProfessionChange = (newProfession) => {
    setProfession(newProfession);
};

const rowsWithIds = profession.data ? profession.data.data.profession.map((row, index) => ({
  ...row,
  id: index + 1,
})) : [];


  return (
    <Box m="20px">
      <Header
        title="Professions"
        subtitle="List of the professions"
      />

      {/* Aquí podrías tener un selector o botones para cambiar el valor de profession */}
      <button onClick={() => handleProfessionChange('basedatos')}>Base de datos</button>
      <button onClick={() => handleProfessionChange('backend')}>Backend</button>
      <button onClick={() => handleProfessionChange('frontend')}>Frontend</button>


      {profession.length > 0 ? (
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
            rows={rowsWithIds}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      ) : (
        <div>No data available</div>
    )}
    </Box>
  );
};

export default Profession;