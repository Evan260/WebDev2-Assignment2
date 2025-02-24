// Description: Form component to add new students with improved styling
"use client";
import { useState } from "react";

export default function AddStudentForm({ addStudent }) {
  const initialFormState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    grade: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.firstName)) {
      newErrors.firstName =
        "First name should only contain letters, spaces, and hyphens";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z\s-]+$/.test(formData.lastName)) {
      newErrors.lastName =
        "Last name should only contain letters, spaces, and hyphens";
    }

    // Validate date of birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();

      // Check if date is valid
      if (isNaN(dob.getTime())) {
        newErrors.dateOfBirth = "Invalid date format";
      }
      // Check if student is at least 5 years old
      else if (today.getFullYear() - dob.getFullYear() < 5) {
        newErrors.dateOfBirth = "Student must be at least 5 years old";
      }
      // Check if student is not older than 19 years
      else if (today.getFullYear() - dob.getFullYear() > 19) {
        newErrors.dateOfBirth = "Student must not be older than 19 years";
      }
    }

    // Validate grade
    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    } else {
      const grade = parseInt(formData.grade);
      if (isNaN(grade) || grade < 9 || grade > 12) {
        newErrors.grade = "Grade must be between 9 and 12";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    // If no errors, add student
    if (Object.keys(formErrors).length === 0) {
      // Generate a unique ID for the new student
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
      };

      addStudent(newStudent);
      setSubmitted(true);

      // Reset form after submission
      setFormData(initialFormState);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {submitted && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded success-message">
          Student added successfully!
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-medium mb-2"
        >
          First Name: {/* Space added after the colon */}
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full p-2 border rounded form-input ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter first name"
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-medium mb-2"
        >
          Last Name: {/* Space added after the colon */}
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full p-2 border rounded form-input ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter last name"
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
      </div>

      <div className="mb-4">
        <label
          htmlFor="dateOfBirth"
          className="block text-gray-700 font-medium mb-2"
        >
          Date of Birth: {/* Space added after the colon */}
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`w-full p-2 border rounded form-input ${
            errors.dateOfBirth ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dateOfBirth && (
          <p className="error-message">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="grade" className="block text-gray-700 font-medium mb-2">
          Current Grade: {/* Space added after the colon */}
        </label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className={`w-full p-2 border rounded form-input ${
            errors.grade ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select grade</option>
          <option value="9">9th Grade (Freshman)</option>
          <option value="10">10th Grade (Sophomore)</option>
          <option value="11">11th Grade (Junior)</option>
          <option value="12">12th Grade (Senior)</option>
        </select>
        {errors.grade && <p className="error-message">{errors.grade}</p>}
      </div>

      <button type="submit" className="submit-button">
        Add Student
      </button>
    </form>
  );
}
