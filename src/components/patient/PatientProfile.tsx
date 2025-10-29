import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PatientProfile() {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Личная информация</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО</Label>
            <Input id="fullName" defaultValue="Иванова Мария Сергеевна" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">Дата рождения</Label>
            <Input id="birthDate" type="date" defaultValue="1985-03-15" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Пол</Label>
            <Select defaultValue="female">
              <SelectTrigger id="gender">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">Женский</SelectItem>
                <SelectItem value="male">Мужской</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="m.ivanova@example.com" />
          </div>
        </CardContent>
      </Card>

      {/* Anthropometric Data */}
      <Card>
        <CardHeader>
          <CardTitle>Антропометрические данные</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="height">Рост (см)</Label>
            <Input id="height" type="number" defaultValue="165" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Вес (кг)</Label>
            <Input id="weight" type="number" defaultValue="62" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bmi">ИМТ</Label>
            <Input id="bmi" value="22.8" disabled className="bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Medical History */}
      <Card>
        <CardHeader>
          <CardTitle>Медицинская история</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chronic">Хронические заболевания</Label>
            <Textarea
              id="chronic"
              placeholder="Укажите хронические заболевания"
              defaultValue="Остеохондроз шейного отдела позвоночника"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contraindications">Противопоказания</Label>
            <Textarea
              id="contraindications"
              placeholder="Укажите противопоказания"
              defaultValue="Отсутствуют"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle */}
      <Card>
        <CardHeader>
          <CardTitle>Образ жизни и физическая активность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity">Уровень физической активности</Label>
            <Select defaultValue="moderate">
              <SelectTrigger id="activity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Низкий (сидячий образ жизни)</SelectItem>
                <SelectItem value="moderate">Умеренный (2-3 раза в неделю)</SelectItem>
                <SelectItem value="high">Высокий (ежедневные тренировки)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lifestyle">Описание образа жизни</Label>
            <Textarea
              id="lifestyle"
              placeholder="Опишите образ жизни пациента"
              defaultValue="Офисная работа, малоподвижный образ жизни. Регулярные прогулки по выходным."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Цели реабилитации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="goals">Основные цели</Label>
            <Textarea
              id="goals"
              placeholder="Укажите цели реабилитации"
              defaultValue="Снижение болевого синдрома в шейном отделе, улучшение подвижности, коррекция осанки"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
