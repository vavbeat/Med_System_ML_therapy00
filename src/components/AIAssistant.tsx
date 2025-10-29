import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockInsights = [
  {
    type: "warning",
    icon: AlertCircle,
    title: "Внимание",
    content: "Обнаружено противопоказание: остеохондроз. Рекомендуется начать с низких частот (15-20 Гц).",
  },
  {
    type: "suggestion",
    icon: Lightbulb,
    title: "Рекомендация",
    content: "На основе анализа данных предлагается курс из 10 сеансов с постепенным увеличением интенсивности.",
  },
  {
    type: "progress",
    icon: TrendingUp,
    title: "Прогноз",
    content: "При соблюдении протокола ожидается улучшение состояния на 60-70% через 4 недели.",
  },
];

const mockMessages = [
  {
    role: "assistant",
    content: "Здравствуйте! Я AI-ассистент VibRehab. Я проанализировал карточку пациента и готов помочь с рекомендациями по вибротерапии.",
  },
  {
    role: "user",
    content: "Какие параметры вибротерапии рекомендуешь для первого сеанса?",
  },
  {
    role: "assistant",
    content: "Для данного пациента рекомендую начать с щадящих параметров:\n\n• Частота: 15-20 Гц\n• Амплитуда: 1-1.5 мм\n• Длительность: 30-40 минут\n\nУчитывая наличие остеохондроза и умеренный болевой синдром (6/10), важно начать постепенно и отслеживать реакцию организма.",
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
      
      // Mock AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Спасибо за ваш вопрос. Я анализирую данные пациента и подготавливаю рекомендации..."
        }]);
      }, 1000);
    }
  };

  return (
    <div className="w-96 border-l border-border bg-card flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-success">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">AI Ассистент</h2>
            <p className="text-xs text-muted-foreground">Персональные рекомендации</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="border-b border-border p-4 space-y-3">
        {mockInsights.map((insight, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card p-3 space-y-2 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-2">
              <insight.icon className={`h-4 w-4 mt-0.5 ${
                insight.type === 'warning' ? 'text-destructive' :
                insight.type === 'suggestion' ? 'text-primary' :
                'text-success'
              }`} />
              <div className="flex-1 space-y-1">
                <p className="text-xs font-medium text-foreground">{insight.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Задайте вопрос AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            className="bg-primary hover:bg-primary-dark shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI анализирует данные пациента в реальном времени
        </p>
      </div>
    </div>
  );
}
