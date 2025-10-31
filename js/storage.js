// Storage Management
const StorageManager = {
    STORAGE_KEY: 'expenseTrackerData',
    
    // Get all expenses
    getExpenses() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },
    
    // Save expenses
    saveExpenses(expenses) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
    },
    
    // Add new expense
    addExpense(expense) {
        const expenses = this.getExpenses();
        expense.id = Date.now().toString();
        expense.createdAt = new Date().toISOString();
        expenses.push(expense);
        this.saveExpenses(expenses);
        return expense;
    },
    
    // Update expense
    updateExpense(id, updatedExpense) {
        let expenses = this.getExpenses();
        expenses = expenses.map(exp => 
            exp.id === id ? { ...exp, ...updatedExpense } : exp
        );
        this.saveExpenses(expenses);
        return updatedExpense;
    },
    
    // Delete expense
    deleteExpense(id) {
        let expenses = this.getExpenses();
        expenses = expenses.filter(exp => exp.id !== id);
        this.saveExpenses(expenses);
    },
    
    // Get expense by ID
    getExpenseById(id) {
        const expenses = this.getExpenses();
        return expenses.find(exp => exp.id === id);
    },
    
    // Get expenses by category
    getExpensesByCategory(category) {
        const expenses = this.getExpenses();
        return expenses.filter(exp => exp.category === category);
    },
    
    // Get expenses by payment method
    getExpensesByPayment(paymentMethod) {
        const expenses = this.getExpenses();
        return expenses.filter(exp => exp.paymentMethod === paymentMethod);
    },
    
    // Get expenses by date range
    getExpensesByDateRange(startDate, endDate) {
        const expenses = this.getExpenses();
        return expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate >= new Date(startDate) && expDate <= new Date(endDate);
        });
    },
    
    // Get total expenses
    getTotalExpenses() {
        const expenses = this.getExpenses();
        return expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0);
    },
    
    // Get monthly expenses
    getMonthlyExpenses(year, month) {
        const expenses = this.getExpenses();
        return expenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate.getFullYear() === year && expDate.getMonth() === month;
        });
    },
    
    // Get current month expenses
    getCurrentMonthExpenses() {
        const now = new Date();
        return this.getMonthlyExpenses(now.getFullYear(), now.getMonth());
    },
    
    // Get category totals
    getCategoryTotals() {
        const expenses = this.getExpenses();
        const totals = {};
        
        expenses.forEach(exp => {
            if (!totals[exp.category]) {
                totals[exp.category] = 0;
            }
            totals[exp.category] += parseFloat(exp.amount);
        });
        
        return totals;
    },
    
    // Get monthly trends (last 6 months)
    getMonthlyTrends() {
        const expenses = this.getExpenses();
        const trends = {};
        
        expenses.forEach(exp => {
            const monthKey = exp.date.substring(0, 7); // YYYY-MM
            if (!trends[monthKey]) {
                trends[monthKey] = 0;
            }
            trends[monthKey] += parseFloat(exp.amount);
        });
        
        // Sort by month and get last 6 months
        const sortedMonths = Object.keys(trends).sort().slice(-6);
        const result = {};
        sortedMonths.forEach(month => {
            result[month] = trends[month];
        });
        
        return result;
    },
    
    // Clear all data
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};