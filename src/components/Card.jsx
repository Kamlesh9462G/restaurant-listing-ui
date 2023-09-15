import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UpdateRestaurantModal from "./UpdateRestaurantModal";
import axios from "axios";

const RestaurantCard = ({
  id,
  imageLink,
  name,
  address,
  restaurantData,
  getRestaurantData,
}) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});

  console.log("******", selectedRestaurant);

  const openUpdateModal = () => {
    setSelectedRestaurant(restaurantData);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedRestaurant({});
    setUpdateModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        console.log(id);
        try {
          const apiUrl = `https://restaurant-listing-api-production.up.railway.app/api/v1/restaurant/${id}`;
          await axios.delete(apiUrl);
          getRestaurantData();
        } catch (error) {
          console.error("Error:", error);
        }
      } catch (error) {}
    }
  };

  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  return (
    <div>
      <Card sx={{ minHeight: 200, maxHeight: 400 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imageLink}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {truncateString(name, 10)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={openUpdateModal}>
            Update
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <UpdateRestaurantModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        selectedRestaurant={selectedRestaurant}
        getRestaurantData={getRestaurantData}
      />
    </div>
  );
};

export default RestaurantCard;
