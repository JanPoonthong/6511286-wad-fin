"use client";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css"; // Assuming you're using a CSS module
import Link from "next/link";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    date_of_birth: "",
    member_number: "",
    interests: "",
  });
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Fetch all customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/customer");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error("Error fetching customers");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new customer
  const createCustomer = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      if (response.ok) {
        const newCustomer = await response.json();
        setCustomers([...customers, newCustomer]);
        setNewCustomer({
          name: "",
          date_of_birth: "",
          member_number: "",
          interests: "",
        }); // Reset form
      } else {
        console.error("Error creating customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Delete a customer
  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/customer/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCustomers(customers.filter((customer) => customer._id !== id));
      } else {
        console.error("Error deleting customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update a customer
  const updateCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/customer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCustomer),
      });
      if (response.ok) {
        const updatedCustomer = await response.json();
        setCustomers(
          customers.map((customer) =>
            customer._id === id ? updatedCustomer : customer,
          ),
        );
        setEditingCustomer(null); // Clear editing state
      } else {
        console.error("Error updating customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Set customer to edit
  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Customers</h1>

      {/* Create Customer Form */}
      <div className={styles.formContainer}>
        <h2>Create Customer</h2>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="date"
          name="date_of_birth"
          placeholder="Date of Birth"
          value={newCustomer.date_of_birth}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="number"
          name="member_number"
          placeholder="Member Number"
          value={newCustomer.member_number}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests"
          value={newCustomer.interests}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={createCustomer} className={styles.button}>
          Create Customer
        </button>
      </div>

      {/* Update Customer Form */}
      {editingCustomer && (
        <div className={styles.formContainer}>
          <h2>Edit Customer</h2>
          <input
            type="text"
            name="name"
            value={editingCustomer.name}
            onChange={(e) =>
              setEditingCustomer({ ...editingCustomer, name: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="date"
            name="date_of_birth"
            value={editingCustomer.date_of_birth}
            onChange={(e) =>
              setEditingCustomer({
                ...editingCustomer,
                date_of_birth: e.target.value,
              })
            }
            className={styles.input}
          />
          <input
            type="number"
            name="member_number"
            value={editingCustomer.member_number}
            onChange={(e) =>
              setEditingCustomer({
                ...editingCustomer,
                member_number: e.target.value,
              })
            }
            className={styles.input}
          />
          <input
            type="text"
            name="interests"
            value={editingCustomer.interests}
            onChange={(e) =>
              setEditingCustomer({
                ...editingCustomer,
                interests: e.target.value,
              })
            }
            className={styles.input}
          />
          <button
            onClick={() => updateCustomer(editingCustomer._id)}
            className={styles.button}
          >
            Update Customer
          </button>
        </div>
      )}

      {/* Customer List */}
      <h2>Customer List</h2>
      <ul className={styles.customerList}>
        {customers.map((customer) => (
          <li key={customer._id} className={styles.customerItem}>
            <Link href={`/customer/${customer._id}`}>
              {customer.name} - {customer.member_number} - {customer.interests}{" "}
            </Link>{" "}
            <button
              onClick={() => handleEditClick(customer)}
              className={styles.editButton}
            >
              Edit
            </button>{" "}
            <button
              onClick={() => deleteCustomer(customer._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
