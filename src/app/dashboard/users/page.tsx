
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UserPlus, Search, Edit2, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const INITIAL_USERS = [
  { id: "1", username: "asha01", fullName: "Asha Hamisi", role: "CHW", status: "Active", email: "asha@health.go.ke" },
  { id: "2", username: "peter01", fullName: "Dr. Peter John", role: "Doctor", status: "Active", email: "peter@health.go.ke" },
  { id: "3", username: "officer01", fullName: "Grace Mollel", role: "Health Officer", status: "Active", email: "grace@health.go.ke" },
  { id: "4", username: "admin01", fullName: "System Admin", role: "Administrator", status: "Active", email: "admin@health.go.ke" },
  { id: "5", username: "jane_chw", fullName: "Jane Mukuwi", role: "CHW", status: "Active", email: "jane@health.go.ke" },
  { id: "6", username: "doctor_smith", fullName: "Dr. Alice Smith", role: "Doctor", status: "Active", email: "alice@health.go.ke" },
  { id: "7", username: "karanja_h", fullName: "Karanja Health", role: "Health Officer", status: "Active", email: "karanja@health.go.ke" },
];

function UserManagementContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const roleFilter = searchParams.get('role');
  
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(roleFilter || "CHW");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "CHW",
    status: "Active"
  });

  useEffect(() => {
    if (roleFilter) {
      setActiveTab(roleFilter);
      setFormData(prev => ({ ...prev, role: roleFilter }));
    }
  }, [roleFilter]);

  const filterUsers = (role: string) => {
    return users.filter(user => 
      user.role === role && 
      (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleOpenForm = (user?: any) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: "",
        fullName: "",
        email: "",
        role: roleFilter || activeTab,
        status: "Active"
      });
    }
    setIsFormOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editingUser) {
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        toast({
          title: "User Updated",
          description: `${formData.fullName}'s profile has been updated successfully.`,
          className: "bg-green-600 text-white",
        });
      } else {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData
        };
        setUsers([newUser, ...users]);
        toast({
          title: "User Created",
          description: `${formData.fullName} has been added to the system.`,
          className: "bg-green-600 text-white",
        });
      }
      setIsSubmitting(false);
      setIsFormOpen(false);
    }, 800);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      setUsers(users.filter(u => u.id !== id));
      toast({
        title: "User Deleted",
        description: `${name} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const UserTable = ({ roleUsers }: { roleUsers: typeof INITIAL_USERS }) => (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden animate-in fade-in duration-300">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-bold text-slate-700">Username</TableHead>
            <TableHead className="font-bold text-slate-700">Full Name</TableHead>
            <TableHead className="font-bold text-slate-700">Email</TableHead>
            <TableHead className="font-bold text-slate-700">Status</TableHead>
            <TableHead className="text-right font-bold text-slate-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roleUsers.map((user) => (
            <TableRow key={user.id} className="hover:bg-slate-50/50">
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell className="text-muted-foreground text-xs">{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className={user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => handleOpenForm(user)}
                >
                  <Edit2 className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDeleteUser(user.id, user.fullName)}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {roleUsers.length === 0 && (
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
          <div className="flex items-center gap-2 mb-1">
            {roleFilter && (
              <Link href="/dashboard/users" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
                <ArrowLeft className="h-3 w-3" /> All Users
              </Link>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            {roleFilter ? `Manage ${roleFilter}s` : "User Management"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {roleFilter 
              ? `Listing all registered ${roleFilter.toLowerCase()}s in the system.` 
              : "Administrate system access for health workers and medical staff."}
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 shadow-sm" onClick={() => handleOpenForm()}>
              <UserPlus className="mr-2 h-4 w-4" /> Add New {roleFilter || "User"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSaveUser}>
              <DialogHeader>
                <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                <DialogDescription>
                  Enter the user details below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(val) => setFormData({...formData, role: val})}
                      disabled={!!roleFilter && !editingUser}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CHW">CHW</SelectItem>
                        <SelectItem value="Doctor">Doctor</SelectItem>
                        <SelectItem value="Health Officer">Health Officer</SelectItem>
                        <SelectItem value="Administrator">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder={`Search by username or name...`} 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {roleFilter ? (
        <div className="animate-in fade-in duration-500">
          <UserTable roleUsers={filterUsers(roleFilter)} />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-100 p-1 mb-4 h-12">
            <TabsTrigger value="CHW" className="px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-primary">CHWs</TabsTrigger>
            <TabsTrigger value="Doctor" className="px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-primary">Doctors</TabsTrigger>
            <TabsTrigger value="Health Officer" className="px-8 font-bold data-[state=active]:bg-white data-[state=active]:text-primary">Health Officers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="CHW" className="animate-in fade-in zoom-in-95 duration-300">
            <UserTable roleUsers={filterUsers("CHW")} />
          </TabsContent>
          
          <TabsContent value="Doctor" className="animate-in fade-in zoom-in-95 duration-300">
            <UserTable roleUsers={filterUsers("Doctor")} />
          </TabsContent>
          
          <TabsContent value="Health Officer" className="animate-in fade-in zoom-in-95 duration-300">
            <UserTable roleUsers={filterUsers("Health Officer")} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default function UserManagementPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-48"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
      <UserManagementContent />
    </Suspense>
  );
}
