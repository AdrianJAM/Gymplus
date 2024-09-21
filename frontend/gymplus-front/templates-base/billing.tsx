"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, DollarSign } from "lucide-react"

const invoicesData = [
  { id: 1, member: "Ana García", plan: "Premium", amount: 59.99, date: "01/05/2023", status: "Pagado" },
  { id: 2, member: "Juan Pérez", plan: "Básico", amount: 29.99, date: "28/04/2023", status: "Pendiente" },
  { id: 3, member: "María Rodríguez", plan: "Estándar", amount: 39.99, date: "25/04/2023", status: "Pagado" },
  { id: 4, member: "Carlos López", plan: "Premium", amount: 59.99, date: "15/04/2023", status: "Pagado" },
  { id: 5, member: "Laura Martínez", plan: "Básico", amount: 29.99, date: "10/04/2023", status: "Vencido" },
]

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvoices = invoicesData.filter(invoice =>
    invoice.member.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Facturación</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" /> Exportar Informes
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen de Facturación</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Ingresos Totales</p>
            <p className="text-3xl font-bold text-gray-900">$12,345</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Facturas Pendientes</p>
            <p className="text-3xl font-bold text-gray-900">23</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasa de Pago a Tiempo</p>
            <p className="text-3xl font-bold text-gray-900">92%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ingresos este mes</p>
            <p className="text-3xl font-bold text-gray-900">$4,567</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facturas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Buscar facturas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Miembro</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.member}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'Pagado' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Ver</Button>
                    <Button variant="ghost" size="sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Pagar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}