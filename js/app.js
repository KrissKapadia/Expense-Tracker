// Main Application
class ExpenseTrackerApp {
    constructor() {
        this.expenses = [];
        this.filteredExpenses = [];
        this.editingId = null;
        this.init();
    }
    
    init() {
        // Load expenses from storage
        this.loadExpenses();
        
        // Initialize charts
        ChartManager.init();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Render initial view
        this.render();
        
        // Set today's date as default
        document.getElementById('date').valueAsDate = new Date();
        
        // Load theme preference
        this.loadTheme();
    }
    
    setupEventListeners() {
        // Form buttons
        document.getElementById('addExpenseBtn').addEventListener('click', () => this.showForm());
        document.getElementById('closeFormBtn').addEventListener('click', () => this.hideForm());
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideForm());
        
        // Form submission
        document.getElementById('expenseFormElement').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Filters
        document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('categoryFilter').addEventListener('change', (e) => this.handleCategoryFilter(e.target.value));
        document.getElementById('paymentFilter').addEventListener('change', (e) => this.handlePaymentFilter(e.target.value));
        
        // Export
        document.getElementById('exportBtn').addEventListener('click', () => openExportModal());
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Close modal on outside click
        document.getElementById('exportModal').addEventListener('click', (e) => {
            if (e.target.id === 'exportModal') {
                closeExportModal();
            }
        });
    }
    
    loadExpenses() {
        this.expenses = StorageManager.getExpenses();
        this.filteredExpenses = [...this.expenses];
    }
    
    showForm() {
        document.getElementById('expenseForm').style.display = 'block';
        document.getElementById('formTitle').textContent = 'Add New Expense';
        document.getElementById('submitBtnText').textContent = 'Save Expense';
        this.editingId = null;
    }
    
    hideForm() {
        document.getElementById('expenseForm').style.display = 'none';
        this.resetForm();
    }
    
    resetForm() {
        document.getElementById('expenseFormElement').reset();
        document.getElementById('expenseId').value = '';
        document.getElementById('date').valueAsDate = new Date();
        this.editingId = null;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            amount: document.getElementById('amount').value,
            date: document.getElementById('date').value,
            category: document.getElementById('category').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            description: document.getElementById('description').value,
            recurring: document.getElementById('recurring').checked
        };
        
        if (this.editingId) {
            StorageManager.updateExpense(this.editingId, formData);
        } else {
            StorageManager.addExpense(formData);
        }
        
        this.loadExpenses();
        this.render();
        this.hideForm();
        ChartManager.updateCharts();
    }
    
    handleEdit(id) {
        const expense = StorageManager.getExpenseById(id);
        if (!expense) return;
        
        document.getElementById('amount').value = expense.amount;
        document.getElementById('date').value = expense.date;
        document.getElementById('category').value = expense.category;
        document.getElementById('paymentMethod').value = expense.paymentMethod;
        document.getElementById('description').value = expense.description;
        document.getElementById('recurring').checked = expense.recurring;
        
        document.getElementById('formTitle').textContent = 'Edit Expense';
        document.getElementById('submitBtnText').textContent = 'Update Expense';
        document.getElementById('expenseForm').style.display = 'block';
        
        this.editingId = id;
    }
    
    handleDelete(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            StorageManager.deleteExpense(id);
            this.loadExpenses();
            this.render();
            ChartManager.updateCharts();
        }
    }
    
    handleSearch(term) {
        this.applyFilters();
    }
    
    handleCategoryFilter(category) {
        this.applyFilters();
    }
    
    handlePaymentFilter(payment) {
        this.applyFilters();
    }
    
    applyFilters() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const paymentFilter = document.getElementById('paymentFilter').value;
        
        this.filteredExpenses = this.expenses.filter(exp => {
            const matchesSearch = exp.description.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
            const matchesPayment = paymentFilter === 'all' || exp.paymentMethod === paymentFilter;
            
            return matchesSearch && matchesCategory && matchesPayment;
        });
        
        this.renderExpensesList();
    }
    
    render() {
        this.updateStats();
        this.renderExpensesList();
    }
    
    updateStats() {
        const totalExpenses = StorageManager.getTotalExpenses();
        const monthlyExpenses = StorageManager.getCurrentMonthExpenses()
            .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        const totalTransactions = this.expenses.length;
        
        document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
        document.getElementById('monthlyExpenses').textContent = `$${monthlyExpenses.toFixed(2)}`;
        document.getElementById('totalTransactions').textContent = totalTransactions;
    }
    
    renderExpensesList() {
        const container = document.getElementById('expensesList');
        
        if (this.filteredExpenses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>No expenses found. Try adjusting your filters or add a new expense!</p>
                </div>
            `;
            return;
        }
        
        // Sort by date (newest first)
        const sortedExpenses = [...this.filteredExpenses].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        container.innerHTML = sortedExpenses.map(exp => this.createExpenseHTML(exp)).join('');
        
        // Add event listeners to action buttons
        sortedExpenses.forEach(exp => {
            document.getElementById(`edit-${exp.id}`).addEventListener('click', () => this.handleEdit(exp.id));
            document.getElementById(`delete-${exp.id}`).addEventListener('click', () => this.handleDelete(exp.id));
        });
    }
    
    createExpenseHTML(expense) {
        const categoryClass = `category-${expense.category.toLowerCase()}`;
        const paymentIcon = this.getPaymentIcon(expense.paymentMethod);
        const formattedDate = new Date(expense.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        return `
            <div class="expense-item">
                <div class="expense-info">
                    <div class="expense-header">
                        <span class="expense-category ${categoryClass}">${expense.category}</span>
                        ${expense.recurring ? '<span class="expense-recurring"><i class="fas fa-sync"></i> Recurring</span>' : ''}
                    </div>
                    <div class="expense-description">${expense.description}</div>
                    <div class="expense-meta">
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="${paymentIcon}"></i> ${expense.paymentMethod}</span>
                    </div>
                </div>
                <div class="expense-amount">$${parseFloat(expense.amount).toFixed(2)}</div>
                <div class="expense-actions">
                    <button id="edit-${expense.id}" class="btn btn-icon" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button id="delete-${expense.id}" class="btn btn-icon btn-danger" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    getPaymentIcon(paymentMethod) {
        const icons = {
            'Cash': 'fas fa-money-bill-wave',
            'Credit Card': 'fas fa-credit-card',
            'Debit Card': 'fas fa-credit-card'
        };
        return icons[paymentMethod] || 'fas fa-wallet';
    }
    
    toggleTheme() {
        const body = document.body;
        const icon = document.querySelector('#themeToggle i');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
        
        // Update charts with new theme colors
        setTimeout(() => {
            ChartManager.updateCharts();
        }, 100);
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const icon = document.querySelector('#themeToggle i');
        
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTrackerApp();
});