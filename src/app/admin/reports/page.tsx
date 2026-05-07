"use client";

import { useState } from "react";
import {
    TrendingUp,
    FileText,
    Users,
    Download,
    Filter,
    Building,
    MapPin,
    Phone,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock data (simplified - no stock)
const SALES_DATA = {
    daily: 18570,
    weekly: 128000,
    monthly: 452000,
    topProducts: [
        { name: "NP 306 Masks", orders: 42, revenue: 546000 },
        { name: "EN397 Hard Hats", orders: 28, revenue: 75650 },
        { name: "Reflective Vests", orders: 19, revenue: 30150 }
    ],
    topCategories: [
        { name: "Respiratory", orders: 65, revenue: 624000 },
        { name: "Head Protection", orders: 42, revenue: 98000 },
        { name: "Visibility Wear", orders: 31, revenue: 45000 }
    ]
};

const CUSTOMER_DATA = [
    {
        name: "Nairobi Construction Ltd",
        orders: 12,
        total: 842000,
        location: "Industrial Area, Nairobi",
        phone: "0712345678"
    },
    {
        name: "Kenyatta National Hospital",
        orders: 8,
        total: 520000,
        location: "Upper Hill, Nairobi",
        phone: "0722345678"
    },
    {
        name: "Bamburi Cement",
        orders: 6,
        total: 384000,
        location: "Mombasa",
        phone: "0732345678"
    }
];

const COMPLIANCE_DATA = [
    { name: "Steel Toe Safety Boots", sku: "MS-FT-BT-01", issue: "Missing KEBS certification" },
    { name: "Welding Shields", sku: "MS-EF-WS-01", issue: "Certification expires in 30 days" }
];

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState("30d");
    const [reportType, setReportType] = useState("sales");

    const renderReportContent = () => {
        switch (reportType) {
            case "customers":
                return <CustomerReport data={CUSTOMER_DATA} />;
            case "compliance":
                return <ComplianceReport data={COMPLIANCE_DATA} />;
            default:
                return <SalesReport data={SALES_DATA} />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Business Reports</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Sales insights and compliance tracking for Marvel Safety
                    </p>
                </div>

                <div className="flex gap-3">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 90 Days</SelectItem>
                            <SelectItem value="ytd">Year to Date</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" className="border-gray-300">
                        <Download className="h-4 w-4 mr-1.5" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Report Type Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
                {[
                    { id: "sales", label: "Sales", icon: TrendingUp },
                    { id: "customers", label: "Customers", icon: Users },
                    { id: "compliance", label: "Compliance", icon: FileText }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setReportType(tab.id)}
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${reportType === tab.id
                                ? "border-orange-600 text-orange-600 bg-orange-50"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Report Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {renderReportContent()}
            </div>
        </div>
    );
}

// Sales Report (Enhanced)
function SalesReport({ data }: { data: any }) {
    return (
        <>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Monthly Revenue</CardDescription>
                    <CardTitle className="text-2xl">KES {data.monthly.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-2xl">{data.topProducts.reduce((sum: number, p: any) => sum + p.orders, 0)}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">All categories</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Average Order Value</CardDescription>
                    <CardTitle className="text-2xl">KES {(data.monthly / 30).toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">Per day</p>
                </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                    <CardDescription>Most ordered items this month</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {data.topProducts.map((product: any, index: number) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                <div>
                                    <p className="font-medium text-sm">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.orders} orders</p>
                                </div>
                                <p className="font-bold">KES {product.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Categories */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                    <CardDescription>Revenue by product type</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {data.topCategories.map((category: any, index: number) => (
                            <div key={index} className="flex justify-between items-center py-1">
                                <p className="text-sm">{category.name}</p>
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
                                    KES {category.revenue.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

// Customer Report (NEW)
function CustomerReport({ data }: { data: any[] }) {
    return (
        <>
            <Card className="xl:col-span-3">
                <CardHeader>
                    <CardTitle>Top Customers</CardTitle>
                    <CardDescription>Businesses with highest order volume</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="pb-2 font-medium text-gray-700">Customer</th>
                                    <th className="pb-2 font-medium text-gray-700">Orders</th>
                                    <th className="pb-2 font-medium text-gray-700">Total Spent</th>
                                    <th className="pb-2 font-medium text-gray-700">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((customer, index) => (
                                    <tr key={index}>
                                        <td className="py-3">
                                            <div className="font-medium">{customer.name}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                <Phone className="h-3 w-3" />
                                                {customer.phone}
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                                                {customer.orders} orders
                                            </span>
                                        </td>
                                        <td className="py-3 font-bold">KES {customer.total.toLocaleString()}</td>
                                        <td className="py-3 text-gray-600 text-sm">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {customer.location}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Insights */}
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Repeat Customers</CardDescription>
                    <CardTitle className="text-2xl">68%</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">Customers with 2+ orders</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Average Customer Value</CardDescription>
                    <CardTitle className="text-2xl">KES 124,500</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">Lifetime value</p>
                </CardContent>
            </Card>
        </>
    );
}

// Compliance Report (Simplified)
function ComplianceReport({ data }: { data: any[] }) {
    return (
        <>
            <Card className="xl:col-span-3">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-red-600" />
                        Compliance Issues
                    </CardTitle>
                    <CardDescription>Products requiring attention for KEBS compliance</CardDescription>
                </CardHeader>
                <CardContent>
                    {data.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <p className="text-gray-600">All products are KEBS compliant</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.map((item, index) => (
                                <div key={index} className="flex gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-red-900">{item.name}</p>
                                        <p className="text-sm text-red-700">{item.issue}</p>
                                        <p className="text-xs text-red-600 mt-1">SKU: {item.sku}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Compliant Products</CardDescription>
                    <CardTitle className="text-2xl">98%</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">Of total catalog</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>KEBS Certifications</CardDescription>
                    <CardTitle className="text-2xl">124</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-gray-500">Active certificates</p>
                </CardContent>
            </Card>
        </>
    );
}