import Customer from "@/models/Customer";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    // await connectToDB(); // Ensure the database is connected
    const customers = await Customer.findById(id); // Get all customers
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error fetching customers" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    // await connectToDB(); // Ensure the database is connected
    const { id } = params;

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return new Response(JSON.stringify({ error: "Customer not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Customer deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting customer" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    // await connectToDB(); // Ensure the database is connected
    const { id } = params;
    const { name, date_of_birth, member_number, interests } = await req.json();

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { name, date_of_birth, member_number, interests },
      { new: true },
    );

    if (!updatedCustomer) {
      return new Response(JSON.stringify({ error: "Customer not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating customer" }), {
      status: 500,
    });
  }
}
