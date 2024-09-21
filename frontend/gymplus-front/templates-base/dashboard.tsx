"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Users, DollarSign, Calendar, Menu, Search, Bell, Dumbbell } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const attendanceData = [
  { name: 'Lun', value: 120 },
  { name: 'Mar', value: 150 },
  { name: 'Mié', value: 180 },
  { name: 'Jue', value: 140 },
  { name: 'Vie', value: 200 },
  { name: 'Sáb', value: 170 },
  { name: 'Dom', value: 90 },
]

const revenueData = [
  { name: 'Ene', value: 10000 },
  { name: 'Feb', value: 12000 },
  { name: 'Mar', value: 15000 },
  { name: 'Abr', value: 14000 },
  { name: 'May', value: 18000 },
  { name: 'Jun', value: 20000 },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-green-700 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-2xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>GymPlus</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-green-600">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-4">
          <Button
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
            className={`w-full justify-start mb-2 ${isSidebarOpen ? 'px-4' : 'px-0 justify-center'} text-white hover:bg-green-600`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart className="h-5 w-5 mr-2" />
            {isSidebarOpen && 'Dashboard'}
          </Button>
          <Button
            variant={activeTab === 'members' ? 'secondary' : 'ghost'}
            className={`w-full justify-start mb-2 ${isSidebarOpen ? 'px-4' : 'px-0 justify-center'} text-white hover:bg-green-600`}
            onClick={() => setActiveTab('members')}
          >
            <Users className="h-5 w-5 mr-2" />
            {isSidebarOpen && 'Miembros'}
          </Button>
          <Button
            variant={activeTab === 'classes' ? 'secondary' : 'ghost'}
            className={`w-full justify-start mb-2 ${isSidebarOpen ? 'px-4' : 'px-0 justify-center'} text-white hover:bg-green-600`}
            onClick={() => setActiveTab('classes')}
          >
            <Calendar className="h-5 w-5 mr-2" />
            {isSidebarOpen && 'Clases'}
          </Button>
          <Button
            variant={activeTab === 'billing' ? 'secondary' : 'ghost'}
            className={`w-full justify-start mb-2 ${isSidebarOpen ? 'px-4' : 'px-0 justify-center'} text-white hover:bg-green-600`}
            onClick={() => setActiveTab('billing')}
          >
            <DollarSign className="h-5 w-5 mr-2" />
            {isSidebarOpen && 'Facturación'}
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Input type="text" placeholder="Buscar..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button variant="ghost" size="icon" className="mr-2">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <img src="/placeholder.svg?height=32&width=32" alt="Avatar" className="rounded-full" />
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Miembros Totales</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-green-600">+10% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-green-600">+5% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clases Programadas</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56</div>
                <p className="text-xs text-green-600">Para esta semana</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Retención</CardTitle>
                <Dumbbell className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-green-600">+2% desde el mes pasado</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asistencia Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ingresos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Members */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Miembros Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Fecha de Inicio</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Ana García</TableCell>
                      <TableCell>Premium</TableCell>
                      <TableCell>01/05/2023</TableCell>
                      <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Activo</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Juan Pérez</TableCell>
                      <TableCell>Básico</TableCell>
                      <TableCell>28/04/2023</TableCell>
                      <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Activo</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">María Rodríguez</TableCell>
                      <TableCell>Estándar</TableCell>
                      <TableCell>25/04/2023</TableCell>
                      <TableCell><span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Pendiente</span></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}