import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete }) => {
    const tableRowVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
            },
        }),
        exit: { opacity: 0, x: -50 },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b bg-gray-50 font-medium">
                        <tr>
                            <th scope="col" className="px-6 py-4">First Name</th>
                            <th scope="col" className="px-6 py-4">Last Name</th>
                            <th scope="col" className="px-6 py-4">Email</th>
                            <th scope="col" className="px-6 py-4">Major</th>
                            <th scope="col" className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <motion.tbody>
                        <AnimatePresence>
                            {students.map((student, i) => (
                                <motion.tr
                                    key={student.id}
                                    variants={tableRowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={i}
                                    layout
                                    className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >
                                    <td className="whitespace-nowrap px-6 py-4">{student.firstName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{student.lastName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{student.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{student.major}</td>
                                    <td className="whitespace-nowrap px-6 py-4 flex justify-center space-x-4">
                                        <button onClick={() => onEdit(student)} className="text-blue-500 hover:text-blue-700">
                                            <Edit size={20} />
                                        </button>
                                        <button onClick={() => onDelete(student.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </motion.tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default StudentList;