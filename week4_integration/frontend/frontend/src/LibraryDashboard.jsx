import React, { useState, useEffect } from 'react';

// Base URL for your Spring Boot API
const API_URL = 'http://localhost:8080';

// --- THEME CONFIGURATION ---
const lightTheme = { background: '#ffffff', text: '#333333', cardBackground: '#f8f9fa', border: '#ced4da', inputBackground: '#ffffff', error: '#dc3545', success: '#28a745' };
const darkTheme = { background: '#212529', text: '#f1f1f1', cardBackground: '#343a40', border: '#454d55', inputBackground: '#495057', error: '#f8d7da', success: '#28a745' };

// --- GLOBAL STYLES ---
const inputStyleBase = { marginBottom: '10px', width: '90%', padding: '8px', boxSizing: 'border-box' };
const buttonStyleBase = { padding: '10px', border: 'none', cursor: 'pointer', width: '90%', fontWeight: 'bold', marginBottom: '10px' };
const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' };

const getStyle = (isDarkMode, styleType, theme, custom) => {
    switch (styleType) {
        case 'input': return { ...inputStyleBase, backgroundColor: theme.inputBackground, color: theme.text, border: `1px solid ${theme.border}`, ...custom };
        case 'disabledInput': return { ...inputStyleBase, backgroundColor: isDarkMode ? '#5a5a5a' : '#e9ecef', color: isDarkMode ? '#ccc' : '#6c757d', border: `1px solid ${theme.border}`, ...custom };
        case 'card': return { border: `1px solid ${theme.border}`, padding: '15px', borderRadius: '5px', backgroundColor: theme.cardBackground, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', ...custom };
        case 'pre': return { backgroundColor: isDarkMode ? '#1f2227' : '#f4f4f4', color: theme.text, padding: '15px', borderRadius: '5px', maxHeight: '400px', overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', border: `1px solid ${theme.border}`, ...custom };
        case 'button': return { ...buttonStyleBase, ...custom };
        default: return {};
    }
};


// --- API HELPER FUNCTION ---

const apiRequest = async (method, endpoint, body) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : null,
        });

        if (response.status === 204) return null;
        if (response.ok) {
            const text = await response.text();
            return text ? JSON.parse(text) : true;
        } else {
            const errorText = await response.text();
            let parsedError = errorText || response.statusText || 'Unknown Error';
            try {
                const errorJson = JSON.parse(errorText);
                parsedError = errorJson.message || parsedError;
            } catch {}
            throw new Error(`API Error: ${response.status} - ${parsedError}`);
        }
    } catch (error) {
        throw error;
    }
};

// --- LOGIN SCREEN COMPONENT ---

function LoginScreen({ theme, setProfile, setMessage }) {
    const [loginData, setLoginData] = useState({ identifier: '', type: 'Staff' });

    const handleLogin = async () => {
        setMessage('');
        const identifier = loginData.identifier.trim();
        if (!identifier) {
            return setMessage(`❌ Please enter your identifier.`);
        }

        try {
            let endpoint;
            let user;
            
            if (loginData.type === 'Staff') {
                endpoint = `/staff/by-email/${identifier}`; 
                user = await apiRequest('GET', endpoint);
                
                if (user && user.staffId) {
                    setProfile({ isLoggedIn: true, role: 'Staff', id: user.staffId, fullName: `${user.staffFirstName} ${user.staffLastName}` });
                    setMessage(`✅ Welcome, Staff Admin!`);
                } else {
                     throw new Error('Staff email not found.');
                }

            } else {
                const memberId = parseInt(identifier);
                if (isNaN(memberId)) throw new Error("Member ID must be a number.");
                
                endpoint = `/members/${memberId}`;
                user = await apiRequest('GET', endpoint);
                
                if (user && user.memberId) {
                    setProfile({ isLoggedIn: true, role: 'Member', id: memberId, fullName: `${user.memberFirstName} ${user.memberLastName}`});
                    setMessage(`✅ Welcome, Member ${memberId}!`);
                } else {
                    throw new Error('Member ID not found.');
                }
            }
        } catch (error) {
            let userFriendlyMessage = 'Login failed.';
            
            if (error.message.includes('404')) {
                userFriendlyMessage = `${loginData.type} ${loginData.type === 'Staff' ? 'email' : 'ID'} not registered.`;
            } else if (error.message.includes('number')) {
                 userFriendlyMessage = "Member ID must be a valid number.";
            }

            setMessage(`❌ ${userFriendlyMessage}`);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', ...getStyle(false, 'card', theme) }}>
            <h2 style={{ color: theme.text }}>🔑 Library Login</h2>
            
            <label style={labelStyle}>Login Type:</label>
            <select 
                value={loginData.type} 
                onChange={(e) => setLoginData({ identifier: '', type: e.target.value })} 
                style={{ ...getStyle(false, 'input', theme, { padding: '8px' }) }}
            >
                <option value="Staff">Staff (Login by Email)</option>
                <option value="Member">Member (Login by Member ID)</option>
            </select>

            <label style={labelStyle}>
                {loginData.type === 'Staff' ? 'Work Email:' : 'Member ID:'}
            </label>
            <input 
                type="text" 
                value={loginData.identifier} 
                onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })} 
                style={getStyle(false, 'input', theme)} 
                placeholder={loginData.type === 'Staff' ? 'e.g., jane.doe@library.com' : 'e.g., 1'}
            />
            
            <button onClick={handleLogin} style={{ ...getStyle(false, 'button', theme), backgroundColor: theme.success, color: 'white' }}>
                LOG IN as {loginData.type}
            </button>
            <p style={{fontSize: '12px', color: theme.text}}>
                *New Members must be created by Staff first.
            </p>
        </div>
    );
}

// --- ADMIN DASHBOARD COMPONENT (Staff Access) ---

function AdminDashboard({ theme, profile, isDarkMode, setMessage, fetchData, viewData, setActiveView, activeView, notifications, setNotifications }) {
    // Initial data for forms
    const [bookData, setBookData] = useState({ isbn: `978${Math.floor(1000000000 + Math.random() * 9000000000)}`.substring(0, 13), title: 'New Book Title', authorFirstName: 'Auth', authorLastName: 'Name', genre: 'Fiction', publicationYear: 2023, publisher: 'Pub Co' });
    const [staffData, setStaffData] = useState({ staffEmail: `staff_${Date.now()}@lib.com`, role: 'Librarian', password: '', employmentStatus: 'Active', phoneNumber: '555-5555', staffFirstName: 'Staff', staffLastName: 'User' });
    const [memberAddData, setMemberAddData] = useState({ memberFirstName: 'New', memberLastName: 'User', email: `user_${Date.now()}@demo.com`, memberStatus: 'Active', password: '', joinDate: new Date().toISOString().slice(0, 10), memberExpiryDate: '2026-12-31', dateOfBirth: '1990-01-01', address: '123 Test St', phoneNumber: '555-0101', gender: 'Male', });
    const [bookCopyData, setBookCopyData] = useState({ isbn: bookData.isbn, staffId: profile.id, availability: 'Available' });
    const [fineData, setFineData] = useState({ borrowId: 2, amount: 100, fineId: 1 });
    const [returnId, setReturnId] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Search state

    
    const handleInputChange = (e, setter) => setter(prev => ({...prev, [e.target.name]: e.target.value}));
    
    const handleAddEntity = async (type, data) => {
        setMessage('');
        try {
            // FIX: Correct API path logic for 'copy' and 'book' (singular)
            let endpoint;
            if (type.toLowerCase() === 'copy') {
                endpoint = '/copies';
            } else if (type.toLowerCase() === 'book') {
                endpoint = '/books';
            } else if (type.toLowerCase() === 'staff') {
                endpoint = '/staff';
            } else {
                endpoint = `/${type.toLowerCase()}s`; 
            }
            
            const result = await apiRequest('POST', endpoint, data);
            setMessage(`✅ ${type} Added! ID: ${result[`${type.toLowerCase()}Id`] || result.isbn}. Use this ID for login/borrow.`);
            fetchData(); 
            // Reset fields
            if (type === 'book') setBookData(prev => ({...prev, isbn: `978${Math.floor(1000000000 + Math.random() * 9000000000)}`.substring(0, 13)}));
            if (type === 'staff') setStaffData(prev => ({...prev, staffEmail: `staff_${Date.now()}@lib.com`}));
            if (type === 'member') setMemberAddData(prev => ({...prev, email: `user_${Date.now()}@demo.com`}));

        } catch (error) {
            setMessage(`❌ Failed to Add ${type}: ${error.message}`);
        }
    };
    
    const handleIssueFine = async () => {
        setMessage('');
        try {
            const url = `/fines?borrowId=${fineData.borrowId}&staffId=${profile.id}&amount=${fineData.amount}`;
            await apiRequest('POST', url);
            setMessage(`✅ Fine Issued!`);
            fetchData();
        } catch (error) {
            setMessage(`❌ Fine Issue Failed: ${error.message}`);
        }
    };

    const handlePayFine = async () => {
        setMessage('');
        if (!fineData.fineId) return setMessage('Please enter a Fine ID.');
        const datePaid = new Date().toISOString().slice(0, 10);
        try {
            const url = `/fines/pay/${fineData.fineId}?datePaid=${datePaid}`;
            await apiRequest('PUT', url);
            setMessage(`✅ Fine ID ${fineData.fineId} Paid.`);
            fetchData();
        } catch (error) {
            setMessage(`❌ Fine Payment Failed: ${error.message}`);
        }
    };

    const handleReturnBook = async () => {

        if (profile.role !== 'Staff') {
        return setMessage('❌ Access Denied: Only Staff can process returns.');
    }

        if (!returnId) return setMessage('Please enter a Borrow ID to return.');
        const returnDate = new Date().toISOString().slice(0, 10);
        try {
            const url = `/borrow/return/${returnId}?returnDate=${returnDate}`;
            await apiRequest('PUT', url);
            setMessage(`✅ Borrow ID ${returnId} Returned!`);
            setReturnId(''); 
            fetchData();
        } catch (error) {
            setMessage(`❌ Return Failed (ID ${returnId}): ${error.message}`);
        }
    };

    const handleProcessBorrowRequest = async (request, index) => {
        setMessage('');
        
        // Admin is prompted to set the due date
        const dueDate = prompt(`Set Due Date for Copy ${request.bookId} (YYYY-MM-DD - Default: ${request.dueDate}):`, request.dueDate);
        
        if (!dueDate) return setMessage('⚠️ Processing aborted: Due Date required.');

        try {
            const payload = {
                bookId: request.bookId,
                memberId: request.memberId,
                staffId: profile.id, 
                dueDate: dueDate, 
            };
            const result = await apiRequest('POST', '/borrow', payload);
            setMessage(`✅ Borrow for Member ${request.memberId} PROCESSED! Borrow ID: ${result.borrowId}`);
            
            setNotifications(prev => prev.filter((_, i) => i !== index));
            fetchData();
        } catch (error) {
            setMessage(`❌ Processing Failed for Member ${request.memberId}: ${error.message}`);
        }
    };
    
    // --- Data Viewer Logic ---
    const filterData = (data) => {
        if (!searchTerm) return data;
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return data.filter(item => 
            Object.entries(item).some(([key, value]) => {
                if (key.toLowerCase() === 'password') return false;
                return String(value).toLowerCase().includes(lowerCaseSearch);
            })
        );
    };

    const renderActiveView = () => {
        const data = viewData[activeView];
        const filteredData = filterData(data);
        
        // Special rendering for books (master list)
        if (activeView === 'books') {
            return (
                <div>
                    <h3 style={{ color: theme.text }}>Master Book List (Click to view copies)</h3>
                    <input 
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ ...getStyle(isDarkMode, 'input', theme), width: '90%', marginBottom: '15px' }}
                    />
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ backgroundColor: isDarkMode ? '#444' : '#eee' }}>
                                    <th style={thStyle(theme)}>ISBN</th>
                                    <th style={thStyle(theme)}>Title</th>
                                    <th style={thStyle(theme)}>Author</th>
                                    <th style={thStyle(theme)}>Total Copies</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(book => {
                                    const copyCount = viewData.copies.filter(c => c.isbn === book.isbn).length;
                                    return (
                                        <tr 
                                            key={book.isbn} 
                                            onClick={() => setActiveView('copies')}
                                            style={{ cursor: 'pointer', backgroundColor: theme.cardBackground, transition: '0.1s', borderBottom: `1px solid ${theme.border}` }}
                                        >
                                            <td style={tdStyle(theme)}>{book.isbn}</td>
                                            <td style={tdStyle(theme)}>{book.title}</td>
                                            <td style={tdStyle(theme)}>{book.authorLastName}</td>
                                            <td style={tdStyle(theme)}>{copyCount}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        
        // Default rendering for other entities
        return (
            <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: theme.text, marginBottom: '10px' }}>Viewing: {activeView.charAt(0).toUpperCase() + activeView.slice(1)} ({filteredData.length} of {data.length})</h3>
                <input 
                    type="text"
                    placeholder={`Search ${activeView}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ ...getStyle(isDarkMode, 'input', theme), width: '90%', marginBottom: '15px' }}
                />
                <pre style={getStyle(isDarkMode, 'pre', theme)}>{JSON.stringify(filteredData, null, 2)}</pre>
            </div>
        );
    };


    return (
        <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: theme.text }}>🛠️ Admin Tools (Staff ID: {profile.id})</h2>

            {/* Notifications */}
            <div style={{...getStyle(isDarkMode, 'card', theme), backgroundColor: isDarkMode ? '#5a3d3d' : '#f8d7da', border: `1px solid ${theme.error}`, marginBottom: '20px' }}>
                <h3 style={{ color: theme.error, marginTop: 0 }}>🚨 Pending Borrow Requests ({notifications.length})</h3>
                {notifications.length === 0 ? (
                    <p style={{ color: theme.text }}>No pending requests.</p>
                ) : (
                    notifications.map((request, index) => (
                        <div key={index} style={{ borderBottom: `1px solid ${theme.border}`, padding: '8px 0' }}>
                            <p style={{ margin: '0' }}>**REQUEST:** Member {request.memberId} ({request.memberFullName}) wants to borrow Copy {request.bookId} (Due: {request.dueDate}).</p>
                            <button 
                                onClick={() => handleProcessBorrowRequest(request, index)}
                                style={{ ...getStyle(false, 'button', theme), backgroundColor: '#28a745', color: 'white', width: 'auto', padding: '5px 10px', marginTop: '5px' }}
                            >
                                PROCESS & APPROVE
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                
                {/* 1. Add Book */}
                <div style={getStyle(isDarkMode, 'card', theme)}>
                    <h3>➕ Add Book (Master)</h3>
                    <label style={labelStyle}>ISBN (13 Digits):</label>
                    <input type="text" name="isbn" value={bookData.isbn} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Title:</label>
                    <input type="text" name="title" value={bookData.title} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Author First Name:</label>
                    <input type="text" name="authorFirstName" value={bookData.authorFirstName} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Author Last Name:</label>
                    <input type="text" name="authorLastName" value={bookData.authorLastName} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Genre:</label>
                    <input type="text" name="genre" value={bookData.genre} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Publisher:</label>
                    <input type="text" name="publisher" value={bookData.publisher} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Year:</label>
                    <input type="number" name="publicationYear" value={bookData.publicationYear} onChange={(e) => handleInputChange(e, setBookData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <button onClick={() => handleAddEntity('book', bookData)} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#007bff', color: 'white' }}>
                        Add Master Book
                    </button>
                </div>

                {/* 2. Add Book Copy */}
                <div style={getStyle(isDarkMode, 'card', theme)}>
                    <h3>➕ Add Book Copy</h3>
                    <p style={{ fontSize: '12px', marginTop: 0 }}>Requires existing ISBN.</p>
                    <label style={labelStyle}>ISBN:</label>
                    <input type="text" name="isbn" value={bookCopyData.isbn} onChange={(e) => handleInputChange(e, setBookCopyData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Staff ID (Owner):</label>
                    <input type="number" name="staffId" value={profile.id} disabled style={getStyle(isDarkMode, 'disabledInput', theme)} />
                    <label style={labelStyle}>Availability:</label>
                    <select name="availability" value={bookCopyData.availability} onChange={(e) => handleInputChange(e, setBookCopyData)} style={getStyle(isDarkMode, 'input', theme)}>
                        <option value="Available">Available</option>
                        <option value="Borrowed">Borrowed</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                    <button onClick={() => handleAddEntity('copy', { isbn: bookCopyData.isbn, staffId: profile.id, availability: bookCopyData.availability })} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#17a2b8', color: 'white' }}>
                        Add Copy
                    </button>
                </div>
                
                {/* 3. Add Staff */}
                <div style={getStyle(isDarkMode, 'card', theme)}>
                    <h3>➕ Add Staff</h3>
                    <label style={labelStyle}>Email (Unique):</label>
                    <input type="text" name="staffEmail" value={staffData.staffEmail} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>First Name:</label>
                    <input type="text" name="staffFirstName" value={staffData.staffFirstName} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Last Name:</label>
                    <input type="text" name="staffLastName" value={staffData.staffLastName} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Role:</label>
                    <input type="text" name="role" value={staffData.role} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Phone:</label>
                    <input type="text" name="phoneNumber" value={staffData.phoneNumber} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Status:</label>
                    <select name="employmentStatus" value={staffData.employmentStatus} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(isDarkMode, 'input', theme)}>
                        <option value="Active">Active</option>
                        <option value="Not_Active">Not Active</option>
                    </select>
                    <label style={labelStyle}>Password (Optional):</label>
                    <input type="text" name="password" value={staffData.password} onChange={(e) => handleInputChange(e, setStaffData)} style={getStyle(false, 'input', theme)} />
                    <button onClick={() => handleAddEntity('staff', staffData)} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#ffc107', color: 'black' }}>
                        Add Staff
                    </button>
                </div>

                {/* 4. Add Member (Full Fields) */}
                <div style={getStyle(isDarkMode, 'card', theme)}>
                    <h3>➕ Add Member (Full Profile)</h3>
                    <p style={{ fontSize: '12px' }}>Next ID can be used for login.</p>
                    <label style={labelStyle}>First Name:</label>
                    <input type="text" name="memberFirstName" value={memberAddData.memberFirstName} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Last Name:</label>
                    <input type="text" name="memberLastName" value={memberAddData.memberLastName} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Email:</label>
                    <input type="text" name="email" value={memberAddData.email} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Address:</label>
                    <input type="text" name="address" value={memberAddData.address} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Phone:</label>
                    <input type="text" name="phoneNumber" value={memberAddData.phoneNumber} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>DOB:</label>
                    <input type="date" name="dateOfBirth" value={memberAddData.dateOfBirth} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Gender:</label>
                    <select name="gender" value={memberAddData.gender} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(isDarkMode, 'input', theme)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label style={labelStyle}>Password (Optional):</label>
                    <input type="text" name="password" value={memberAddData.password} onChange={(e) => handleInputChange(e, setMemberAddData)} style={getStyle(false, 'input', theme)} />
                    <button onClick={() => handleAddEntity('member', memberAddData)} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#28a745', color: 'white' }}>
                        Add Member
                    </button>
                </div>
                
                {/* 5. Operations */}
                <div style={getStyle(isDarkMode, 'card', theme)}>
                    <h3>🔄 Operations</h3>
                    <h3 style={{ marginTop: '5px' }}>Return Book</h3>
                    <label style={labelStyle}>Borrow ID to Return:</label>
                    <input type="number" value={returnId} onChange={(e) => setReturnId(e.target.value)} style={getStyle(isDarkMode, 'input', theme)} />
                    <button onClick={handleReturnBook} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#dc3545', color: 'white' }}>
                        PROCESS RETURN
                    </button>

                    <h3 style={{ marginTop: '15px' }}>Fine Actions</h3>
                    <label style={labelStyle}>Borrow ID for Fine:</label>
                    <input type="number" name="borrowId" value={fineData.borrowId} onChange={(e) => handleInputChange(e, setFineData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Amount:</label>
                    <input type="number" name="amount" value={fineData.amount} onChange={(e) => handleInputChange(e, setFineData)} style={getStyle(false, 'input', theme)} />
                    <button onClick={handleIssueFine} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#ffc107', color: 'black' }}>
                        ISSUE FINE
                    </button>
                    <label style={labelStyle}>Fine ID to Pay:</label>
                    <input type="number" name="fineId" value={fineData.fineId} onChange={(e) => handleInputChange(e, setFineData)} style={getStyle(isDarkMode, 'input', theme)} />
                    <button onClick={handlePayFine} style={{ ...getStyle(false, 'button', theme), backgroundColor: '#17a2b8', color: 'white' }}>
                        MARK PAID
                    </button>
                </div>
            </div>
            
            {/* Data Viewer Section - Admin Only */}
            <div style={{ marginTop: '30px', borderTop: `1px solid ${theme.border}`}}>
                <h2 style={{ color: theme.text, paddingTop: '15px' }}>Database Entities Viewer</h2>
                <div style={{ marginBottom: '15px' }}>
                    {Object.keys(viewData).map(key => (
                        <button 
                            key={key}
                            onClick={() => setActiveView(key)}
                            style={{ 
                                marginRight: '10px', 
                                padding: '8px 15px', 
                                backgroundColor: activeView === key ? '#007bff' : theme.cardBackground, 
                                color: activeView === key ? 'white' : theme.text,
                                border: `1px solid ${theme.border}`,
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)} ({viewData[key].length})
                        </button>
                    ))}
                </div>
                <AdminDashboard.Viewer theme={theme} isDarkMode={isDarkMode} viewData={viewData} activeView={activeView} />
            </div>
        </div>
    );
}

// --- MEMBER DASHBOARD COMPONENT (Member Access) ---

function MemberDashboard({ theme, profile, isDarkMode, setMessage, fetchData, viewData, handleBorrowRequestFromMember }) {
    const [borrowData, setBorrowData] = useState({
        bookId: 1,
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10), // Default due date 30 days out
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleBorrowChange = (e) => setBorrowData({ ...borrowData, [e.target.name]: e.target.value });

    // Handle the request simulation by calling the function passed from App
    const handleBorrowRequest = () => {
        if (!borrowData.bookId) return setMessage(`❌ Please enter a Book Copy ID.`);

        const bookCopy = viewData.copies.find(c => c.bookId === parseInt(borrowData.bookId));
        
        if (!bookCopy) {
            return setMessage(`❌ Borrow Failed: Book Copy ID ${borrowData.bookId} not found.`);
        }
        if (bookCopy.availability !== 'Available') {
            return setMessage(`❌ Borrow Failed: Book Copy ID ${borrowData.bookId} is ${bookCopy.availability}.`);
        }
        
        // Pass the request up to the App component to handle notification/admin processing
        handleBorrowRequestFromMember(parseInt(borrowData.bookId), profile.id);
        setMessage(`✅ Borrow Request for Copy ${borrowData.bookId} submitted successfully!`);
    };

    const filterCopies = () => {
        if (!searchTerm) return viewData.copies;
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return viewData.copies.filter(copy => 
            viewData.books.some(book => book.isbn === copy.isbn && 
                (book.title.toLowerCase().includes(lowerCaseSearch) ||
                 book.authorLastName.toLowerCase().includes(lowerCaseSearch) ||
                 copy.availability.toLowerCase().includes(lowerCaseSearch)
                )
            )
        );
    };

    const memberBorrows = viewData.borrows.filter(b => b.memberId === profile.id);

    // Placeholder function for member initiated return (handled by AdminDashboard)
    const handleReturnRequest = (borrowId) => {
        setMessage(`⚠️ Member requests Staff to process return for Borrow ID ${borrowId}.`);
    };


    return (
        <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: theme.text }}>📚 Member Services (Logged in as: {profile.fullName})</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
                
                {/* Borrow Request Section */}
                <div style={{ ...getStyle(isDarkMode, 'card', theme), height: 'fit-content' }}>
                    <h3>➡️ Request Borrow</h3>
                    <p style={{ fontSize: '12px' }}>Fill out the request for Staff approval.</p>
                    <label style={labelStyle}>Book Copy ID:</label>
                    <input type="number" name="bookId" value={borrowData.bookId} onChange={handleBorrowChange} style={getStyle(isDarkMode, 'input', theme)} />
                    <label style={labelStyle}>Your Member ID:</label>
                    <input type="number" value={profile.id} disabled style={getStyle(isDarkMode, 'disabledInput', theme)} />
                    <button onClick={handleBorrowRequest} style={{ ...getStyle(false, 'button', theme), backgroundColor: theme.success, color: 'white' }}>
                        SUBMIT BORROW REQUEST
                    </button>
                </div>

                {/* Book Copy Browser */}
                <div style={getStyle(isDarkMode, 'card', theme)}>
                    <h3 style={{ marginTop: 0 }}>📖 Browse Available Copies</h3>
                    <input 
                        type="text" 
                        placeholder="Search title, author, or ISBN..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        style={{ ...getStyle(isDarkMode, 'input', theme), width: '95%' }} 
                    />
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ backgroundColor: isDarkMode ? '#444' : '#eee' }}>
                                    <th style={thStyle(theme)}>Copy ID</th>
                                    <th style={thStyle(theme)}>Title / ISBN</th>
                                    <th style={thStyle(theme)}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterCopies().map(copy => {
                                    const book = viewData.books.find(b => b.isbn === copy.isbn) || { title: 'N/A' };
                                    const isAvailable = copy.availability === 'Available';
                                    return (
                                        <tr key={copy.bookId} style={{ backgroundColor: isAvailable ? (isDarkMode ? '#2e4a37' : '#e6ffe6') : (isDarkMode ? '#4a3030' : '#f0f0f0') }}>
                                            <td style={tdStyle(theme)}>{copy.bookId}</td>
                                            <td style={tdStyle(theme)}>{book.title} ({copy.isbn})</td>
                                            <td style={tdStyle(theme)}>{copy.availability}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Member's Borrow List */}
            <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: theme.text }}>Your Active Borrows & History</h3>
                <div style={getStyle(isDarkMode, 'pre', theme)}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ backgroundColor: isDarkMode ? '#444' : '#eee' }}>
                                <th style={thStyle(theme)}>Borrow ID</th>
                                <th style={thStyle(theme)}>Copy ID</th>
                                <th style={thStyle(theme)}>Due Date</th>
                                <th style={thStyle(theme)}>Status</th>
                                <th style={thStyle(theme)}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberBorrows.map(borrow => {
                                const isDue = borrow.returnDate === null;
                                return (
                                    <tr key={borrow.borrowId}>
                                        <td style={tdStyle(theme)}>{borrow.borrowId}</td>
                                        <td style={tdStyle(theme)}>{borrow.bookId}</td>
                                        <td style={tdStyle(theme)}>{borrow.dueDate}</td>
                                        <td style={tdStyle(theme)}>{isDue ? 'ACTIVE' : 'RETURNED'}</td>
                                        <td style={tdStyle(theme)}>
                                            {isDue && (
                                                <button 
                                                    onClick={() => handleReturnRequest(borrow.borrowId)}
                                                    style={{ backgroundColor: theme.error, color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', width: 'auto' }}
                                                >
                                                    Request Return
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

// --- MAIN APPLICATION COMPONENT ---

export default function App() {
    const [profile, setProfile] = useState({ isLoggedIn: false, role: '', email: '', id: null, fullName: '' });
    const [message, setMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [viewData, setViewData] = useState({
        borrows: [], fines: [], members: [], staff: [], books: [], copies: [],
    });
    const [activeView, setActiveView] = useState('borrows');
    const [notifications, setNotifications] = useState([]);
    
    const theme = isDarkMode ? darkTheme : lightTheme;
    
    // --- Data Fetching Logic (Strips Passwords) ---
    const processDataForDisplay = (data) => {
        if (!data || data.length === 0) return [];
        return data.map(item => {
            const newItem = { ...item };
            if (newItem.password) newItem.password = '[REDACTED]';
            return newItem;
        });
    };

    const fetchData = async () => {
        try {
            const [borrows, fines, members, staff, books, copies] = await Promise.all([
                apiRequest('GET', '/borrow'), apiRequest('GET', '/fines'), apiRequest('GET', '/members'),
                apiRequest('GET', '/staff'), apiRequest('GET', '/books'), apiRequest('GET', '/copies'),
            ]);
            
            setViewData({
                borrows: processDataForDisplay(borrows || []),
                fines: processDataForDisplay(fines || []),
                members: processDataForDisplay(members || []),
                staff: processDataForDisplay(staff || []),
                books: processDataForDisplay(books || []),
                copies: processDataForDisplay(copies || []),
            });
        } catch (error) {
            // Keep silent to avoid interrupting login
        }
    };
    
    useEffect(() => {
        if (profile.isLoggedIn) {
            fetchData();
        }
    }, [profile.isLoggedIn]);
    
    const toggleTheme = () => setIsDarkMode(prev => !prev);
    
    // --- Borrow Request Handler (Triggered by Member, Handled by App) ---
    const handleBorrowRequestFromMember = (bookId, memberId) => {
        const member = viewData.members.find(m => m.memberId === memberId) || { memberFirstName: 'Unknown', memberLastName: 'Member' };
        
        const request = {
            bookId: bookId,
            memberId: memberId,
            memberFullName: `${member.memberFirstName} ${member.memberLastName}`,
            dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10),
            dateRequested: new Date().toLocaleTimeString(),
        };
        setNotifications(prev => [...prev, request]);
    };
    
    const renderDashboard = () => {
        const [currentDate, setCurrentDate] = useState('');

        useEffect(() => {
            const date = new Date().toLocaleDateString(undefined, { 
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
            });
            setCurrentDate(date);
        }, []);
        
        if (!profile.isLoggedIn) {
            return <LoginScreen theme={theme} setProfile={setProfile} setMessage={setMessage} />;
        }
        
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h1 style={{ color: theme.text }}>Library Companion</h1>
                    <span style={{ fontSize: '14px', color: theme.text }}>{currentDate}</span> {/* DATE DISPLAY */}

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '20px', color: theme.text }}>
                            Logged in as: <strong>{profile.fullName}</strong> ({profile.role})
                        </span>
                        <button onClick={toggleTheme} style={{ padding: '10px 15px', backgroundColor: theme.cardBackground, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
                        </button>
                        <button onClick={() => setProfile({ isLoggedIn: false, role: '', email: '', id: null, fullName: '' })} style={{ padding: '10px 15px', backgroundColor: theme.error, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>
                </div>

                <div style={{ 
                    padding: '10px', 
                    backgroundColor: message.startsWith('✅') ? '#d4edda' : message.startsWith('❌') ? theme.error : theme.cardBackground,
                    border: message ? `1px solid ${theme.border}` : 'none',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    color: message.startsWith('❌') ? 'white' : theme.text
                }}>
                    {message || 'Ready. Test actions based on your logged-in role.'}
                </div>
                
                {profile.role === 'Staff' ? (
                    <AdminDashboard 
                        theme={theme} 
                        profile={profile} 
                        isDarkMode={isDarkMode}
                        setMessage={setMessage} 
                        fetchData={fetchData} 
                        viewData={viewData}
                        setActiveView={setActiveView}
                        activeView={activeView}
                        notifications={notifications}
                        setNotifications={setNotifications}
                    />
                ) : (
                    <MemberDashboard 
                        theme={theme} 
                        profile={profile} 
                        isDarkMode={isDarkMode}
                        setMessage={setMessage} 
                        fetchData={fetchData} 
                        viewData={viewData}
                        handleBorrowRequestFromMember={handleBorrowRequestFromMember}
                    />
                )}
            </>
        );
    };

    return (
        <div style={{ backgroundColor: theme.background, minHeight: '100vh', transition: 'background-color 0.3s' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                {renderDashboard()}
            </div>
        </div>
    );
}

// --- Custom Table Styles (Defined at global scope for easy access) ---
const thStyle = (theme) => ({ padding: '8px', border: `1px solid ${theme.border}`, textAlign: 'left', color: theme.text, backgroundColor: theme.cardBackground });
const tdStyle = (theme) => ({ padding: '8px', border: `1px solid ${theme.border}`, color: theme.text });


// --- ADMIN DASHBOARD VIEWER SUB-COMPONENT (Local Search) ---

AdminDashboard.Viewer = function ({ theme, isDarkMode, viewData, activeView }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filterData = (data) => {
        if (!searchTerm) return data;
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return data.filter(item => 
            Object.entries(item).some(([key, value]) => {
                if (key.toLowerCase() === 'password') return false;
                return String(value).toLowerCase().includes(lowerCaseSearch);
            })
        );
    };

    const data = viewData[activeView];
    const filteredData = filterData(data);
    
    return (
        <div>
            <input 
                type="text"
                placeholder={`Search ${activeView}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ ...getStyle(isDarkMode, 'input', theme), width: '90%', marginBottom: '15px' }}
            />
            <h4 style={{ color: theme.text }}>Showing: {filteredData.length} of {data.length} records.</h4>
            <pre style={getStyle(isDarkMode, 'pre', theme)}>{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
    );
};