import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

export default function Calendar() {
  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Календарь</h1>
          <p className="text-muted-foreground mt-1">
            Управление расписанием и записями
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-2" />
          Новая запись
        </Button>
      </div>

      {/* Calendar Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Расписание на неделю</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 bg-muted rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Интерактивный календарь с drag-and-drop</p>
              <p className="text-sm text-muted-foreground mt-1">
                Будет реализован в следующей версии
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
