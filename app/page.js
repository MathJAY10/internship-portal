// app/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

export default function HomePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', skills: '' });
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [interns, setInterns] = useState([]);
  const router = useRouter();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/intern', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success('Application submitted successfully!');
      setForm({ name: '', email: '', phone: '', skills: '' });
    } else {
      toast.error('Failed to submit application');
    }
  };

  const checkAdmin = async () => {
    if (password === 'admin123') {
      setAdminMode(true);
      const res = await fetch('/api/intern');
      const data = await res.json();
      setInterns(data);
    } else {
      toast.error('Wrong password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4 font-sans">
      <Toaster position="top-center" />

      <div className="mb-10 space-y-4">
    {/* Admin Button */}
    <div className="flex justify-end">
      <button
        onClick={() => setShowPrompt(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
      >
        Admin
      </button>
    </div>

    {/* Heading and Subheading */}
    <div className="text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-600 drop-shadow-lg mb-4 animate-pulse">
        Internship & Volunteer Portal
      </h1>
      <p className="text-lg text-blue-700 max-w-xl mx-auto">
        Start your career journey with hands-on projects, flexible timing, and a verified certificate.
      </p>
    </div>
  </div>

      {showPrompt && (
        <div className="mb-6 flex flex-wrap items-center gap-2 justify-center">
          <input
            type="password"
            className="border p-2 rounded w-60"
            placeholder="password: admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={checkAdmin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      )}

      {!adminMode && (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
            {[{
              title: 'Real Projects',
              desc: 'Work on actual industry-level problems to build experience.contributed to real world projects and problem solving'
            }, {
              title: 'Flexible Hours',
              desc: 'Choose your own schedule and learn at your own pace andd multiple feature at big scale.'
            }, {
              title: 'Certification',
              desc: 'Receive a verified certificate after completion. build real project and solve real world problem'
            }].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl shadow-xl bg-white hover:bg-blue-100 transition-all border border-blue-200 text-center"
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                <p className="text-sm text-blue-600">{item.desc}</p>
              </div>
            ))}
          </section>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-4 border border-blue-100"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-700">Apply as Intern/Volunteer</h2>
            {['name', 'email', 'phone', 'skills'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleInput}
                required
                className="w-full border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          {/* Reviews */}
          <section className="max-w-5xl mx-auto mt-20 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Intern Reviews</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {["Amazing experience! learn a lot from the opportunity ", "Loved the flexibility.Manage time with lot of ease", "Gained real-world skills.Work o real world probelm"].map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-all">
                  <p className="text-blue-700">“{review}”</p>
                  <p className="text-sm mt-2 text-blue-500">— Intern {idx + 1}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="max-w-4xl mx-auto mt-20 mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">FAQs</h2>
            <div className="space-y-4">
              {[{
                q: "How long is the internship?",
                a: "Internships typically last 4-8 weeks depending on the role."
              }, {
                q: "Is there any stipend?",
                a: "No, this is an unpaid opportunity focused on learning."
              }, {
                q: "Will I get a certificate?",
                a: "Yes, upon successful completion."
              }].map((item, i) => (
                <div key={i} className="bg-white p-4 border border-blue-100 rounded shadow-sm">
                  <h4 className="font-semibold text-blue-700">Q: {item.q}</h4>
                  <p className="text-blue-600">A: {item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-blue-600 py-6 border-t">
            © {new Date().getFullYear()} Intern Portal. All rights reserved.
          </footer>
        </>
      )}

      {adminMode && (
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-800">All Applicants</h2>
            <button
              onClick={() => setAdminMode(false)}
              className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
            >
              Back to Portal
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Skills</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => (
                  <tr key={intern.id} className="hover:bg-blue-50">
                    <td className="p-2 border text-center">{intern.name}</td>
                    <td className="p-2 border text-center">{intern.email}</td>
                    <td className="p-2 border text-center">{intern.phone}</td>
                    <td className="p-2 border text-center">{intern.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
