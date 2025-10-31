// Chart Management
const ChartManager = {
    categoryChart: null,
    trendChart: null,
    
    categoryColors: {
        'Food': '#ef4444',
        'Transport': '#06b6d4',
        'Shopping': '#eab308',
        'Bills': '#10b981',
        'Entertainment': '#8b5cf6',
        'Health': '#ec4899',
        'Education': '#3b82f6',
        'Other': '#6b7280'
    },
    
    // Initialize charts
    init() {
        this.createCategoryChart();
        this.createTrendChart();
    },
    
    // Create category pie chart
    createCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;
        
        const categoryTotals = StorageManager.getCategoryTotals();
        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);
        const colors = labels.map(label => this.categoryColors[label]);
        
        if (this.categoryChart) {
            this.categoryChart.destroy();
        }
        
        if (labels.length === 0) {
            ctx.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No data available</p>';
            return;
        }
        
        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: getComputedStyle(document.body).getPropertyValue('--bg-secondary')
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.body).getPropertyValue('--text-primary'),
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return label + ': $' + value.toFixed(2);
                            }
                        }
                    }
                }
            }
        });
    },
    
    // Create trend line chart
    createTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;
        
        const monthlyTrends = StorageManager.getMonthlyTrends();
        const labels = Object.keys(monthlyTrends);
        const data = Object.values(monthlyTrends);
        
        if (this.trendChart) {
            this.trendChart.destroy();
        }
        
        if (labels.length === 0) {
            ctx.parentElement.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No data available</p>';
            return;
        }
        
        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels.map(label => {
                    const [year, month] = label.split('-');
                    const date = new Date(year, month - 1);
                    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                }),
                datasets: [{
                    label: 'Monthly Spending',
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Spending: $' + context.parsed.y.toFixed(2);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: getComputedStyle(document.body).getPropertyValue('--text-secondary'),
                            callback: function(value) {
                                return '$' + value;
                            }
                        },
                        grid: {
                            color: getComputedStyle(document.body).getPropertyValue('--border-color')
                        }
                    },
                    x: {
                        ticks: {
                            color: getComputedStyle(document.body).getPropertyValue('--text-secondary')
                        },
                        grid: {
                            color: getComputedStyle(document.body).getPropertyValue('--border-color')
                        }
                    }
                }
            }
        });
    },
    
    // Update all charts
    updateCharts() {
        this.createCategoryChart();
        this.createTrendChart();
    }
};