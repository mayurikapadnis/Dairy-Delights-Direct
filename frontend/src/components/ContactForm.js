import React, { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // You can connect this to backend later
    alert("Message sent!");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <form className="bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
      <div className="flex space-x-4 mb-4">
        <input
          type="text" name="name" required
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="bg-gray-100 p-3 rounded w-1/2"
        />
        <input
          type="email" name="email" required placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="bg-gray-100 p-3 rounded w-1/2"
        />
      </div>
      <input
        type="text" name="subject" placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className="bg-gray-100 p-3 rounded w-full mb-4"
      />
      <textarea
        name="message" required placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        className="bg-gray-100 p-3 rounded w-full mb-4"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 w-full"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
