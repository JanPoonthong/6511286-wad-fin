import Customer from "@/models/Customer";

export async function GET() {
  try {
    // await connectToDB(); // Ensure the database is connected
    const customers = await Customer.find(); // Get all customers
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching customers" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    // await connectToDB(); // Ensure the database is connected
    const { name, date_of_birth, member_number, interests } = await req.json();

    const newCustomer = new Customer({
      name,
      date_of_birth,
      member_number,
      interests,
    });

    await newCustomer.save();
    return new Response(JSON.stringify(newCustomer), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating customer" }), {
      status: 500,
    });
  }
}
