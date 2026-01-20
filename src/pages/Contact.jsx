import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    // Normally, here you'd call an API endpoint to send the message
    console.log("Contact form submitted:", formData);
    toast.success("Message sent successfully!");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <p className="text-center text-muted-foreground mb-8">
          Have a question or need support? Fill out the form below and we'll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your message..."
              rows={5}
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>

        <div className="mt-8 text-center text-muted-foreground">
          <p>Email: support@nepalshop.com</p>
          <p>Phone: +977 9805104098</p>
          <p>Address: Kathmandu, Nepal</p>
        </div>
      </div>
    </div>
  );
}
