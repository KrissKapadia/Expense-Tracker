// Export Management
const ExportManager = {
    // Export to CSV
    exportToCSV() {
        const expenses = StorageManager.getExpenses();
        
        if (expenses.length === 0) {
            alert('No expenses to export!');
            return;
        }
        
        // Create CSV header
        const headers = ['Date', 'Category', 'Amount', 'Payment Method', 'Description', 'Recurring'];
        
        // Create CSV rows
        const rows = expenses.map(exp => [
            exp.date,
            exp.category,
            exp.amount,
            exp.paymentMethod,
            `"${exp.description}"`, // Wrap in quotes to handle commas
            exp.recurring ? 'Yes' : 'No'
        ]);
        
        // Combine headers and rows
        const csv = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
        
        // Create blob and download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `expenses_${this.getCurrentDate()}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    
    // Export to Excel
    exportToExcel() {
        const expenses = StorageManager.getExpenses();
        
        if (expenses.length === 0) {
            alert('No expenses to export!');
            return;
        }
        
        // Prepare data for Excel
        const data = expenses.map(exp => ({
            'Date': exp.date,
            'Category': exp.category,
            'Amount': parseFloat(exp.amount),
            'Payment Method': exp.paymentMethod,
            'Description': exp.description,
            'Recurring': exp.recurring ? 'Yes' : 'No'
        }));
        
        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        
        // Set column widths
        worksheet['!cols'] = [
            { wch: 12 },  // Date
            { wch: 15 },  // Category
            { wch: 10 },  // Amount
            { wch: 15 },  // Payment Method
            { wch: 30 },  // Description
            { wch: 10 }   // Recurring
        ];
        
        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        
        // Add summary sheet
        const categoryTotals = StorageManager.getCategoryTotals();
        const summaryData = Object.entries(categoryTotals).map(([category, total]) => ({
            'Category': category,
            'Total': parseFloat(total.toFixed(2))
        }));
        
        const summarySheet = XLSX.utils.json_to_sheet(summaryData);
        summarySheet['!cols'] = [{ wch: 15 }, { wch: 12 }];
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
        
        // Download
        XLSX.writeFile(workbook, `expenses_${this.getCurrentDate()}.xlsx`);
    },
    
    // Get current date for filename
    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }
};

// Export modal functions
function openExportModal() {
    const modal = document.getElementById('exportModal');
    modal.classList.add('active');
}

function closeExportModal() {
    const modal = document.getElementById('exportModal');
    modal.classList.remove('active');
}

function exportData(format) {
    if (format === 'csv') {
        ExportManager.exportToCSV();
    } else if (format === 'excel') {
        ExportManager.exportToExcel();
    }
    closeExportModal();
}