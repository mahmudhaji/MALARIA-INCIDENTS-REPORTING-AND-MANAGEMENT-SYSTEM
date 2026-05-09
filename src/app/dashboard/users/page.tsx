
"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, UserPlus, Search, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const MOCK_USERS_LIST = [
  { username: "asha01", fullName: "Asha Hamisi", role: "CHW", status: "Active" },
  { username: "peter01", fullName: "Dr. Peter John", role: "Doctor", status: "Active" },
  { username: "officer01", fullName: "Grace Mollel", role: "Health Officer", status: "Active" },
  { username: "admin01", fullName: "System Admin", role: "Administrator", status: "Active" },
  { username: "jane_chw", fullName: "Jane Mukuwi", role: "CHW", status: "Active" },
  { username: "doctor_smith", fullName: "Dr. Alice Smith", role: "Doctor", status: "Active" },
  { username: "karanja_h", fullName: "Karanja Health", role: "Health Officer", status: "Active" },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterUsers = (role: string) => {
    return MOCK_USERS_LIST.filter(user => 
      user.role === role && 
      (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const UserTable = ({ users }: { users: typeof MOCK_USERS_LIST }) => (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-bold text-slate-700">Username</TableHead>
            <TableHead className="font-bold text-slate-700">Full Name</TableHead>
            <TableHead className="font-bold text-slate-700">Role</TableHead>
            <TableHead className="font-bold text-slate-700">Status</TableHead>
            <TableHead className="text-right font-bold text-slate-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username} className="hover:bg-slate-50/50">
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span className="text-green-600 font-semibold">{user.status}</span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-3 text-red-600 border-red-200 hover:bg-red-50">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Manage Users</h1>
          <p className="text-sm text-muted-foreground">Administrate system access for health workers and medical staff.</p>
        </div>
        <Button className="bg-green-700 hover:bg-green-800 shadow-sm">
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by username or name..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="CHW" className="w-full">
        <TabsList className="bg-slate-100 p-1 mb-4 h-12">
          <TabsTrigger value="CHW" className="px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-primary">CHWs</TabsTrigger>
          <TabsTrigger value="Doctor" className="px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-primary">Doctors</TabsTrigger>
          <TabsTrigger value="Health Officer" className="px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-primary">Health Officers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="CHW">
          <UserTable users={filterUsers("CHW")} />
        </TabsContent>
        
        <TabsContent value="Doctor">
          <UserTable users={filterUsers("Doctor")} />
        </TabsContent>
        
        <TabsContent value="Health Officer">
          <UserTable users={filterUsers("Health Officer")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
