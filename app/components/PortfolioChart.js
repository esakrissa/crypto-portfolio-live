'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { useTheme } from '../context/ThemeContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function PortfolioChart({ data }) {
  const { resolvedTheme } = useTheme()
  const [chartColors, setChartColors] = useState({
    text: '#6b7280',
    grid: '#e5e7eb',
    line: 'rgb(14, 165, 233)',
    fill: 'rgba(14, 165, 233, 0.1)'
  })

  useEffect(() => {
    const isDark = resolvedTheme === 'dark'
    setChartColors({
      text: isDark ? '#9ca3af' : '#6b7280',
      grid: isDark ? '#374151' : '#e5e7eb',
      line: isDark ? 'rgb(56, 189, 248)' : 'rgb(14, 165, 233)',
      fill: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(14, 165, 233, 0.1)'
    })
  }, [resolvedTheme])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: resolvedTheme === 'dark' ? '#1f2937' : '#ffffff',
        titleColor: resolvedTheme === 'dark' ? '#f3f4f6' : '#111827',
        bodyColor: resolvedTheme === 'dark' ? '#d1d5db' : '#374151',
        borderColor: resolvedTheme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Portfolio: $${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: chartColors.text,
          callback: function(value) {
            return '$' + (value / 1000).toFixed(0) + 'k'
          }
        },
        grid: {
          color: chartColors.grid,
        }
      },
      x: {
        ticks: {
          color: chartColors.text,
        },
        grid: {
          display: false,
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.values,
        borderColor: chartColors.line,
        backgroundColor: chartColors.fill,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: chartColors.line,
      },
    ],
  }

  return (
    <div style={{ height: '400px' }}>
      <Line options={options} data={chartData} />
    </div>
  )
}
