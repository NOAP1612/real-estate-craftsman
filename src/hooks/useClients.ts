import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'negotiating' | 'viewing' | 'lead';
  lastContact: string;
  interestedIn: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
}

export const useClients = () => {
  const { toast } = useToast();
  
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "משפחת כהן",
      email: "cohen@email.com",
      phone: "050-1234567",
      status: "active",
      lastContact: "לפני יומיים",
      interestedIn: "דירת 4 חדרים בתל אביב",
      budget: "₪2,500,000 - ₪3,000,000",
      priority: "high"
    },
    {
      id: "2",
      name: "דוד לוי",
      email: "david.levi@email.com",
      phone: "052-9876543",
      status: "negotiating",
      lastContact: "היום",
      interestedIn: "וילה ברעננה",
      budget: "₪4,000,000 - ₪5,000,000",
      priority: "high"
    },
    {
      id: "3",
      name: "שרה מזרחי",
      email: "sara.m@email.com",
      phone: "054-5555555",
      status: "viewing",
      lastContact: "אתמול",
      interestedIn: "דירה להשכרה בהרצליה",
      budget: "₪12,000 - ₪15,000/חודש",
      priority: "medium"
    },
    {
      id: "4",
      name: "איתן גולד",
      email: "eitan.gold@email.com",
      phone: "053-7777777",
      status: "lead",
      lastContact: "לפני שבוע",
      interestedIn: "השקעה בנדל״ן",
      budget: "₪1,500,000 - ₪2,000,000",
      priority: "low"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const addClient = () => {
    toast({
      title: "הוספת לקוח חדש",
      description: "פתיחת טופס הוספת לקוח חדש",
    });
  };

  const callClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    toast({
      title: "התקשרות ללקוח",
      description: `מתקשר ל${client?.name} - ${client?.phone}`,
    });
  };

  const sendEmail = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    toast({
      title: "שליחת מייל",
      description: `פתיחת מייל ל${client?.name} - ${client?.email}`,
    });
  };

  const scheduleMeeting = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    toast({
      title: "קביעת פגישה",
      description: `פתיחת יומן לקביעת פגישה עם ${client?.name}`,
    });
  };

  const updateClientStatus = (clientId: string, newStatus: Client['status']) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId 
          ? { ...client, status: newStatus, lastContact: "עכשיו" }
          : client
      )
    );
    
    const client = clients.find(c => c.id === clientId);
    toast({
      title: "סטטוס לקוח עודכן",
      description: `סטטוס ${client?.name} עודכן בהצלחה`,
    });
  };

  const deleteClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    setClients(prev => prev.filter(c => c.id !== clientId));
    toast({
      title: "לקוח נמחק",
      description: `${client?.name} הוסר מרשימת הלקוחות`,
    });
  };

  return {
    clients: filteredClients,
    searchTerm,
    setSearchTerm,
    addClient,
    callClient,
    sendEmail,
    scheduleMeeting,
    updateClientStatus,
    deleteClient
  };
};