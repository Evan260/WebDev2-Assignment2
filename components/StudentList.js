// Description: Component to display the list of students with delete functionality
"use client";
import { useState } from "react";

export default function StudentList({ students, onDeleteStudent }) {
  const [sortField, setSortField] = useState("lastName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0;
    if (a[sortField] > b[sortField]) {
      comparison = 1;
    } else if (a[sortField] < b[sortField]) {
      comparison = -1;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Function to format date of birth
  const formatDOB = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate age based on date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handle delete button click
  const handleDeleteClick = (studentId) => {
    setShowConfirmDelete(studentId);
  };

  // Confirm deletion
  const confirmDelete = (studentId) => {
    onDeleteStudent(studentId);
    setShowConfirmDelete(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  return (
    <div className="overflow-x-auto dashboard-card bg-white p-4">
      <table className="min-w-full student-table">
        <thead>
          <tr>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("firstName")}
            >
              First Name{" "}
              <span
                className={`sort-icon ${
                  sortDirection === "asc" ? "asc" : "desc"
                }`}
              >
                {sortField === "firstName" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </span>
            </th>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("lastName")}
            >
              Last Name{" "}
              <span
                className={`sort-icon ${
                  sortDirection === "asc" ? "asc" : "desc"
                }`}
              >
                {sortField === "lastName" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </span>
            </th>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("dateOfBirth")}
            >
              Date of Birth{" "}
              <span
                className={`sort-icon ${
                  sortDirection === "asc" ? "asc" : "desc"
                }`}
              >
                {sortField === "dateOfBirth" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </span>
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("grade")}>
              Grade{" "}
              <span
                className={`sort-icon ${
                  sortDirection === "asc" ? "asc" : "desc"
                }`}
              >
                {sortField === "grade" && (sortDirection === "asc" ? "↑" : "↓")}
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr
              key={student.id}
              className={student.id % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>
                {formatDOB(student.dateOfBirth)} (
                {calculateAge(student.dateOfBirth)} years)
              </td>
              <td>{student.grade}</td>
              <td>
                {showConfirmDelete === student.id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => confirmDelete(student.id)}
                      className="delete-confirm-button"
                      aria-label="Confirm deletion"
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="delete-cancel-button"
                      aria-label="Cancel deletion"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteClick(student.id)}
                    className="delete-button"
                    aria-label="Delete student"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
