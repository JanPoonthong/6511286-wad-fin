"use client";
import { useEffect, useState } from "react";
import styles from "./CustomerDetail.module.css"; // Import the CSS module

const CustomerDetail = ({ params }) => {
  const { id } = params;
  const [customer, setCustomer] = useState(null);

  // Fetch customer data when the `id` is available
  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const response = await fetch(`/api/customer/${id}`);
          if (response.ok) {
            const data = await response.json();
            setCustomer(data);
          } else {
            console.error("Error fetching customer details");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchCustomer();
    }
  }, [id]); // Runs the effect when `id` changes

  if (!customer) {
    return <div className={styles.loading}>Loading customer details...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Details</h1>
      <p className={styles.text}>
        <strong className={styles.label}>Name:</strong> {customer.name}
      </p>
      <p className={styles.text}>
        <strong className={styles.label}>Date of Birth:</strong>{" "}
        {customer.date_of_birth}
      </p>
      <p className={styles.text}>
        <strong className={styles.label}>Member Number:</strong>{" "}
        {customer.member_number}
      </p>
      <p className={styles.text}>
        <strong className={styles.label}>Interests:</strong>{" "}
        {customer.interests}
      </p>
    </div>
  );
};

export default CustomerDetail;
