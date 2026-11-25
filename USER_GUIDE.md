# Remo Hospital Website - User Guide

> **Current architecture:** Open `http://localhost:8000` after starting Django —
> the UI is server-rendered by Django and no separate frontend server is needed.
> See [README.md](README.md) for current setup instructions.

## 🏥 Welcome to Remo Hospital

Remo Hospital is a modern, full-featured hospital management website that allows patients to:
- Browse doctors and departments
- View hospital services
- Book appointments online
- Contact the hospital
- Access healthcare information

---

## 📍 Project Location

**Full Path**: `D:\Softwares\Remo-h`

The project is located in the `Remo-h` folder within your `D:\Softwares` directory.

---

## 🚀 Quick Start Guide

### For Windows Users

#### Option 1: Using Command Prompt (cmd)

1. **Open Command Prompt**
   - Press `Win + R`, type `cmd`, and press Enter

2. **Navigate to the Project**
   ```cmd
   cd D:\Softwares\Remo-h
   ```

3. **Start the Backend Server**
   ```cmd
   venv\Scripts\activate
   cd backend
   python manage.py runserver
   ```
   - Keep this window open
   - Backend will run at: http://localhost:8000

4. **Open a New Command Prompt Window** (for frontend)
   - Press `Win + R`, type `cmd`, and press Enter

5. **Navigate to Frontend**
   ```cmd
   cd D:\Softwares\Remo-h\frontend
   ```

6. **Start the Frontend Server**
   ```cmd
   node node_modules\vite\bin\vite.js
   ```
   - Frontend will run at: http://localhost:3000

7. **Open Your Browser**
   - Go to: http://localhost:3000
   - The Remo Hospital website will load

#### Option 2: Using PowerShell

1. **Open PowerShell**
   - Right-click Start button, select "Windows PowerShell"

2. **Navigate to the Project**
   ```powershell
   cd D:\Softwares\Remo-h
   ```

3. **Start the Backend**
   ```powershell
   .\venv\Scripts\Activate.ps1
   cd backend
   python manage.py runserver
   ```

4. **Open a New PowerShell Window** (for frontend)

5. **Start the Frontend**
   ```powershell
   cd D:\Softwares\Remo-h\frontend
   node node_modules\vite\bin\vite.js
   ```

---

## 📱 How to Use the Website

### 1. **Home Page**
- View hospital overview and statistics
- See featured departments
- Learn about hospital features
- Click "Book Appointment" to schedule a visit

### 2. **About Page**
- Read about hospital history
- Learn about hospital values
- View key milestones
- Understand hospital mission and vision

### 3. **Doctors Page**
- **Search Doctors**: Use the search bar to find doctors by name or specialization
- **Filter by Department**: Select a department from the dropdown
- **View Doctor Profiles**: See qualifications, experience, and consultation fees
- **Check Availability**: Green badge means available, red means unavailable
- **Book Appointment**: Click "Book Now" on available doctors

### 4. **Departments Page**
- Browse all hospital departments
- See doctor count per department
- View key services offered
- Click "View Doctors" to see department specialists

### 5. **Services Page**
- Explore all hospital services
- View service pricing
- See what's included in each service
- Popular services are highlighted
- Special programs section

### 6. **Book Appointment**
- **Step 1**: Enter your personal information (name, email, phone)
- **Step 2**: Select a department
- **Step 3**: Choose a doctor from that department
- **Step 4**: Pick a date and available time slot
- **Step 5**: Describe your reason for the visit
- **Step 6**: Submit the form
- You'll receive a confirmation with appointment details

### 7. **Contact Page**
- View hospital address and contact information
- See working hours
- Send a message through the contact form
- Read frequently asked questions (FAQ)

---

## 🎨 Website Features

### Color Scheme
- **Primary Color**: Blue (#0ea5e9) - Trust and professionalism
- **Secondary Color**: Green (#22c55e) - Health and wellness
- **Accent Colors**: Various department-specific colors
- **Background**: Clean white and light gray for readability

### Responsive Design
- Works on desktop computers
- Works on tablets
- Works on mobile phones
- Automatically adjusts to screen size

### Key Features
- ✅ 24/7 Emergency hotline displayed
- ✅ Search functionality for doctors
- ✅ Real-time appointment slot availability
- ✅ Form validation
- ✅ Success/error notifications
- ✅ Smooth animations and transitions
- ✅ Professional medical icons
- ✅ Statistics and achievements display

---

## 📞 Hospital Contact Information

**Address**: 123 Healthcare Avenue, Medical District, City 12345

**Phone Numbers**:
- Main: +1 (555) 123-4567
- Emergency: +1 (555) 911-0000
- Fax: +1 (555) 123-4568

**Email**:
- General: info@remohospital.com
- Appointments: appointments@remohospital.com
- Billing: billing@remohospital.com

**Working Hours**:
- Monday - Friday: 8:00 AM - 8:00 PM
- Saturday: 9:00 AM - 5:00 PM
- Sunday: 10:00 AM - 2:00 PM
- **Emergency: 24/7**

---

## 🔧 Troubleshooting

### Backend won't start
- Make sure Python is installed
- Make sure virtual environment is activated
- Check if port 8000 is already in use

### Frontend won't start
- Make sure Node.js is installed
- Make sure dependencies are installed (`npm install`)
- Check if port 3000 is already in use

### Can't connect to API
- Make sure backend server is running
- Check browser console for errors
- Try refreshing the page

### Images not loading
- This is normal - doctor images use placeholders
- Icons are loaded from Lucide React library

---

## 💡 Tips

1. **Book Early**: Popular doctors fill up quickly
2. **Check Availability**: Green badge means the doctor is available
3. **Use Search**: The search bar helps find specific doctors quickly
4. **Mobile Friendly**: The website works great on phones
5. **Emergency**: Call the emergency number for urgent matters

---

## 📞 Need Help?

If you encounter any issues or have questions:
1. Check the Developer Guide for technical details
2. Review the troubleshooting section above
3. Contact the development team

---

## 🎯 Next Steps

1. **Explore the Website**: Click through all pages to familiarize yourself
2. **Test Appointment Booking**: Try booking a test appointment
3. **Browse Doctors**: Use search and filter features
4. **Read About Section**: Learn about the hospital
5. **Contact Form**: Try sending a test message

---

**Enjoy using the Remo Hospital Website!** 🏥
