import React, { useEffect, useState } from "react";

const ContactDetail = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/contact`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();

    // Optional: Poll every 10 seconds
    const interval = setInterval(() => {
      fetchContacts();
    }, 10000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Contact Messages
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-purple-700">
                  {contact.name}
                </h3>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="mt-3 text-gray-700 text-sm">
                  {contact.message.length > 120
                    ? contact.message.slice(0, 120) + "..."
                    : contact.message}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(contact.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactDetail;
