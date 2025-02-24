// Description: Footer component with school information
"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 bg-opacity-50 p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">
              New Generation High School
            </h3>
            <p>
              Empowering students to achieve academic excellence and personal
              growth.
            </p>
          </div>

          <div className="bg-gray-700 bg-opacity-50 p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <p>123 Education Avenue</p>
            <p>Learning City, LC 54321</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@newgenerationhs.edu</p>
          </div>

          <div className="bg-gray-700 bg-opacity-50 p-4 rounded">
            <h3 className="text-xl font-semibold mb-4">School Hours</h3>
            <p>Monday - Friday: 8:00 AM - 3:30 PM</p>
            <p>Office Hours: 7:30 AM - 4:30 PM</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p>
            &copy; {currentYear} New Generation High School. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
