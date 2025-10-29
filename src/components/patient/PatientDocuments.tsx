import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Eye, Download, Trash2, Image, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockDocuments = [
  {
    id: 1,
    name: "МРТ шейного отдела.pdf",
    type: "МРТ",
    date: "2024-01-15",
    size: "2.4 MB",
    icon: FileText,
  },
  {
    id: 2,
    name: "Результаты анализов крови.pdf",
    type: "Анализы",
    date: "2024-01-10",
    size: "856 KB",
    icon: FileText,
  },
  {
    id: 3,
    name: "Рентген позвоночника.jpg",
    type: "Рентген",
    date: "2023-12-20",
    size: "1.8 MB",
    icon: Image,
  },
];

const documentTypes = ["Все", "МРТ", "КТ", "Рентген", "УЗИ", "Анализы", "Другое"];

export default function PatientDocuments() {
  const [selectedType, setSelectedType] = useState("Все");

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Загрузить документы</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
            Перетащите файлы сюда или нажмите для выбора. 
            Поддерживаются форматы: DICOM, PDF, JPG, PNG
          </p>
          <Button className="bg-primary hover:bg-primary-dark">
            <Upload className="h-4 w-4 mr-2" />
            Выбрать файлы
          </Button>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {documentTypes.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? "bg-primary hover:bg-primary-dark" : ""}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Медицинские документы ({mockDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <doc.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {doc.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{doc.date}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{doc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
