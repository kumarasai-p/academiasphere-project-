import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import studentApi from './services/studentApi'; // Import the API service
import { Users, LayoutDashboard } from 'lucide-react';

const App = () => {
  // State for the list of students and the form inputs
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    major: '',
  });

  // --- 1. FETCH DATA FROM BACKEND ---
  // useEffect now calls the API when the component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentApi.getAll();
      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to fetch students from the server.');
    }
  };

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 2. SUBMIT DATA TO BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.major) {
      toast.error('Please fill out all fields.');
      return;
    }
    try {
      await studentApi.create(formData); // Call the API to create a student
      toast.success('Student added successfully!');
      fetchStudents(); // Refresh the list from the server
      setFormData({ firstName: '', lastName: '', email: '', major: '' }); // Clear form
    } catch (error) {
      toast.error('Failed to add student.');
    }
  };

  // --- 3. DELETE DATA FROM BACKEND ---
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentApi.remove(id); // Call the API to delete a student
        toast.success('Student deleted successfully!');
        fetchStudents(); // Refresh the list from the server
      } catch (error) {
        toast.error('Failed to delete student.');
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Toaster position="top-center" />
      <div className="container mx-auto p-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-cyan-400 tracking-wider flex items-center justify-center gap-4">
            <LayoutDashboard size={48} /> AcademiaSphere
          </h1>
        </header>

        <main className="max-w-4xl mx-auto">
          {/* Form Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Add New Student</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Student Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <input
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleChange}
                className="p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                className="sm:col-span-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Add Student
              </button>
            </form>
          </div>

          {/* Student List Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
              <Users /> Student List
            </h2>
            <div className="space-y-4">
              {students.length > 0 ? (
                students.map((student) => (
                  <div key={student.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                    <div>
                      <p className="font-bold text-lg">{student.firstName} {student.lastName}</p>
                      <p className="text-gray-400">{student.email} - ({student.major})</p>
                    </div>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No students found. Add one above!</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;