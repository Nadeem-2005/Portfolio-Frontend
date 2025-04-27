import React, { useState } from "react";
import axios from "axios";
import ShinyText from "./Animations/ShinyText/ShinyText";

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submission = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitted")
            const response = await axios.post('https://portfolio-backend-q1tq.onrender.com/send-mail', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={submission} className="rounded-lg shadow-lg max-w-md mx-auto space-y-6">
            <h2 className="text-2xl text-center text-white space-grotesk">Let's Connect</h2>

            <div className="flex flex-col space-y-2">
                <label className="text-white" htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-white" htmlFor="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-white" htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    id="phone"
                    className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-white" htmlFor="message">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    id="message"
                    rows="4"
                    className="p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                    required
                ></textarea>
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
                >

                    <ShinyText
                        text="Submit"
                        disabled={false}
                        speed={3}
                        className="text-3xl "
                    />

                </button>
            </div>
        </form>
    );
}

export default Form;