import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

     // Datos total Usuario y Llamado de Api users 
    const [totalUsers, setTotalUsers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3050/api/users/count");
                const data = await response.json();
                setTotalUsers(data.total_users);
            } catch (error) {
                console.log("Error: ", error)
            }
        };
        fetchData();
    }, []);

    // Datos total servicios y Llamado de Api services

    const [totalServices, setTotalServices] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3050/api/services/count");
                const data = await response.json();
                setTotalServices(data.total_Services);
            } catch (error) {
                console.log("Error: ", error)
            }
        };
        fetchData();
    }, []);

    // Datos total professions y Llamado de Api professions Base de Datos
     const [totalBaseDatos, setTotalBaseDatos] = useState(null);

     useEffect(() => {
         const fetchData = async () => {
             try {
                 const response = await fetch(`http://localhost:3050/api/services/basedatos`);
                 const data = await response.json();
                 setTotalBaseDatos(data.length);
             } catch (error) {
                 console.log("Error: ", error)
             }
         };
         fetchData();
     }, []);

      // Datos total professions y Llamado de Api professions Frontend
      const [totalFrontend, setTotalFrontend] = useState(null);

      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await fetch(`http://localhost:3050/api/services/Frontend`);
                  const data = await response.json();
                  setTotalFrontend(data.length);
              } catch (error) {
                  console.log("Error: ", error)
              }
          };
          fetchData();
      }, []);

      // Datos total professions y Llamado de Api professions Backend
      const [totalBackend, setTotalBackend] = useState(null);

      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await fetch(`http://localhost:3050/api/services/Backend`);
                  const data = await response.json();
                  setTotalBackend(data.length);
              } catch (error) {
                  console.log("Error: ", error)
              }
          };
          fetchData();
      }, []);

    return (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
        </Box>
  
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
  
          {/* Services total */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title= {totalServices !== null ? totalServices : 'Cargando...'}
              subtitle="Services Total"
              progress="0.75"
              increase="+14%"
              icon={
                <ContactsOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          {/* Users total */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title= {totalUsers !== null ? totalUsers : 'Cargando...'}
              subtitle="Users Total"
              progress="0.50"
              increase="+21%"
              icon={
                <PeopleOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          {/* Categories total */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalBaseDatos !== null ? totalBaseDatos : 'Cargando...'}
              subtitle="Base de Datos"
              progress="0.30"
              increase="+5%"
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />

<StatBox
              title={totalFrontend !== null ? totalFrontend : 'Cargando...'}
              subtitle="Frontend"
              progress="0.10"
              increase="+2%"
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />

 <StatBox
              title={totalBackend !== null ? totalBackend : 'Cargando...'}
              subtitle="Backend"
              progress="0.05"
              increase="+0,5%"
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            /> 
          </Box>
  
  
          {/* ROW 2 */}
          {/* panel de listado de todos los productos */} 
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Profession
              </Typography>
            </Box>
            {/* Aca para simular la data hice un mapeo, se puede hacer el mismo mapeo pero en vez de llamar transacciones se llama a las categorias y se pone el total de servicios que tiene cada categoria */}
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>
          {/* panel de XXX */} 
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Las User Created
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
  
                INFORMACION DEL ULTIMO USUARIO CREADO, Para cada linea de codigo se puede hacer como esta abajo 
              <Typography>Includes extra misc expenditures and costs</Typography>
  
            </Box>
          </Box>
  
           
  
          {/* ROW 3 */}
           {/* panel de listado de todos los productos */} 
          <Box
            gridColumn="span 12"
            gridRow="span 4"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Services
              </Typography>
            </Box>
            {/* Aca para simular la data hice un mapeo, se puede hacer el mismo mapeo pero en vez de llamar transacciones se llama a los servicios y informacion de cada uno de los servicios */}
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>
          
        </Box>
      </Box>
    );
  };

  export default Dashboard;