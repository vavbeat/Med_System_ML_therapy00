import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  {
    name: "Всего пациентов",
    value: "48",
    change: "+12%",
    icon: Users,
    trend: "up",
  },
  {
    name: "Сеансов сегодня",
    value: "8",
    change: "5 завершено",
    icon: Activity,
    trend: "neutral",
  },
  {
    name: "Записей на неделю",
    value: "32",
    change: "+8%",
    icon: Calendar,
    trend: "up",
  },
  {
    name: "Эффективность",
    value: "94%",
    change: "+3%",
    icon: TrendingUp,
    trend: "up",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: "Иванова Мария Сергеевна",
    time: "14:00",
    type: "Вибротерапия",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Петров Алексей Иванович",
    time: "15:30",
    type: "Консультация",
    status: "pending",
  },
  {
    id: 3,
    patient: "Сидорова Елена Викторовна",
    time: "17:00",
    type: "Повторный сеанс",
    status: "confirmed",
  },
];

const recentPatients = [
  {
    id: 1,
    name: "Козлов Дмитрий",
    lastVisit: "2 дня назад",
    progress: 85,
  },
  {
    id: 2,
    name: "Морозова Анна",
    lastVisit: "5 дней назад",
    progress: 62,
  },
  {
    id: 3,
    name: "Васильев Игорь",
    lastVisit: "1 неделя назад",
    progress: 45,
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Добро пожаловать в систему управления вибротерапией
          </p>
        </div>
        <Link to="/patients/new">
          <Button className="bg-primary hover:bg-primary-dark">
            Добавить пациента
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Ближайшие записи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {appointment.time}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {appointment.status === "confirmed" ? "Подтверждена" : "Ожидание"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Недавние пациенты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <Link
                  key={patient.id}
                  to={`/patients/${patient.id}`}
                  className="block rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {patient.lastVisit}
                    </span>
                  </div>
                  <div className="space-y-1">
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
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
