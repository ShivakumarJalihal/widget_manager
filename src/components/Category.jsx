import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidgetFromCategory } from '../features/widgetsSlice';

// SVG Icons for different category types
const CategoryIcons = {
  cspm: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cwpp: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 1V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M15 1V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M1 9H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 9H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  registry: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="17" cy="14" r="1" fill="currentColor"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// Chart Components for widget cards
const ChartComponents = {
  // Donut Chart for risk data
  donutChart: (
    <div className="chart-container">
      <svg viewBox="0 0 120 120" className="donut-chart">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="8" 
                strokeDasharray="157 314" strokeDashoffset="78" strokeLinecap="round" 
                transform="rotate(-90 60 60)"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="8" 
                strokeDasharray="157 314" strokeDashoffset="0" strokeLinecap="round" 
                transform="rotate(-90 60 60)"/>
        <text x="60" y="65" textAnchor="middle" className="chart-text">75%</text>
      </svg>
    </div>
  ),
  
  // Bar Chart for statistics
  barChart: (
    <div className="chart-container">
      <svg viewBox="0 0 120 80" className="bar-chart">
        <rect x="10" y="40" width="15" height="35" fill="#3b82f6" rx="2"/>
        <rect x="30" y="25" width="15" height="50" fill="#3b82f6" rx="2"/>
        <rect x="50" y="15" width="15" height="60" fill="#3b82f6" rx="2"/>
        <rect x="70" y="30" width="15" height="45" fill="#3b82f6" rx="2"/>
        <rect x="90" y="20" width="15" height="55" fill="#3b82f6" rx="2"/>
      </svg>
    </div>
  ),
  
  // Line Chart for alerts
  lineChart: (
    <div className="chart-container">
      <svg viewBox="0 0 120 80" className="line-chart">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <path d="M10,60 Q30,40 50,30 T90,20 T110,15" 
              fill="none" stroke="#3b82f6" strokeWidth="2"/>
        <path d="M10,60 Q30,40 50,30 T90,20 T110,15 L110,80 L10,80 Z" 
              fill="url(#lineGradient)"/>
        <circle cx="50" cy="30" r="3" fill="#3b82f6"/>
        <circle cx="90" cy="20" r="3" fill="#3b82f6"/>
      </svg>
    </div>
  ),
  
  // Area Chart for assessments
  areaChart: (
    <div className="chart-container">
      <svg viewBox="0 0 120 80" className="area-chart">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <path d="M10,50 L30,40 L50,35 L70,30 L90,25 L110,20 L110,80 L10,80 Z" 
              fill="url(#areaGradient)"/>
        <path d="M10,50 L30,40 L50,35 L70,30 L90,25 L110,20" 
              fill="none" stroke="#f59e0b" strokeWidth="2"/>
      </svg>
    </div>
  ),
  
  // Gauge for top lists
  gauge: (
    <div className="chart-container">
      <svg viewBox="0 0 100 80" className="gauge-chart">
        {/* Background arc - full semicircle */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="6" 
                strokeDasharray="94.2" strokeDashoffset="47.1" 
                transform="rotate(-90 50 50)" strokeLinecap="round"/>
        {/* Progress arc - 85% of semicircle */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#10b981" strokeWidth="6" 
                strokeDasharray="80 94.2" strokeDashoffset="47.1" 
                transform="rotate(-90 50 50)" strokeLinecap="round"/>
        {/* Needle center */}
        <circle cx="50" cy="50" r="3" fill="#10b981"/>
        {/* Percentage value */}
        <text x="50" y="65" textAnchor="middle" className="chart-value">85%</text>
      </svg>
    </div>
  ),
  
  // Default chart
  default: (
    <div className="chart-container">
      <svg viewBox="0 0 120 80" className="default-chart">
        <rect x="20" y="30" width="80" height="30" fill="#f3f4f6" rx="4"/>
        <rect x="25" y="35" width="15" height="20" fill="#3b82f6" rx="2"/>
        <rect x="45" y="25" width="15" height="30" fill="#3b82f6" rx="2"/>
        <rect x="65" y="40" width="15" height="15" fill="#3b82f6" rx="2"/>
        <text x="60" y="75" textAnchor="middle" className="chart-label">Analytics</text>
      </svg>
    </div>
  )
};

const EmptyIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Function to determine chart component based on widget name/text
const getChartComponent = (widget) => {
  const name = widget.name.toLowerCase();
  const text = widget.text.toLowerCase();
  
  if (name.includes('risk') || text.includes('donut') || text.includes('pie')) {
    return ChartComponents.donutChart;
  }
  if (name.includes('alerts') || text.includes('graph') || text.includes('line')) {
    return ChartComponents.lineChart;
  }
  if (name.includes('stats') || text.includes('counts') || text.includes('bar')) {
    return ChartComponents.barChart;
  }
  if (name.includes('assessment') || text.includes('summary') || text.includes('vulnerabilities')) {
    return ChartComponents.areaChart;
  }
  if (name.includes('top') || text.includes('namespace')) {
    return ChartComponents.gauge;
  }
  
  return ChartComponents.default;
};

export default function Category({ category, widgets }) {
  const dispatch = useDispatch();

  const mapped = category.widgets.map(wid => widgets.find(w => w.id === wid)).filter(Boolean);
  const categoryIcon = CategoryIcons[category.id] || CategoryIcons.default;

  return (
    <section className="category">
      <div className="cat-header">
        <div className="cat-title-section">
          <div className="cat-icon">
            {categoryIcon}
          </div>
          <h2>{category.title}</h2>
        </div>
        <span className="widget-count">{mapped.length} widget{mapped.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="cat-widgets">
        {mapped.length === 0 && (
          <div className="empty">
            <div className="empty-icon">
              {EmptyIcon}
            </div>
            <p>No widgets yet</p>
            <small>Use the +Add Widget button to get started</small>
          </div>
        )}
        {mapped.map(w => (
          <div key={w.id} className="widget-card">
            <div className="widget-top">
              <strong>{w.name}</strong>
              <button 
                className="remove-btn" 
                onClick={() => dispatch(removeWidgetFromCategory({ widgetId: w.id, categoryId: category.id }))}
                aria-label={`Remove ${w.name} widget`}
              >
                ✕
              </button>
            </div>
            <div className="widget-chart">
              {getChartComponent(w)}
            </div>
            <div className="widget-body">{w.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
