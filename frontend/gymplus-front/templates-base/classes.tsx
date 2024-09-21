"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Calendar } from "lucide-react"

const classesData = [
  { id: 1, name: "Yoga", instructor: "Laura Martínez", schedule: "Lunes y Miércoles, 18:00", capacity: 20, enrolled: 15 },
  { id: 2, name: "Spinning", instructor: "Carlos Ruiz", schedule: "Martes y Jueves, 19:00", capacity: 15, enrolled: 12 },
  { id: 3, name: "Zumba", instructor: "Ana García", schedule: "Viernes, 17:00", capacity: 25, enrolled: 22 },
  { id: 4, name: "Pilates", instructor: "María López", schedule: "Sábado, 10:00", capacity: 15, enrolled: 10 },
  { id: 5, name: "CrossFit", instructor: "Juan Pérez", schedule: "Lunes a Viernes, 20:00", capacity: 12, enrolled: 12 },
]

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClasses = classesData.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Clases</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Añadir Clase
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen de Clases</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Clases</p>
            <p className="text-3xl font-bold text-gray-900">15</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Instructores</p>
            <p className="text-3xl font-bold text-gray-900">8</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Promedio de Asistencia</p>
            <p className="text-3xl font-bold text-gray-900">85%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Clases esta semana</p>
            <p className="text-3xl font-bold text-gray-900">45</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Buscar clases..."
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
                <TableHead>Nombre de la Clase</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Inscritos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.instructor}</TableCell>
                  <TableCell>{cls.schedule}</TableCell>
                  <TableCell>{cls.capacity}</TableCell>
                  <TableCell>{cls.enrolled}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Editar</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">Cancelar</Button>
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