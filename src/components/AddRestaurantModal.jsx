import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./AddRestaurantModal.module.css";
import axios from "axios";
Modal.setAppElement("#root");

const AddRestaurantModal = ({
  isOpen,
  onClose,
  onSave,
  getRestaurantData,
  users,
}) => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    address: "",
    contact: "",
    imageLink: "",
    userId: "",
  });
  const [selectedUser, setSelectedUser] = useState("Select a User");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const user = users.find((user) => user._id === value);
    if(user){

      setSelectedUser(user?.name);
    }
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleSubmit = () => {
    const apiUrl =
      "https://restaurant-listing-api-production.up.railway.app/api/v1/restaurant";

    axios
      .post(apiUrl, restaurantData)
      .then((response) => {
        console.log("Restaurant data added:", response.data);

        getRestaurantData();
        onSave(restaurantData);
        setRestaurantData({
          name: "",
          address: "",
          contact: "",
          imageLink: "",
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Restaurant"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Add New Restaurant</h2>
      <div className={styles.form}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={restaurantData.name}
          onChange={handleInputChange}
        />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={restaurantData.cuisine}
          onChange={handleInputChange}
        />
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={restaurantData.location}
          onChange={handleInputChange}
        />
        <label>Image:</label>
        <input
          type="text"
          name="imageLink"
          value={restaurantData.rating}
          onChange={handleInputChange}
        />
        <label>User:</label>
        <select
          name="userId"
          value={(event) => {
            setSelectedUser(event.target.value);
          }}
          onChange={handleInputChange}
        >
          <option value="">{selectedUser}</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default AddRestaurantModal;
