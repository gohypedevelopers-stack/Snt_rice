import { SectionHeading } from "@/components/SectionHeading";

const tickets = [
  { phone: "+91 98765 43210", category: "Login", message: "Cannot access dashboard", status: "pending" },
  { phone: "+91 98111 22334", category: "Reward", message: "Gift image not loading", status: "resolved" },
  { phone: "+91 99012 44775", category: "Submission", message: "Invoice rejected unexpectedly", status: "pending" }
];

export default function AdminSupportPage() {
  return (
    <>
      <section className="admin-toolbar">
        <div>
          <h1 className="admin-toolbar__title">Support</h1>
          <p className="admin-toolbar__copy">
            Keep retailer questions visible, triaged, and resolved without losing the context around the campaign.
          </p>
        </div>
        <div className="admin-toolbar__actions">
          <span className="badge badge--gold">3 tickets</span>
          <span className="badge">Pending + resolved</span>
        </div>
      </section>

      <section className="admin-grid">
        <article className="admin-panel">
          <SectionHeading
            eyebrow="Queue"
            title="Support tickets"
            description="The ticket list should be quick to scan and easy to action."
          />

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={`${ticket.phone}-${ticket.category}`}>
                    <td>{ticket.phone}</td>
                    <td>{ticket.category}</td>
                    <td>{ticket.message}</td>
                    <td>
                      <span className={`status status--${ticket.status}`}>{ticket.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="admin-panel">
          <SectionHeading
            eyebrow="Workflow"
            title="Resolution flow"
            description="The support queue is small in this mock, but the layout scales to real operator use."
          />

          <div className="list-stack">
            <div className="list-item">
              <div className="list-item__top">
                <h3 className="list-item__title">Open ticket</h3>
                <span className="badge badge--soft">Review</span>
              </div>
              <p className="list-item__text">Read the message and decide whether it belongs to login, reward, or submission.</p>
            </div>
            <div className="list-item">
              <div className="list-item__top">
                <h3 className="list-item__title">Resolve or escalate</h3>
                <span className="badge badge--soft">Action</span>
              </div>
              <p className="list-item__text">Mark the ticket resolved once the retailer has a clear answer.</p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
