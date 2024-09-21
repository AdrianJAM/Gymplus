"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"

const membersData = [
  { id: 1, name: "Ana García", plan: "Premium", startDate: "01/05/2023", status: "Activo" },
  { id: 2, name: "Juan Pérez", plan: "Básico", startDate: "28/04/2023", status: "Activo" },
  { id: 3, name: "María Rodríguez", plan: "Estándar", startDate: "25/04/2023", status: "Pendiente" },
  { id: 4, name: "Carlos López", plan: "Premium", startDate: "15/04/2023", status: "Activo" },
  { id: 5, name: "Laura Martínez", plan: "Básico", startDate: "10/04/2023", status: "Inactivo" },
]

export default function Members() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = membersData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Miembros</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Añadir Miembro
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Estadísticas de Miembros</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Miembros</p>
            <p className="text-3xl font-bold text-gray-900">1,234</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nuevos este mes</p>
            <p className="text-3xl font-bold text-gray-900">56</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tasa de Retención</p>
            <p className="text-3xl font-bold text-gray-900">85%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Miembros Activos</p>
            <p className="text-3xl font-bold text-gray-900">1,100</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Miembros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Buscar miembros..."
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
                <TableHead>Nombre</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>{member.startDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      member.status === 'Activo' ? 'bg-green-100 text-green-800' :
                      member.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Editar</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">Eliminar</Button>
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