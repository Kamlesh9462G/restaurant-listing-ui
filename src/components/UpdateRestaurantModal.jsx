import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./UpdateRestaurantModal.module.css";
import axios from "axios";

Modal.setAppElement("#root");

const UpdateRestaurantModal = ({
  isOpen,
  onClose,
  onUpdate,
  selectedRestaurant,
  getRestaurantData,
}) => {
  const [updatedData, setUpdatedData] = useState({});
  console.log("+++++++++", selectedRestaurant);
  useEffect(() => {
    if (selectedRestaurant) {
      setUpdatedData(selectedRestaurant);
    }
  }, [selectedRestaurant]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedDataa = {
      name: updatedData?.name,
      address: updatedData?.address,
      contact: updatedData?.contact,
      imageLink: updatedData?.imageLink,
    };
    try {
      const apiUrl = `https://restaurant-listing-api-production.up.railway.app/api/v1/restaurant/${updatedData._id}`;
      const res = await axios.put(apiUrl, updatedDataa);
      console.log("Restaurant data updated:", res.data);
      getRestaurantData();
      onUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Restaurant"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Update Restaurant</h2>
      <div className={styles.form}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedData?.name || ""}
          onChange={handleInputChange}
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={updatedData?.address || ""}
          onChange={handleInputChange}
        />
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={updatedData?.contact || ""}
          onChange={handleInputChange}
        />
        <label>Image:</label>
        <input
          type="text"
          name="imageLink"
          value={updatedData?.imageLink || ""}
          onChange={handleInputChange}
        />
      </div>
      <button
        onClick={() => {
          handleSubmit();
          onClose();
        }}
      >
        Update
      </button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default UpdateRestaurantModal;
