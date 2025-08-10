import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  const downloadPrescription = (patientName, medicineName) => {
    alert(`Downloading prescription PDF for ${patientName} - ${medicineName}. In a real application, this would generate and download a PDF file.`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Mobile menu overlay */}
      <div id="mobile-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className="fixed left-0 top-0 h-full w-64 bg-sidebar dark:bg-gray-800 text-white transform -translate-x-full lg:translate-x-0 transition-all duration-300 ease-in-out z-50"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-user-md text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-bold">MedConnect</h1>
          </div>

          <nav className="space-y-2">
            <a href="#" data-page="home" className="nav-link flex items-center space-x-3 p-3 rounded-lg bg-primary/20 text-green-200">
              <i className="fas fa-home w-5"></i>
              <span>Home</span>
            </a>
            <a href="#" data-page="patients" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-users w-5"></i>
              <span>My Patients</span>
            </a>
            <a href="#" data-page="appointments" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-calendar-check w-5"></i>
              <span>Appointments</span>
            </a>
            <a href="#" data-page="prescriptions" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-prescription-bottle w-5"></i>
              <span>Prescriptions</span>
            </a>
            <a href="#" data-page="analytics" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-chart-line w-5"></i>
              <span>Health Analytics</span>
            </a>
            <a href="#" data-page="account" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-user-cog w-5"></i>
              <span>Profile</span>
            </a>
            <a href="#" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-cog w-5"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <button id="mobile-menu-btn" className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-bars text-gray-600 dark:text-gray-300"></i>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Doctor Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
              </div>

              {/* Theme Toggle */}
              <button id="theme-toggle" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i id="theme-icon" className="fas fa-moon text-gray-600 dark:text-gray-300"></i>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i className="fas fa-bell text-gray-600 dark:text-gray-300"></i>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">Dr. Michael Chen</span>
                <i className="fas fa-chevron-down text-gray-400 dark:text-gray-500 text-xs"></i>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-6">
          {/* Home Page */}
          <div id="home-page" className="page-content space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Dashboard</span>
            </nav>

            {/* Quick Doctor Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                      alt="Doctor Photo"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dr. Michael Chen</h1>
                    <p className="text-gray-600 dark:text-gray-300">Cardiologist • License: MD-2024-001</p>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <i className="fas fa-envelope mr-2"></i>dr.chen@medconnect.com
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center">
                      <i className="fas fa-phone mr-2"></i>+1 (555) 987-6543
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                    <i className="fas fa-user-plus mr-2"></i>Add Patient
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <i className="fas fa-calendar mr-2"></i>View Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <i className="fas fa-users text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Patients</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">247</p>
                    <p className="text-xs text-green-600 dark:text-green-400">+12 this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <i className="fas fa-calendar-check text-green-600 dark:text-green-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Appointments</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Next: 10:30 AM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <i className="fas fa-prescription-bottle text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Prescriptions Today</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">15</p>
                    <p className="text-xs text-green-600 dark:text-green-400">3 pending review</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <i className="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Urgent Cases</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Requires attention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Completed consultation with Sarah Johnson</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">30 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Updated prescription for John Smith</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">New urgent case assigned: Emma Davis</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Patients Page */}
          <div id="patients-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">My Patients</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Patients</h1>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                <i className="fas fa-user-plus mr-2"></i>Add New Patient
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Patient List</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">PAT-2024-001</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">39</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Hypertension</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 1, 2024</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Stable</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:text-green-600 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">John Smith</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">PAT-2024-002</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">45</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Diabetes Type 2</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Jan 28, 2024</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Monitoring</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:text-green-600 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Emma Davis</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">PAT-2024-003</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">32</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Chest Pain</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 2, 2024</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">Critical</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:text-green-600 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Appointments Page */}
          <div id="appointments-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Appointments</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                <i className="fas fa-calendar-plus mr-2"></i>Schedule Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="xl:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-green-600 dark:text-green-400"></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Follow-up consultation</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">10:30 AM</p>
                            <p className="text-xs text-green-600 dark:text-green-400">30 min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-blue-600 dark:text-blue-400"></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">John Smith</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Diabetes check-up</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">2: 00 PM</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">45 min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-yellow-600 dark:text-yellow-400"></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Emma Davis</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Emergency consultation</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">4:15 PM</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">60 min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="xl:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <button className="w-full flex items-center p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <i className="fas fa-user-plus text-green-600 dark:text-green-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Add New Patient</span>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <i className="fas fa-prescription-bottle text-blue-600 dark:text-blue-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Write Prescription</span>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <i className="fas fa-notes-medical text-purple-600 dark:text-purple-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Medical Notes</span>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                      <i className="fas fa-calendar-check text-yellow-600 dark:text-yellow-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Schedule Follow-up</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prescriptions Page */}
          <div id="prescriptions-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Prescriptions</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Prescriptions</h1>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                <i className="fas fa-plus mr-2"></i>Write New Prescription
              </button>
            </div>

            <div className="grid gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah Johnson - Metformin</h3>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Dosage:</strong> 500mg twice daily
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Prescribed:</strong> Jan 15, 2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Condition:</strong> Type 2 Diabetes Management
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadPrescription("Sarah Johnson", "Metformin")}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-download mr-2"></i>Download PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith - Lisinopril</h3>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Dosage:</strong> 10mg once daily
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Prescribed:</strong> Dec 20, 2023
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Condition:</strong> Hypertension Control
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadPrescription("John Smith", "Lisinopril")}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-download mr-2"></i>Download PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emma Davis - Aspirin</h3>
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Pending Review</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Dosage:</strong> 81mg daily
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Prescribed:</strong> Feb 2, 2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Condition:</strong> Cardiovascular Protection
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadPrescription("Emma Davis", "Aspirin")}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-download mr-2"></i>Download PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Analytics Page */}
          <div id="analytics-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Health Analytics</span>
            </nav>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Health Analytics</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <i className="fas fa-heartbeat text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Heart Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">74 BPM</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Normal Range</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                    <i className="fas fa-tint text-red-600 dark:text-red-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Blood Pressure</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">118/78</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Optimal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <i className="fas fa-weight text-green-600 dark:text-green-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight Trend</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">-2.1 kg</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Improving</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <i className="fas fa-chart-line text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Score</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">Low</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Decreased 15%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Data Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Historical Data</h2>
                  <button id="toggle-analytics" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                    <i className="fas fa-chart-bar mr-2"></i>View More Data
                  </button>
                </div>
              </div>

              <div id="analytics-summary" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Patients Monitored</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">247</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Critical Cases</p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">3</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recovery Rate</p>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">94.2%</p>
                  </div>
                </div>
              </div>

              <div id="analytics-details" className="hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Patient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Blood Pressure</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Heart Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Sarah Johnson</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">120/80</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">65.2 kg</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">72 BPM</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Low</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 1, 2024</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">John Smith</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">135/85</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">78.5 kg</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">76 BPM</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Medium</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Jan 28, 2024</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Emma Davis</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">145/95</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">62.1 kg</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">89 BPM</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">High</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 2, 2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Account/Profile Page */}
          <div id="account-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Profile</span>
            </nav>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Profile</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Professional Information */}
              <div className="xl:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Information</h2>
                      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-edit text-xs"></i>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                        <p className="mt-1 text-gray-900 dark:text-white">Dr. Michael Chen</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Specialization</label>
                        <p className="mt-1 text-gray-900 dark:text-white">Cardiologist</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                        <p className="mt-1 text-gray-900 dark:text-white">dr.chen@medconnect.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                        <p className="mt-1 text-gray-900 dark:text-white">+1 (555) 987-6543</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">License Number</label>
                        <p className="mt-1 text-gray-900 dark:text-white">MD-2024-001</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Years of Experience</label>
                        <p className="mt-1 text-gray-900 dark:text-white">15 years</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Professional Summary</label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        Board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases.
                        Specialized in interventional cardiology and preventive heart care. Committed to providing
                        comprehensive cardiac care using the latest medical technologies and evidence-based treatments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hospital Affiliation</h2>
                      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-edit text-xs"></i>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Hospital</label>
                      <p className="mt-1 text-gray-900 dark:text-white">San Francisco General Hospital</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Cardiology Department</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Hours</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Mon-Fri: 8:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Location</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Building A, Floor 3, Room 301</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h2>
                      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-edit text-xs"></i>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Board Certification</label>
                      <p className="mt-1 text-gray-900 dark:text-white">American Board of Internal Medicine - Cardiology</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Fellowship</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Interventional Cardiology Fellowship</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Medical School</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Harvard Medical School</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;
