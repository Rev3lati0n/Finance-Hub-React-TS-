import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

type Invoice = {
  id: string;
  client: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending";
  dueDate: string;
};

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem("financehub-invoices");
    return saved ? JSON.parse(saved) : [];
  });

  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  function saveInvoices(list: Invoice[]) {
    setInvoices(list);
    localStorage.setItem(
      "financehub-invoices",
      JSON.stringify(list)
    );
  }

  function clearForm() {
    setClient("");
    setDescription("");
    setAmount("");
    setDueDate("");
  }

  function addInvoice() {
    if (!client || !description || !amount || !dueDate) {
      toast.error("Please complete every field.");
      return;
    }

    const invoice: Invoice = {
      id: Date.now().toString(),
      client,
      description,
      amount: Number(amount),
      dueDate,
      status: "Pending",
    };

    saveInvoices([...invoices, invoice]);

    toast.success("Invoice created!");
    clearForm();
  }

  function deleteInvoice(id: string) {
    if (
      !window.confirm(
        "Are you sure you want to delete this invoice?"
      )
    ) {
      return;
    }

    saveInvoices(
      invoices.filter((invoice) => invoice.id !== id)
    );

    toast.success("Invoice deleted!");
  }

  function toggleStatus(id: string) {
    saveInvoices(
      invoices.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              status:
                invoice.status === "Paid"
                  ? "Pending"
                  : "Paid",
            }
          : invoice
      )
    );

    toast.success("Invoice updated!");
  }

  const totalValue = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  const paid = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const pending = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  return (
    <Layout>

      <h1>🧾 Invoices</h1>

      <div className="summary-grid">

        <div className="summary-card">
          <h3>Total Invoices</h3>
          <h2>{invoices.length}</h2>
        </div>

        <div className="summary-card">
          <h3>Paid</h3>
          <h2>{paid}</h2>
        </div>

        <div className="summary-card">
          <h3>Pending</h3>
          <h2>{pending}</h2>
        </div>

        <div className="summary-card">
          <h3>Total Value</h3>
          <h2>${totalValue.toFixed(2)}</h2>
        </div>

      </div>

      <div className="expense-form">

        <input
          placeholder="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={addInvoice}
        >
          ➕ Create Invoice
        </button>

      </div>

      <div className="expense-table">

        {invoices.length === 0 ? (
          <p>No invoices yet.</p>
        ) : (
          <table>

            <thead>

              <tr>
                <th>Client</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {invoices.map((invoice) => (

                <tr key={invoice.id}>

                  <td>{invoice.client}</td>

                  <td>{invoice.description}</td>

                  <td>
                    ${invoice.amount.toFixed(2)}
                  </td>

                  <td>{invoice.dueDate}</td>

                  <td>{invoice.status}</td>

                  <td>

                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        toggleStatus(invoice.id)
                      }
                    >
                      🔄 Status
                    </button>

                    <button
                      className="action-btn delete-btn"
                      onClick={() =>
                        deleteInvoice(invoice.id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </Layout>
  );
}