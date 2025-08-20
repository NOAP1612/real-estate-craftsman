import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  task: string;
  time?: string;
  date?: string;
  type: string;
  priority: string;
  completed: boolean;
  client?: string;
  property?: string;
}

export const useTasks = () => {
  const { toast } = useToast();
  
  const [todayTasks, setTodayTasks] = useState<Task[]>([
    {
      id: "1",
      task: "פגישה עם משפחת כהן",
      time: "10:00",
      type: "meeting",
      priority: "high",
      completed: true,
      client: "משפחת כהן",
      property: "דירה ברמת אביב"
    },
    {
      id: "2",
      task: "צילום נכס ברמת גן",
      time: "14:00",
      type: "photography",
      priority: "medium",
      completed: false,
      property: "בית פרטי ברמת גן"
    },
    {
      id: "3",
      task: "חתימה על חוזה",
      time: "16:30",
      type: "contract",
      priority: "high",
      completed: false,
      client: "דוד לוי",
      property: "וילה ברעננה"
    },
    {
      id: "4",
      task: "שיחת מעקב עם שרה מזרחי",
      time: "17:00",
      type: "call",
      priority: "medium",
      completed: false,
      client: "שרה מזרחי"
    }
  ]);

  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([
    {
      id: "5",
      task: "הכנת מצגת לנכס חדש",
      date: "מחר",
      type: "preparation",
      priority: "low",
      completed: false,
      property: "פנטהאוס בהרצליה"
    },
    {
      id: "6",
      task: "ביקור בנכס עם לקוח",
      date: "יום חמישי",
      type: "viewing",
      priority: "high",
      completed: false,
      client: "משפחת גולד",
      property: "דירה בגבעתיים"
    }
  ]);

  const toggleTask = (taskId: string, isUpcoming = false) => {
    if (isUpcoming) {
      setUpcomingTasks(tasks => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    } else {
      setTodayTasks(tasks => 
        tasks.map(task => 
          task.id === taskId 
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    }
    
    toast({
      title: "משימה עודכנה",
      description: "המשימה עודכנה בהצלחה",
    });
  };

  const addTask = (isUpcoming = false) => {
    const newTask: Task = {
      id: Date.now().toString(),
      task: "משימה חדשה",
      time: isUpcoming ? undefined : "09:00",
      date: isUpcoming ? "מחר" : undefined,
      type: "general",
      priority: "medium",
      completed: false
    };

    if (isUpcoming) {
      setUpcomingTasks(prev => [newTask, ...prev]);
    } else {
      setTodayTasks(prev => [newTask, ...prev]);
    }

    toast({
      title: "משימה נוספה",
      description: `משימה חדשה נוספה ל${isUpcoming ? 'משימות קרובות' : 'משימות היום'}`,
    });
  };

  const deleteTask = (taskId: string, isUpcoming = false) => {
    if (isUpcoming) {
      setUpcomingTasks(prev => prev.filter(task => task.id !== taskId));
    } else {
      setTodayTasks(prev => prev.filter(task => task.id !== taskId));
    }

    toast({
      title: "משימה נמחקה",
      description: "המשימה הוסרה מהרשימה",
    });
  };

  const editTask = (taskId: string, isUpcoming = false) => {
    const tasks = isUpcoming ? upcomingTasks : todayTasks;
    const task = tasks.find(t => t.id === taskId);
    
    toast({
      title: "עריכת משימה",
      description: `פתיחת טופס עריכה למשימה: ${task?.task}`,
    });
  };

  const duplicateTask = (taskId: string, isUpcoming = false) => {
    const tasks = isUpcoming ? upcomingTasks : todayTasks;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      task: `${task.task} - עותק`,
      completed: false
    };

    if (isUpcoming) {
      setUpcomingTasks(prev => [newTask, ...prev]);
    } else {
      setTodayTasks(prev => [newTask, ...prev]);
    }

    toast({
      title: "משימה שוכפלה",
      description: `נוצר עותק של "${task.task}"`,
    });
  };

  return {
    todayTasks,
    upcomingTasks,
    toggleTask,
    addTask,
    deleteTask,
    editTask,
    duplicateTask
  };
};