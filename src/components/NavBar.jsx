import React, { useState } from "react";
import styles from "./NabBar.module.css";
import AddRestaurantModal from "./AddRestaurantModal";
import { useSnackbar } from "notistack";

const NavBar = ({ getRestaurantData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const snackbarOptions = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    variant: "success",
  };
  const saveRestaurant = (restaurantData) => {
    enqueueSnackbar("Restaurant data added successfully", snackbarOptions);
  };

  return (
    <div className={styles.navBar}>
      <button onClick={openModal}>Add New Restaurant</button>
      <AddRestaurantModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveRestaurant}
        getRestaurantData={getRestaurantData}
      />
    </div>
  );
};

export default NavBar;
