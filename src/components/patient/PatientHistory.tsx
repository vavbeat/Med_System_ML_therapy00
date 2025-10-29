import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Activity, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const sessions = [
  {
    id: 1,
    date: "2024-01-29",
    time: "14:00",
    duration: "45 минут",
    type: "Вибротерапия",
    frequency: "25 Гц",
    amplitude: "2 мм",
    status: "completed",
    notes: "Пациент хорошо перенес сеанс. Отмечает уменьшение болевых ощущений в шейном отделе. Рекомендовано продолжить курс.",
    progress: 75,
  },
  {
    id: 2,
    date: "2024-01-26",
    time: "15:30",
    duration: "45 минут",
    type: "Вибротерапия",
    frequency: "20 Гц",
    amplitude: "1.5 мм",
    status: "completed",
    notes: "Положительная динамика. Увеличена интенсивность вибрации. Пациент активно выполняет домашние упражнения.",
    progress: 60,
  },
  {
    id: 3,
    date: "2024-01-22",
    time: "16:00",
    duration: "40 минут",
    type: "Консультация + Вибротерапия",
    frequency: "15 Гц",
    amplitude: "1 мм",
    status: "completed",
    notes: "Первый сеанс. Начальные параметры подобраны с учетом чувствительности. Пациент адаптировался хорошо.",
    progress: 40,
  },
];

export default function PatientHistory() {
  return (
    <div className="space-y-6">
      {/* Progress Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика прогресса</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">График прогресса пациента</p>
              <p className="text-sm text-muted-foreground mt-1">
                Визуализация будет добавлена в следующей версии
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>История сеансов</CardTitle>
            <Button variant="outline" size="sm">
              Экспорт в PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sessions.map((session, index) => (
              <div key={session.id} className="relative">
                {/* Timeline line */}
                {index !== sessions.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
                )}
                
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Session content */}
                  <div className="flex-1 pb-8">
                    <Card className="border-border">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{session.type}</CardTitle>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(session.date).toLocaleDateString('ru-RU')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {session.time}
                              </span>
                              <span>•</span>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                          <Badge className="bg-success hover:bg-success-light">
                            Завершен
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Parameters */}
                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Частота</p>
                            <p className="text-sm font-semibold text-foreground">{session.frequency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Амплитуда</p>
                            <p className="text-sm font-semibold text-foreground">{session.amplitude}</p>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <FileText className="h-4 w-4" />
                            Заметки реабилитолога
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {session.notes}
                          </p>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Общий прогресс</span>
                            <span className="font-medium text-foreground">{session.progress}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all"
                              style={{ width: `${session.progress}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
