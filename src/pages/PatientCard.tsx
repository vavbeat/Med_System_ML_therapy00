import { useState } from "react";
import { ArrowLeft, FileText, Heart, History, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PatientProfile from "@/components/patient/PatientProfile";
import PatientDocuments from "@/components/patient/PatientDocuments";
import PatientComplaints from "@/components/patient/PatientComplaints";
import PatientHistory from "@/components/patient/PatientHistory";
import AIAssistant from "@/components/AIAssistant";

export default function PatientCard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/patients">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Иванова Мария Сергеевна
                </h1>
                <p className="text-sm text-muted-foreground">ID пациента: #0482</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Отправить уведомление</Button>
              <Button className="bg-primary hover:bg-primary-dark">
                Записать на сеанс
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="border-b border-border bg-card px-6">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger
                  value="profile"
                  className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <User className="h-4 w-4" />
                  Анкета клиента
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  Медицинские документы
                </TabsTrigger>
                <TabsTrigger
                  value="complaints"
                  className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <Heart className="h-4 w-4" />
                  Жалобы и симптомы
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <History className="h-4 w-4" />
                  История посещений
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="profile" className="mt-0">
                <PatientProfile />
              </TabsContent>
              <TabsContent value="documents" className="mt-0">
                <PatientDocuments />
              </TabsContent>
              <TabsContent value="complaints" className="mt-0">
                <PatientComplaints />
              </TabsContent>
              <TabsContent value="history" className="mt-0">
                <PatientHistory />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <AIAssistant />
    </div>
  );
}
