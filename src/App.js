import { Box } from "@mui/material";
import RestaurantCard from "./components/Card";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [restaurant, setRestaurant] = useState([]);
  const [users, setUsers] = useState([]);

  const getRestaurantData = async () => {
    try {
      const apiUrl =
        "https://restaurant-listing-api-production.up.railway.app/api/v1/restaurant";
      const resp = await axios.get(apiUrl);
      setRestaurant(resp.data.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getRestaurantData();
  }, []);

  const getUsers = async () => {
    try {
      const apiUrl =
        "https://restaurant-listing-api-production.up.railway.app/api/v1/user";
      const resp = await axios.get(apiUrl);
      setUsers(resp.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <NavBar getRestaurantData={getRestaurantData} users={users} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "50px",
          marginBottom: "10px",
          marginLeft: "60px",
          marginRight: "60px",
        }}
      >
        {restaurant.map((card) => (
          <RestaurantCard
            key={card._id}
            id={card._id}
            imageLink={card.imageLink}
            name={card.name}
            address={card.address}
            addedBy={card.addedBy}
            restaurantData={card}
            getRestaurantData={getRestaurantData}
            users={users}
          />
        ))}
      </Box>
    </div>
  );
}

export default App;
