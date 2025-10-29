import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const patients = [
  {
    id: 1,
    name: "Иванова Мария Сергеевна",
    age: 39,
    lastVisit: "29.01.2024",
    status: "active",
    progress: 75,
  },
  {
    id: 2,
    name: "Петров Алексей Иванович",
    age: 45,
    lastVisit: "28.01.2024",
    status: "active",
    progress: 60,
  },
  {
    id: 3,
    name: "Сидорова Елена Викторовна",
    age: 52,
    lastVisit: "26.01.2024",
    status: "pending",
    progress: 40,
  },
];

export default function Patients() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Пациенты</h1>
          <p className="text-muted-foreground mt-1">
            Управление базой пациентов
          </p>
        </div>
        <Link to="/patients/new">
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="h-4 w-4 mr-2" />
            Добавить пациента
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по имени, ID или дате рождения..."
          className="pl-10"
        />
      </div>

      {/* Patients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <Link key={patient.id} to={`/patients/${patient.id}`}>
            <Card className="transition-all hover:shadow-lg hover:border-primary cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {patient.age} лет • ID #{patient.id.toString().padStart(4, '0')}
                    </p>
                  </div>
                  <Badge
                    variant={patient.status === 'active' ? 'default' : 'secondary'}
                    className={patient.status === 'active' ? 'bg-success' : ''}
                  >
                    {patient.status === 'active' ? 'Активен' : 'Ожидает'}
                  </Badge>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Последний визит</span>
                    <span className="font-medium text-foreground">{patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-medium text-foreground">{patient.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all"
                      style={{ width: `${patient.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
