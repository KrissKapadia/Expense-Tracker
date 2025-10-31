# 💰 Expense Tracker Pro

A modern, minimal expense tracking web application with advanced features for managing your personal finances.

## ✨ Features

### Core Features
- ✅ Add, edit, and delete expenses
- ✅ Categorize transactions (Food, Transport, Shopping, Bills, etc.)
- ✅ Track payment methods (Cash, Credit Card, Debit Card)
- ✅ Add detailed notes for each transaction
- ✅ Export data to CSV and Excel formats
- ✅ Clean, minimal UI design

### Advanced Features
- 📊 Visual spending insights with interactive charts
- 🔍 Search and filter expenses
- 🌓 Dark/Light mode toggle
- 🔄 Mark recurring expenses
- 📅 Monthly spending trends
- 📈 Category-wise breakdown
- 💾 Automatic local storage backup

## 🚀 Getting Started

### Installation

1. **Clone or Download** this repository
2. **No installation required!** This is a pure HTML/CSS/JS application

### Running the App

Simply open `index.html` in your web browser:
- Double-click `index.html`, or
- Right-click → Open with → Your Browser

That's it! The app runs entirely in your browser with no server required.

## 📁 Project Structure
```
expense-tracker/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   ├── app.js          # Main application logic
│   ├── storage.js      # LocalStorage management
│   ├── export.js       # CSV/Excel export functionality
│   └── charts.js       # Chart.js visualizations
└── README.md           # This file
```

## 🎯 How to Use

### Adding an Expense
1. Click the "Add Expense" button
2. Fill in the form:
   - Amount (required)
   - Date (defaults to today)
   - Category
   - Payment method
   - Description
   - Check "Recurring" if applicable
3. Click "Save Expense"

### Editing an Expense
1. Find the expense in the list
2. Click the edit icon (pencil)
3. Modify the details
4. Click "Update Expense"

### Deleting an Expense
1. Find the expense in the list
2. Click the delete icon (trash)
3. Confirm deletion

### Filtering Expenses
- Use the search bar to find expenses by description
- Filter by category using the category dropdown
- Filter by payment method using the payment dropdown

### Exporting Data
1. Click the "Export" button
2. Choose your format (CSV or Excel)
3. The file will download automatically

### Theme Toggle
- Click the moon/sun icon to switch between dark and light modes
- Your preference is saved automatically

## 💡 Tips

- **Recurring Expenses**: Mark bills that repeat monthly for easy tracking
- **Categories**: Use consistent categories for better insights
- **Descriptions**: Add detailed descriptions to remember what you spent on
- **Regular Exports**: Export your data monthly for backup

## 🔒 Privacy & Data

- All data is stored locally in your browser (localStorage)
- No data is sent to any server
- Your expenses are completely private
- Clear your browser data to reset the app

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Structure
- **CSS3**: Styling with CSS Variables for theming
- **Vanilla JavaScript**: Application logic
- **Chart.js**: Data visualizations
- **SheetJS (xlsx)**: Excel export functionality
- **LocalStorage API**: Data persistence

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with localStorage support

## 📊 Charts

### Category Pie Chart
- Shows spending distribution across categories
- Interactive tooltips with exact amounts
- Color-coded for easy identification

### Monthly Trend Line Chart
- Displays spending over the last 6 months
- Helps identify spending patterns
- Smooth line visualization

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #10b981;
    /* Add more customizations */
}
```

### Adding Categories
Edit the categories array in `index.html`:
```javascript
// Find this in the select dropdown
<option value="YourCategory">Your Category</option>
```

## 📝 Future Enhancements

Potential features to add:
- Budget limits and alerts
- Income tracking
- Multi-currency support
- Data sync across devices
- Mobile app version
- Receipt photo uploads

## 🐛 Troubleshooting

### Data not saving?
- Check if localStorage is enabled in your browser
- Try a different browser
- Clear browser cache and reload

### Charts not displaying?
- Ensure you have internet connection (for Chart.js CDN)
- Check browser console for errors
- Try refreshing the page

### Export not working?
- Make sure you have expenses added
- Check if pop-ups are blocked
- Try a different browser

## 📄 License

This project is free to use and modify for personal and commercial purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or questions, please check the browser console for error messages.

---

**Happy Expense Tracking! 💰📊**
