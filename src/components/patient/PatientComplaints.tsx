import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import BodyMap3D from "./BodyMap3D";

const commonSymptoms = [
  "Боль в шее",
  "Боль в спине",
  "Головная боль",
  "Скованность движений",
  "Головокружение",
  "Онемение конечностей",
  "Мышечная слабость",
  "Нарушение координации",
];

export default function PatientComplaints() {
  const [painLevel, setPainLevel] = useState([6]);
  const [selectedSymptoms, setSelectedSymptoms] = useState(["Боль в шее", "Скованность движений"]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Main Complaint */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Основные жалобы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="complaints">Описание жалоб пациента</Label>
            <Textarea
              id="complaints"
              placeholder="Опишите жалобы пациента подробно"
              defaultValue="Постоянная ноющая боль в шейном отделе позвоночника, усиливающаяся при длительной работе за компьютером. Ограничение подвижности головы, особенно при поворотах. Периодические головные боли."
              rows={5}
              className="min-h-[120px] text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pain Scale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <AlertCircle className="h-5 w-5 text-primary" />
            Шкала интенсивности боли
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Текущий уровень боли</Label>
              <span className="text-xl sm:text-2xl font-bold text-primary">{painLevel[0]}/10</span>
            </div>
            <Slider
              value={painLevel}
              onValueChange={setPainLevel}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Нет боли</span>
              <span className="hidden sm:inline">Умеренная</span>
              <span className="hidden md:inline">Сильная</span>
              <span className="hidden lg:inline">Невыносимая</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {painLevel[0] <= 3 && "Легкая боль, не мешающая повседневной активности"}
              {painLevel[0] > 3 && painLevel[0] <= 6 && "Умеренная боль, частично ограничивающая активность"}
              {painLevel[0] > 6 && painLevel[0] < 10 && "Сильная боль, значительно ограничивающая активность"}
              {painLevel[0] === 10 && "Невыносимая боль, требующая немедленного внимания"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Symptoms Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Сопутствующие симптомы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Badge
                key={symptom}
                variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                className={`cursor-pointer transition-colors text-xs sm:text-sm ${
                  selectedSymptoms.includes(symptom)
                    ? "bg-primary hover:bg-primary-dark"
                    : "hover:bg-muted"
                }`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3D Body Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Визуальная карта тела</CardTitle>
        </CardHeader>
        <CardContent>
          <BodyMap3D />
        </CardContent>
      </Card>

      {/* History of Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">История изменений симптомов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-border">
              <div className="text-xs sm:text-sm text-muted-foreground min-w-16 sm:min-w-24">
                15.01.2024
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-foreground">Уровень боли: 8/10</p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  Сильная боль при поворотах головы, головокружение
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-border">
              <div className="text-xs sm:text-sm text-muted-foreground min-w-16 sm:min-w-24">
                22.01.2024
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-foreground">Уровень боли: 6/10</p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  Боль уменьшилась после 3 сеансов вибротерапии
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="text-xs sm:text-sm text-muted-foreground min-w-16 sm:min-w-24">
                29.01.2024
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-foreground">Уровень боли: 4/10</p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  Значительное улучшение подвижности, редкие головные боли
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
