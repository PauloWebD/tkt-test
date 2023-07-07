import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessContext from '../BusinessContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Home.css';

export default function Home() {
  const businessData = useContext(BusinessContext);
  const [sector, setSector] = useState('');
  const [filteredBusinessData, setFilteredBusinessData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSector(event.target.value);
  };

  const handleItemClick = async (id, name, siren, results) => {
    const resultsString = JSON.stringify(results);
    try {
      navigate(`/graph/${id}/${name}/${siren}/${resultsString}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (businessData) {
      if (sector === '') {
        setFilteredBusinessData(businessData);
      } else {
        const filteredData = businessData.filter((data) => data.sector === sector);
        setFilteredBusinessData(filteredData);
      }
    }
  }, [businessData, sector]);

  if (!businessData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box sx={{ mWidth: 120 }}>
        <FormControl id="philter-sector" sx={{ mWidth: 120, myClass: true }}>
          <InputLabel>Sector</InputLabel>
          <Select
            labelId="philter-sector"
            id="select-sector"
            value={sector}
            label="Sector"
            onChange={handleChange}
          >
            <MenuItem value="Electronic">Electronic</MenuItem>
            <MenuItem value="Luxury">Luxury</MenuItem>
            <MenuItem value="Energy">Energy</MenuItem>
            <MenuItem value="Retail">Retail</MenuItem>
            <MenuItem value="Services">Services</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ul>
        <li className="list-header">
          <div>COMPANY</div>
          <div>N° SIREN</div>
          <div>CATEGORY</div>
        </li>
        {filteredBusinessData &&
          filteredBusinessData.slice(0, 500).map((data) => (
            <li
              className="list-company"
              key={data.id}
              onClick={() =>
                handleItemClick(data.id, data.name, data.siren, data.results)
              }
            >
              <div className="name">{data.name}</div>
              <div className="siren">{data.siren}</div>
              <div className="sector">
                <div className="button-sector">{data.sector}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
