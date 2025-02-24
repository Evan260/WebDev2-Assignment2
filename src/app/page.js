// Description: Main page component with delete student functionality
"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import StudentList from "../../components/StudentList";
import AddStudentForm from "../../components/AddStudentForm";
import Footer from "../../components/Footer";
import studentsData from "../../data/students.json";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    // Load initial student data
    setStudents(studentsData);
    setIsLoaded(true);
  }, []);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (studentId) => {
    const studentToDelete = students.find(
      (student) => student.id === studentId
    );
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);

    // Show delete confirmation message
    setDeleteMessage(
      `${studentToDelete.firstName} ${studentToDelete.lastName} has been removed.`
    );

    // Hide the message after 3 seconds
    setTimeout(() => {
      setDeleteMessage(null);
    }, 3000);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 page-title">Student Portal</h1>

        {deleteMessage && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded success-message">
            {deleteMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 page-title">
              Student List
            </h2>
            <StudentList students={students} onDeleteStudent={deleteStudent} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 page-title">
              Add New Student
            </h2>
            <AddStudentForm addStudent={addStudent} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
