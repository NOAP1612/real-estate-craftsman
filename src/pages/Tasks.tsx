import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import { useTasks } from "@/hooks/useTasks";
import { 
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building2,
  Phone,
  Camera
} from "lucide-react";

const Tasks = () => {
  const { todayTasks, upcomingTasks, toggleTask, addTask } = useTasks();

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "meeting": return Users;
      case "photography": return Camera;
      case "contract": return CheckCircle;
      case "call": return Phone;
      case "preparation": return Building2;
      case "viewing": return Building2;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "דחוף";
      case "medium": return "רגיל";
      case "low": return "נמוך";
      default: return priority;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">ניהול משימות</h1>
            <p className="text-muted-foreground">נהל את המשימות היומיות שלך ועקוב אחרי ההתקדמות</p>
          </div>
          <Button 
            className="bg-gradient-success hover:shadow-lg"
            onClick={() => addTask(false)}
          >
            <Plus className="h-5 w-5 mr-2" />
            הוסף משימה
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">משימות היום</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">הושלמו</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-warning flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ממתינות</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">דחופות</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Tasks */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-foreground">משימות היום</h2>
            <div className="space-y-4">
              {todayTasks.map((task) => {
                const IconComponent = getTaskIcon(task.type);
                return (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                      />
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {task.task}
                          </h3>
                          <Badge variant={getPriorityColor(task.priority) as any}>
                            {getPriorityText(task.priority)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{task.time}</span>
                          </div>
                          {task.client && (
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              <span>{task.client}</span>
                            </div>
                          )}
                          {task.property && (
                            <div className="flex items-center gap-2">
                              <Building2 className="h-3 w-3" />
                              <span>{task.property}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-foreground">משימות קרובות</h2>
            <div className="space-y-4">
              {upcomingTasks.map((task) => {
                const IconComponent = getTaskIcon(task.type);
                return (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{task.task}</h3>
                          <Badge variant={getPriorityColor(task.priority) as any}>
                            {getPriorityText(task.priority)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{task.date}</span>
                          </div>
                          {task.client && (
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              <span>{task.client}</span>
                            </div>
                          )}
                          {task.property && (
                            <div className="flex items-center gap-2">
                              <Building2 className="h-3 w-3" />
                              <span>{task.property}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Quick Add */}
            <Card className="p-4 mt-6 border-dashed border-2">
              <Button 
                variant="ghost" 
                className="w-full h-16"
                onClick={() => addTask(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                הוסף משימה חדשה
              </Button>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Tasks;