import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity, Shield, Lock, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      toast({
        title: "Вход выполнен успешно",
        description: "Добро пожаловать в ВекЗдоровья",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-success">
            <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">ВекЗдоровья</CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-lg">
              Система управления вибротерапией для реабилитологов
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Информационное письмо */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 space-y-4">
            <div className="flex items-center space-x-2 text-blue-800">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="font-semibold text-base sm:text-lg">Информационное письмо</h3>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <p>
                <strong>Добро пожаловать в платформу "ВекЗдоровья"!</strong>
              </p>
              
              <p>
                Данная платформа разработана специально для реабилитологов медицинского центра "Век здоровья" 
                и представляет собой современную систему управления вибротерапией с интегрированным 
                искусственным интеллектом.
              </p>
              
              <div className="bg-white p-3 sm:p-4 rounded-md space-y-2">
                <div className="flex items-center space-x-2">
                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  <span className="font-medium text-green-800 text-sm">Конфиденциальность и безопасность:</span>
                </div>
                <ul className="ml-6 space-y-1 text-xs">
                  <li>• Строгая конфиденциальность и медицинская тайна</li>
                  <li>• Защита сертификатами безопасности и шифрованием последнего поколения</li>
                  <li>• Хранение данных на собственных защищенных серверах</li>
                </ul>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-md space-y-2">
                <div className="flex items-center space-x-2">
                  <Server className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="font-medium text-blue-800 text-sm">Технические характеристики:</span>
                </div>
                <ul className="ml-6 space-y-1 text-xs">
                  <li>• Локализованные модели искусственного интеллекта</li>
                  <li>• Соответствие всем необходимым сертификатам</li>
                  <li>• Безопасное хранение медицинской информации</li>
                </ul>
              </div>
              
              <div className="text-center pt-2 border-t border-blue-200">
                <p className="text-xs text-gray-600">
                  <strong>Автор разработки:</strong> Воеводин Александр
                </p>
              </div>
            </div>
          </div>

          {/* Форма авторизации */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@vekzdorovia.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark"
              disabled={isLoading}
            >
              {isLoading ? "Выполняется вход..." : "Войти в систему"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Зарегистрироваться
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
